import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Calendar, BookOpen, Users, BarChart3, Heart, Shield, Clock, Users2, Star } from "lucide-react";
import heroImage from "@/assets/hero-mental-health.jpg";

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Talk to Saathi",
      description: "24/7 AI-powered mental health companion ready to listen and provide immediate support when you need it most.",
      link: "/chat",
      color: "bg-blue-50 text-blue-600",
      buttonText: "Start Chatting"
    },
    {
      icon: Calendar,
      title: "Book Counselor Session", 
      description: "Connect with qualified mental health professionals through confidential, flexible sessions that fit your schedule.",
      link: "/booking",
      color: "bg-green-50 text-green-600",
      buttonText: "Book Session"
    },
    {
      icon: BookOpen,
      title: "Resource Hub",
      description: "Access curated mental health resources including guided videos, audio sessions, and guides in multiple languages.",
      link: "/resources",
      color: "bg-purple-50 text-purple-600", 
      buttonText: "Explore Resources"
    },
    {
      icon: Users,
      title: "Peer Support Forum",
      description: "Connect with fellow students in a safe, anonymous community where you can share experiences and find support.",
      link: "/peer-support",
      color: "bg-pink-50 text-pink-600",
      buttonText: "Join Community"
    }
  ];

  const stats = [
    { number: "2,847", label: "Students Supported", icon: Users2 },
    { number: "1,234", label: "Counseling Sessions", icon: Calendar },
    { number: "845", label: "Community Posts", icon: MessageCircle },
    { number: "4.9", label: "Average Rating", icon: Star }
  ];

  const testimonials = [
    {
      text: "Saathi helped me through my darkest moments during finals. The 24/7 chat support made me feel less alone.",
      author: "Anonymous Student, Engineering",
      year: "3rd Year"
    },
    {
      text: "The peer support forum connected me with others going through similar struggles. I finally felt understood.",
      author: "Anonymous Student, Arts",
      year: "2nd Year"
    },
    {
      text: "Booking a counselor session was so easy and confidential. It changed my perspective on seeking help.",
      author: "Anonymous Student, Medicine",
      year: "4th Year"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white">
                Saathi
              </h1>
            </div>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-4 font-medium">
              Your Trusted Mental Health Companion
            </p>
            
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              A safe, supportive platform designed specifically for students. Get immediate support, connect with professionals, 
              and join a caring community that understands your journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/chat">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-soft transition-smooth">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Talk to Saathi Now
                </Button>
              </Link>
              <Link to="/booking">
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold shadow-soft transition-smooth">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Counselor Session
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-white/70">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm">100% Confidential</span>  
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Student-Focused</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.number}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-calm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support tools designed specifically for the unique challenges students face.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="card-feature group hover:scale-[1.02] transition-all duration-300">
                  <div className="p-8">
                    <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                      <IconComponent className="w-7 h-7" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
                    
                    <Link to={feature.link}>
                      <Button className="btn-primary group-hover:shadow-soft">
                        {feature.buttonText}
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-accent-light">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white border-accent shadow-soft">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-accent mb-4">Crisis Support Available</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you're having thoughts of self-harm or experiencing a mental health emergency, 
                please reach out immediately. You're not alone, and help is available right now.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-accent hover:bg-accent/90 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Crisis Chat - Available Now
                </Button>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
                  Emergency Helpline: 1800-123-4567
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Stories from Our Community  
            </h2>
            <p className="text-xl text-muted-foreground">
              Real experiences from students who found support through Saathi
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-calm">
                <div className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.year}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Take the First Step Today
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Your mental health matters. Start your journey to wellness with Saathi - 
              your trusted companion in mental health support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-10 py-4 text-lg font-semibold shadow-soft transition-smooth">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/resources">
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-4 text-lg font-semibold shadow-soft transition-smooth">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;