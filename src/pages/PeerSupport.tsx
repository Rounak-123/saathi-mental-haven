import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MessageCircle, Heart, Plus, Search, Filter, ThumbsUp, MessageSquare, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reply {
  id: string;
  content: string;
  author: string;
  timeAgo: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  timeAgo: string;
  likes: number;
  replies: number;
  isAnonymous: boolean;
  author: string;
  isLiked?: boolean;
  replyList?: Reply[]; // ✅ Added reply list
}

const PeerSupport = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Feeling overwhelmed with final exams approaching",
      content: "Hey everyone, I'm in my third year and finals are just around the corner. I've been having panic attacks thinking about all the studying I need to do. Anyone else feeling this way? How do you manage exam stress?",
      category: "Academic Stress",
      timeAgo: "2 hours ago",
      likes: 12,
      replies: 8,
      isAnonymous: true,
      author: "Anonymous Student",
      isLiked: false,
      replyList: []
    },
    {
      id: "2", 
      title: "Homesickness is hitting hard this semester",
      content: "This is my first year living away from home and I'm really struggling with homesickness. I miss my family so much that it's affecting my studies. Any tips for dealing with this?",
      category: "Homesickness",
      timeAgo: "5 hours ago",
      likes: 18,
      replies: 15,
      isAnonymous: true,
      author: "FirstYear2024",
      isLiked: true,
      replyList: []
    },
    {
      id: "3",
      title: "Finding it hard to make friends",
      content: "I've been at uni for 6 months now but I still feel like I don't have any real friends. I see groups everywhere but feel like I don't fit in anywhere. How did you all make your first friendships at university?",
      category: "Social Connection",
      timeAgo: "1 day ago", 
      likes: 24,
      replies: 22,
      isAnonymous: false,
      author: "QuietStudent",
      isLiked: false,
      replyList: []
    },
    {
      id: "4",
      title: "Dealing with imposter syndrome in my program",
      content: "I'm studying computer science and sometimes I feel like I don't belong here. Everyone seems so much smarter than me. I keep thinking they'll realize I'm not cut out for this. Anyone else experience this?",
      category: "Self-Doubt",
      timeAgo: "2 days ago",
      likes: 31,
      replies: 19,
      isAnonymous: true,
      author: "Anonymous Student",
      isLiked: true,
      replyList: []
    }
  ]);

  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    isAnonymous: true
  });
  const { toast } = useToast();

  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({}); // ✅ reply input per post
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // ✅ track which post is being replied to

  const categories = [
    "Academic Stress",
    "Anxiety", 
    "Depression",
    "Social Connection",
    "Homesickness",
    "Self-Doubt",
    "Relationship Issues",
    "Financial Stress",
    "Future Worries",
    "Other"
  ];

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked 
          }
        : post
    ));
  };

  const handleReplySubmit = (postId: string) => {
    if (!replyContent[postId]?.trim()) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      content: replyContent[postId],
      author: "You",
      timeAgo: "Just now"
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            replies: post.replies + 1,
            replyList: [...(post.replyList || []), newReply]
          }
        : post
    ));

    setReplyContent({ ...replyContent, [postId]: "" });
    setReplyingTo(null);
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim() || !newPost.category) {
      toast({
        title: "Please fill in all fields",
        description: "Title, content, and category are required to post.",
        variant: "destructive"
      });
      return;
    }

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      timeAgo: "Just now",
      likes: 0,
      replies: 0,
      isAnonymous: newPost.isAnonymous,
      author: newPost.isAnonymous ? "Anonymous Student" : "You",
      isLiked: false,
      replyList: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "", isAnonymous: true });
    setShowNewPostForm(false);
    
    toast({
      title: "Post shared successfully!",
      description: "Your post is now visible to the community. Thank you for sharing.",
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Academic Stress": "bg-blue-100 text-blue-700",
      "Anxiety": "bg-red-100 text-red-700",
      "Depression": "bg-purple-100 text-purple-700",
      "Social Connection": "bg-pink-100 text-pink-700",
      "Homesickness": "bg-green-100 text-green-700",
      "Self-Doubt": "bg-yellow-100 text-yellow-700",
      "Relationship Issues": "bg-orange-100 text-orange-700",
      "Financial Stress": "bg-gray-100 text-gray-700",
      "Future Worries": "bg-indigo-100 text-indigo-700",
      "Other": "bg-slate-100 text-slate-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-calm py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Peer Support Forum</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with fellow students in a safe, anonymous space. Share your experiences, offer support, and know that you're not alone.
          </p>
        </div>

        {/* Community Guidelines */}
        <Card className="mb-8 bg-soft-green border-secondary">
          <div className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-secondary mt-1" />
              <div>
                <h3 className="font-semibold text-secondary mb-2">Community Guidelines</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Be kind, respectful, and supportive to all community members</p>
                  <p>• Share experiences honestly but respect privacy (yours and others')</p>
                  <p>• No judgment zone - everyone's struggles are valid</p>
                  <p>• If you're in crisis, please seek immediate professional help</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* New Post Button & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setShowNewPostForm(true)} className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Share Your Story
          </Button>
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <Card className="mb-8 card-calm">
            <form onSubmit={handleSubmitPost} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Share with the community</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewPostForm(false)}
                >
                  Cancel
                </Button>
              </div>
              
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Give your post a title..."
                required
              />
              
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="Share what's on your mind. Remember, this is a supportive space where your experiences matter..."
                rows={4}
                required
              />
              
              <div className="flex items-center gap-4">
                <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={newPost.isAnonymous}
                    onChange={(e) => setNewPost({...newPost, isAnonymous: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                    Post anonymously
                  </label>
                </div>
              </div>
              
              <Button type="submit" className="btn-primary">
                <Heart className="w-4 h-4 mr-2" />
                Share Post
              </Button>
            </form>
          </Card>
        )}

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="card-calm hover:shadow-soft transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.author} • {post.timeAgo}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{post.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{post.content}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${post.isLiked ? 'text-accent' : 'text-muted-foreground'}`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    {post.replies} replies
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground"
                    onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                  >
                    Reply
                  </Button>
                </div>

                {/* ✅ Reply Section */}
                {replyingTo === post.id && (
                  <div className="mt-4 space-y-3">
                    <Textarea
                      placeholder="Write your reply..."
                      value={replyContent[post.id] || ""}
                      onChange={(e) => setReplyContent({ ...replyContent, [post.id]: e.target.value })}
                      rows={2}
                    />
                    <Button size="sm" className="btn-primary" onClick={() => handleReplySubmit(post.id)}>
                      Post Reply
                    </Button>
                  </div>
                )}

                {post.replyList && post.replyList.length > 0 && (
                  <div className="mt-4 pl-4 border-l space-y-2">
                    {post.replyList.map((reply) => (
                      <div key={reply.id} className="bg-muted p-2 rounded text-sm">
                        <span className="font-medium">{reply.author}</span> • {reply.timeAgo}
                        <p>{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or be the first to share something!</p>
              <Button onClick={() => setShowNewPostForm(true)} className="btn-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeerSupport;
