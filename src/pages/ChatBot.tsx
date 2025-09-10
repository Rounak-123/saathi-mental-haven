import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Heart, AlertTriangle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Saathi, your mental health support companion. I'm here to listen and provide helpful resources. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("stress") || input.includes("anxious") || input.includes("worried")) {
      return "I understand you're feeling stressed or anxious. These feelings are completely normal, especially as a student. Here are some immediate techniques that might help: Take 5 deep breaths (4 seconds in, 6 seconds out), try the 5-4-3-2-1 grounding technique (name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste). Would you like me to guide you through a breathing exercise?";
    }
    
    if (input.includes("sad") || input.includes("depressed") || input.includes("down")) {
      return "I hear that you're going through a difficult time. Your feelings are valid, and it's brave of you to reach out. Remember that you're not alone in this. Sometimes talking to someone can really help - have you considered booking a session with one of our counselors? In the meantime, try to engage in one small activity that usually brings you comfort.";
    }
    
    if (input.includes("exam") || input.includes("test") || input.includes("study")) {
      return "Academic pressure can be overwhelming! Here are some strategies: Break study sessions into 25-minute focused blocks with 5-minute breaks (Pomodoro technique), create a realistic study schedule, and remember that your worth isn't defined by your grades. Are you getting enough sleep and taking care of your basic needs?";
    }
    
    if (input.includes("lonely") || input.includes("alone") || input.includes("isolated")) {
      return "Feeling lonely can be really hard. You've taken a positive step by reaching out here. Consider joining our peer support forum where you can connect with other students going through similar experiences. Even small connections can make a big difference. Is there anyone in your life you feel comfortable talking to?";
    }

    if (input.includes("thank") || input.includes("better") || input.includes("helped")) {
      return "I'm so glad I could help! Remember, taking care of your mental health is an ongoing journey, not a destination. You're doing great by being proactive about your wellbeing. Feel free to come back anytime you need support. 💙";
    }
    
    return "Thank you for sharing that with me. Every person's experience is unique, and I want to make sure I understand what you're going through. Can you tell me a bit more about what's been on your mind lately? Remember, this is a safe space and I'm here to listen without judgment.";
  };

  const quickResponses = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I'm feeling lonely at university",
  ];

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
            Your AI mental health companion is here to listen and provide support. Share what's on your mind in a safe, judgment-free space.
          </p>
        </div>

        {/* Emergency Notice */}
        <Card className="mb-6 border-accent bg-accent-light">
          <div className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent">Emergency Support</p>
              <p className="text-accent/80 mt-1">
                If you're having thoughts of self-harm, please contact emergency services (911) or our crisis helpline: 1800-123-4567
              </p>
            </div>
          </div>
        </Card>

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
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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