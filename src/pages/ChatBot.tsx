import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Heart, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  emotion?: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [moodResult, setMoodResult] = useState<string | null>(null);
  const [moodEmoji, setMoodEmoji] = useState("🙂");
  const [language, setLanguage] = useState("en"); // ✅ NEW

  // Load chat history from localStorage
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
        content: "Hello! I'm Saathi, your mental health support companion. I'm here to listen and provide helpful resources. How are you feeling today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // --- Emotion Detection ---
  const detectEmotion = (message: string): string => {
    const input = message.toLowerCase();
    if (input.includes("stress") || input.includes("anxious") || input.includes("worried"))
      return "anxiety";
    if (input.includes("sad") || input.includes("depressed") || input.includes("down"))
      return "sadness";
    if (input.includes("exam") || input.includes("test") || input.includes("study"))
      return "academic stress";
    if (input.includes("lonely") || input.includes("alone") || input.includes("isolated"))
      return "loneliness";
    if (input.includes("happy") || input.includes("joy") || input.includes("glad"))
      return "happy";
    return "neutral";
  };

  // --- Send Message ---
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      emotion: detectEmotion(inputMessage),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulated bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  // --- Bot Reply Rules ---
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // Example: Stress
    if (input.includes("stress") || input.includes("anxious") || input.includes("worried")) {
      return language === "hi"
        ? "मैं समझता हूँ कि आप तनाव या चिंता महसूस कर रहे हैं। गहरी साँस लें: 4 सेकंड अंदर और 6 सेकंड बाहर। क्या आप चाहेंगे कि मैं आपको गाइड करूँ?"
        : "I understand you're feeling stressed or anxious. These feelings are normal. Try deep breathing: inhale for 4 sec, exhale for 6 sec. Would you like me to guide you?";
    }

    // Sadness
    if (input.includes("sad") || input.includes("depressed") || input.includes("down")) {
      return language === "hi"
        ? "मैं समझ सकता हूँ कि आप कठिन समय से गुजर रहे हैं। आप अकेले नहीं हैं। किसी से बात करना मददगार हो सकता है — क्या आप काउंसलर की जानकारी चाहते हैं?"
        : "I hear that you're going through a tough time. You're not alone. Talking to someone can really help — would you like info about counselors?";
    }

    // Exam / Studies
    if (input.includes("exam") || input.includes("test") || input.includes("study")) {
      return language === "hi"
        ? "परीक्षा का दबाव कठिन हो सकता है! पोमोडोरो तकनीक आज़माएँ (25 मिनट पढ़ाई + 5 मिनट ब्रेक)। क्या आप अपनी देखभाल कर रहे हैं?"
        : "Exam pressure can be tough! Try the Pomodoro technique (25 min study + 5 min break). Also, don’t forget rest & food. Are you taking care of yourself?";
    }

    // Loneliness
    if (input.includes("lonely") || input.includes("alone") || input.includes("isolated")) {
      return language === "hi"
        ? "अकेलापन महसूस करना कठिन है। आप हमारे पीयर फ़ोरम में जुड़ सकते हैं। क्या आपके पास कोई भरोसेमंद व्यक्ति है जिससे आप बात कर सकें?"
        : "Feeling lonely is hard. You can try connecting in our peer forum. Is there anyone you trust to talk to?";
    }

    // Happiness
    if (input.includes("happy") || input.includes("joy") || input.includes("glad")) {
      return language === "hi"
        ? "यह सुनकर बहुत अच्छा लगा! 😊 खुश रहिए और सकारात्मक ऊर्जा फैलाइए!"
        : "That’s wonderful to hear! 😊 Keep enjoying the good vibes and spreading positivity!";
    }

    // Gratitude
    if (input.includes("thank") || input.includes("grateful") || input.includes("appreciate")) {
      return language === "hi"
        ? "मुझे खुशी है कि मैं मदद कर सका 💙। याद रखिए, आप सहायता लेकर बहुत अच्छा कर रहे हैं!"
        : "I'm glad I could help 💙. Remember, you're doing great by seeking support!";
    }

    // Default Fallback
    return language === "hi"
      ? "आपके विचार साझा करने के लिए धन्यवाद। हर किसी का अनुभव अलग होता है — क्या आप और बता सकते हैं?"
      : "Thanks for sharing 💙. Everyone’s journey is unique — can you tell me more about what’s on your mind?";
  };

  // Quick Responses
  const quickResponses = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I'm feeling lonely at university",
    "I'm feeling happy today 😊",
  ];

  // Clear Chat
  const clearChat = () => {
    localStorage.removeItem("chatHistory");
    setMessages([
      {
        id: "1",
        content:
          "Hello! I'm Saathi, your mental health support companion. I'm here to listen and provide helpful resources. How are you feeling today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  // Analyze Mood (text summary)
  const analyzeMood = (history: Message[]) => {
    const counts: Record<string, number> = {};
    history.forEach((m) => {
      if (m.sender !== "user") return;
      const e = m.emotion || "neutral";
      counts[e] = (counts[e] || 0) + 1;
    });
    const totalUser = history.filter((h) => h.sender === "user").length || 1;
    let summary = `User messages: ${totalUser}\n\nEmotion counts:\n`;
    Object.entries(counts).forEach(([k, v]) => (summary += `${k}: ${v}\n`));
    const anxiety = counts["anxiety"] || 0;
    const sadness = counts["sadness"] || 0;
    if (anxiety + sadness >= 3)
      summary += `\n⚠ Suggestion: User may be under elevated distress. Consider counselor support.`;
    return summary;
  };

  // --- Mood Emoji (overall) ---
  const analyzeMoodEmoji = (history: Message[]): string => {
    if (history.length === 0) return "🙂";

    const userMsgs = history.filter(m => m.sender === "user");
    let score = 0;

    userMsgs.forEach(m => {
      if (m.emotion === "sadness" || m.emotion === "anxiety" || m.emotion === "loneliness") {
        score -= 1;
      }
      if (m.emotion === "academic stress") {
        score -= 0.5;
      }
      if (m.emotion === "happy") {
        score += 2;
      }
    });

    if (score > 1) return "😊";
    if (score === 1) return "🙂";
    if (score < 0) return "😔";
    return "😐";
  };

  // Update emoji whenever messages change
  useEffect(() => {
    setMoodEmoji(analyzeMoodEmoji(messages));
  }, [messages]);

  // Export Chat
  const exportChatJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(messages, null, 2));
    const a = document.createElement("a");
    a.href = dataStr;
    a.download = `saathi_chat_${Date.now()}.json`;
    a.click();
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
            Your AI mental health companion is here to listen and provide support. Share what's on
            your mind in a safe, judgment-free space.
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
          <div className="h-96 overflow-y-auto p-6 space-y-4">
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
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.sender === "user" && message.emotion && (
                    <p className="text-xs opacity-70 mt-1">
                      Emotion: {message.emotion}{" "}
                      {message.emotion === "happy" ? "😊" : ""}
                    </p>
                  )}
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

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
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
          <div className="flex gap-3 px-6 pb-4 items-center">
            <Button variant="outline" onClick={clearChat}>Clear Chat</Button>
            <Button variant="outline" onClick={() => setMoodResult(analyzeMood(messages))}>
              Analyze Mood
            </Button>
            <Button variant="outline" onClick={exportChatJSON}>Export Chat</Button>

            {/* ✅ NEW Language Dropdown */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {moodResult && (
            <div className="px-6 pb-4">
              <Card className="bg-muted p-3 text-sm">
                <p>{moodResult}</p>
              </Card>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-6">
            <div className="flex gap-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
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
