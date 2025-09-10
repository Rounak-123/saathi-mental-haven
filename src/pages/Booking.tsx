import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Shield, User, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    sessionType: "",
    concerns: "",
    urgency: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Booking Confirmed!",
        description: "We'll contact you within 24 hours to confirm your session details.",
      });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-calm py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Thank you for taking this important step. Our team will review your booking and contact you within 24 hours to confirm your session details.
          </p>
          <div className="bg-card p-6 rounded-2xl shadow-card mb-8">
            <h3 className="font-semibold mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">1</div>
                <p className="text-sm">Our team reviews your booking request and matches you with the right counselor</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">2</div>
                <p className="text-sm">We'll call or email you to confirm the appointment time and provide session details</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">3</div>
                <p className="text-sm">Attend your confidential session via video call or in-person (your choice)</p>
              </div>
            </div>
          </div>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Book Another Session
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Book a Counselor Session</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Take the next step in your mental health journey. Book a confidential session with our qualified counselors.
          </p>
        </div>

        {/* Privacy Notice */}
        <Card className="mb-8 bg-soft-green border-secondary">
          <div className="p-6 flex items-start gap-4">
            <Shield className="w-6 h-6 text-secondary mt-1" />
            <div>
              <h3 className="font-semibold text-secondary mb-2">Your Privacy is Protected</h3>
              <p className="text-sm text-muted-foreground">
                All information shared is strictly confidential and follows professional counseling ethics. 
                Your data is encrypted and only accessible to your assigned counselor.
              </p>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <Card className="card-calm">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Session Type *</label>
                <Select required onValueChange={(value) => handleInputChange("sessionType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Call Session</SelectItem>
                    <SelectItem value="phone">Phone Session</SelectItem>
                    <SelectItem value="in-person">In-Person Session</SelectItem>
                    <SelectItem value="chat">Text-Based Session</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Date *</label>
                <Input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Time *</label>
                <Select required onValueChange={(value) => handleInputChange("preferredTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="2:00">2:00 PM</SelectItem>
                    <SelectItem value="3:00">3:00 PM</SelectItem>
                    <SelectItem value="4:00">4:00 PM</SelectItem>
                    <SelectItem value="5:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Urgency Level *</label>
              <Select required onValueChange={(value) => handleInputChange("urgency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How urgent is your need for support?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine - Within 1-2 weeks is fine</SelectItem>
                  <SelectItem value="soon">Soon - Within a few days would be helpful</SelectItem>
                  <SelectItem value="urgent">Urgent - Need support this week</SelectItem>
                  <SelectItem value="crisis">Crisis - Need immediate support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What brings you here today? *</label>
              <Textarea
                required
                value={formData.concerns}
                onChange={(e) => handleInputChange("concerns", e.target.value)}
                placeholder="Share what's on your mind. This helps us match you with the right counselor and prepare for your session. Everything you share is confidential."
                rows={4}
              />
            </div>

            <div className="bg-accent-light p-4 rounded-lg">
              <p className="text-xs text-accent">
                <strong>Crisis Support:</strong> If you're having thoughts of self-harm or suicide, please contact emergency services (911) 
                or our crisis helpline (1800-123-4567) immediately. This booking form is for non-emergency support.
              </p>
            </div>

            <Button type="submit" className="w-full btn-primary">
              <Calendar className="w-4 h-4 mr-2" />
              Submit Booking Request
            </Button>
          </form>
        </Card>

        {/* What to Expect */}
        <Card className="mt-8 bg-calm-blue">
          <div className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              What to Expect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Professional Support</h4>
                <p className="text-muted-foreground">Licensed counselors with experience in student mental health</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Flexible Scheduling</h4>
                <p className="text-muted-foreground">Sessions available during evenings and weekends to fit your schedule</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Ongoing Care</h4>
                <p className="text-muted-foreground">Option for regular sessions and continued support throughout your journey</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Booking;