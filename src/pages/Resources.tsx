import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Video, Headphones, FileText, Search, Play, Download, Heart, Brain, Zap } from "lucide-react";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Resources", icon: BookOpen },
    { id: "videos", label: "Videos", icon: Video },
    { id: "audio", label: "Audio", icon: Headphones },
    { id: "guides", label: "Guides", icon: FileText },
  ];

  const resources = [
    {
      id: 1,
      title: "Breathing Exercises for Anxiety",
      description: "Learn simple breathing techniques to calm your mind during stressful moments. Perfect for exam anxiety.",
      type: "videos",
      duration: "8 min",
      language: "English",
      category: "Anxiety",
      thumbnail: "🧘‍♀️",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Sleep Meditation in Hindi",
      description: "A soothing guided meditation to help you fall asleep peacefully. Narrated in Hindi for comfort.",
      type: "audio",
      duration: "15 min",
      language: "Hindi",
      category: "Sleep",
      thumbnail: "🌙",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Managing Academic Stress - Complete Guide",
      description: "Comprehensive strategies for handling coursework pressure, time management, and maintaining balance.",
      type: "guides",
      duration: "10 min read",
      language: "English",
      category: "Academic Stress",
      thumbnail: "📚",
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Progressive Muscle Relaxation",
      description: "Video guide to systematically relax your body and release physical tension from stress.",
      type: "videos",
      duration: "12 min",
      language: "English",
      category: "Relaxation",
      thumbnail: "💆‍♂️",
      difficulty: "Beginner"
    },
    {
      id: 5,
      title: "Mindfulness for Students in Tamil",
      description: "Introduction to mindfulness practices specifically designed for students, explained in Tamil.",
      type: "audio",
      duration: "20 min",
      language: "Tamil",
      category: "Mindfulness",
      thumbnail: "🧠",
      difficulty: "Beginner"
    },
    {
      id: 6,
      title: "Building Self-Confidence Workbook",
      description: "Interactive exercises and reflection prompts to build lasting self-confidence and self-esteem.",
      type: "guides",
      duration: "30 min read",
      language: "English",
      category: "Self-Esteem",
      thumbnail: "⭐",
      difficulty: "Intermediate"
    },
    {
      id: 7,
      title: "Quick Energy Boost Techniques",
      description: "5-minute techniques to combat fatigue and boost mental energy when studying or feeling low.",
      type: "videos",
      duration: "5 min",
      language: "English",
      category: "Energy",
      thumbnail: "⚡",
      difficulty: "Beginner"
    },
    {
      id: 8,
      title: "Overcoming Loneliness - Bengali Audio Series",
      description: "A 4-part audio series addressing loneliness and building meaningful connections, in Bengali.",
      type: "audio",
      duration: "45 min total",
      language: "Bengali",
      category: "Social Connection",
      thumbnail: "🤝",
      difficulty: "Intermediate"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "videos": return Video;
      case "audio": return Headphones; 
      case "guides": return FileText;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Anxiety": "bg-red-100 text-red-700",
      "Sleep": "bg-purple-100 text-purple-700",
      "Academic Stress": "bg-blue-100 text-blue-700",
      "Relaxation": "bg-green-100 text-green-700",
      "Mindfulness": "bg-indigo-100 text-indigo-700",
      "Self-Esteem": "bg-yellow-100 text-yellow-700",
      "Energy": "bg-orange-100 text-orange-700",
      "Social Connection": "bg-pink-100 text-pink-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-calm py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Resource Hub</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our curated collection of mental health resources including guided videos, audio sessions, and comprehensive guides in multiple regional languages.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources by title, topic, or language..."
              className="pl-10 h-12"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedCategory === id ? "default" : "outline"}
                onClick={() => setSelectedCategory(id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Quick Access */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-feature text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="p-6">
                <Heart className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Crisis Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Immediate help resources for mental health emergencies</p>
                <Button size="sm" className="btn-accent">Access Now</Button>
              </div>
            </Card>
            
            <Card className="card-feature text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="p-6">
                <Brain className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Daily Wellness</h3>  
                <p className="text-sm text-muted-foreground mb-4">Short exercises for daily mental health maintenance</p>
                <Button size="sm" className="btn-secondary">Explore</Button>
              </div>
            </Card>
            
            <Card className="card-feature text-center cursor-pointer hover:scale-105 transition-transform">
              <div className="p-6">
                <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Exam Support</h3>
                <p className="text-sm text-muted-foreground mb-4">Specialized resources for academic stress and exam anxiety</p>
                <Button size="sm" className="btn-primary">Get Help</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              {selectedCategory === "all" ? "All Resources" : categories.find(c => c.id === selectedCategory)?.label} 
              <span className="text-muted-foreground text-lg ml-2">({filteredResources.length})</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const IconComponent = getIcon(resource.type);
              return (
                <Card key={resource.id} className="card-calm hover:shadow-soft transition-all cursor-pointer group">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl mb-3">{resource.thumbnail}</div>
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{resource.duration}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {resource.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                        {resource.category}
                      </span>
                      <span className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {resource.language}
                      </span>
                      <span className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {resource.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Play className="w-3 h-3 mr-1" />
                        {resource.type === "guides" ? "Read" : "Play"}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>
        
        {/* Language Support Notice */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-soft-green border-secondary">
            <div className="p-6 text-center">
              <h3 className="font-semibold text-secondary mb-2">Multilingual Support</h3>
              <p className="text-sm text-muted-foreground">
                Our resources are available in English, Hindi, Tamil, Bengali, and more regional languages. 
                We're continuously adding content to support students from diverse linguistic backgrounds.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;