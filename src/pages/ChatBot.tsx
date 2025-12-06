import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Heart, AlertTriangle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [moodEmoji, setMoodEmoji] = useState("🙂");
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const stored = localStorage.getItem("chatHistory");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Message[];
        const restored = parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
        setMessages(restored);
        return;
      } catch {}
    }
    setMessages([
      {
        id: "1",
        content: "Hello! I'm Saathi, your AI mental health support companion. I'm here to listen and provide support. How are you feeling today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom of chat container only
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Stream AI response
  const streamChat = async (userMessages: { role: string; content: string }[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages, language }),
    });

    if (!resp.ok) {
      const error = await resp.json();
      throw new Error(error.error || "Failed to get AI response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";
    const botMessageId = `bot-${Date.now()}`;

    // Add initial empty bot message
    setMessages(prev => [...prev, {
      id: botMessageId,
      content: "",
      sender: "bot" as const,
      timestamp: new Date(),
    }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            // Update the bot message in real-time
            setMessages(prev => prev.map(m => 
              m.id === botMessageId ? { ...m, content: assistantContent } : m
            ));
            scrollToBottom();
          }
        } catch {
          // Incomplete JSON, put back and wait for more
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    return assistantContent;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Prepare conversation history for AI
    const conversationHistory = messages
      .filter(m => m.id !== "1") // Exclude initial greeting
      .map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content,
      }));

    conversationHistory.push({ role: "user", content: inputMessage });

    try {
      await streamChat(conversationHistory);
      updateMoodEmoji(inputMessage);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive",
      });
      // Add error message
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        content: language === "hi" 
          ? "क्षमा करें, कुछ गलत हो गया। कृपया पुनः प्रयास करें।"
          : "Sorry, something went wrong. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateMoodEmoji = (lastMessage: string) => {
    const content = lastMessage.toLowerCase();
    if (content.includes("happy") || content.includes("good") || content.includes("great")) {
      setMoodEmoji("😊");
    } else if (content.includes("sad") || content.includes("depressed") || content.includes("anxious") || content.includes("stress")) {
      setMoodEmoji("😔");
    } else {
      setMoodEmoji("🙂");
    }
  };

  const quickResponses = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I'm feeling lonely at university",
    "I'm feeling happy today 😊",
  ];

  const clearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages([
      {
        id: "1",
        content: language === "hi"
          ? "नमस्ते! मैं साथी हूं, आपका AI मानसिक स्वास्थ्य सहायता साथी। आज आप कैसा महसूस कर रहे हैं?"
          : "Hello! I'm Saathi, your AI mental health support companion. How are you feeling today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setMoodEmoji("🙂");
  };

  return (
    <div className="min-h-screen bg-gradient-calm py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Talk to Saathi</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your AI mental health companion powered by advanced AI. Share what's on your mind in a safe, judgment-free space.
          </p>
        </div>

        {/* Emergency Notice */}
        <Card className="mb-6 border-accent bg-accent-light">
          <div className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent">Emergency Support</p>
              <p className="text-accent/80 mt-1">
                If you're having thoughts of self-harm, please contact emergency services (911) or
                our crisis helpline: 1800-123-4567
              </p>
            </div>
          </div>
        </Card>

        {/* Mood Emoji Display */}
        <div className="px-6 pb-4 flex items-center gap-2">
          <span className="text-2xl">{moodEmoji}</span>
          <p className="text-sm text-muted-foreground">Overall Mood</p>
        </div>

        {/* Chat Interface */}
        <Card className="card-calm">
          <div ref={chatContainerRef} className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && messages[messages.length - 1]?.sender !== "bot" && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted p-4 rounded-2xl">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            
          </div>

          {/* Quick Responses */}
          <div className="px-6 pb-4">
            <p className="text-sm text-muted-foreground mb-3">Quick responses:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {quickResponses.map((response, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(response)}
                  className="text-xs h-8"
                >
                  {response}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions Row */}
          <div className="flex gap-3 px-6 pb-4 items-center flex-wrap">
            <Button variant="outline" onClick={clearChat}>Clear Chat</Button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm bg-background"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {/* Input */}
          <div className="border-t border-border p-6">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={language === "hi" ? "अपना संदेश यहाँ लिखें..." : "Type your message here..."}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatBot;
