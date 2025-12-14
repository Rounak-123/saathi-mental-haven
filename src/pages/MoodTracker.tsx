import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Trash2, Calendar, TrendingUp } from "lucide-react";

interface MoodEntry {
  id: string;
  mood: string;
  mood_emoji: string;
  notes: string | null;
  created_at: string;
}

const moods = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😌", label: "Calm", value: "calm" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😰", label: "Anxious", value: "anxious" },
  { emoji: "😤", label: "Frustrated", value: "frustrated" },
  { emoji: "😴", label: "Tired", value: "tired" },
  { emoji: "🥰", label: "Loved", value: "loved" },
];

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setIsAuthenticated(true);
          setTimeout(() => fetchEntries(), 0);
        } else {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setIsAuthenticated(true);
        fetchEntries();
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("mood_entries")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching mood entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMoodEntry = async () => {
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Please log in",
          description: "You need to be logged in to track your mood",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("mood_entries").insert({
        user_id: user.id,
        mood: selectedMood.value,
        mood_emoji: selectedMood.emoji,
        notes: notes.trim() || null,
      });

      if (error) throw error;

      toast({
        title: "Mood logged!",
        description: "Your mood has been saved successfully",
      });

      setSelectedMood(null);
      setNotes("");
      fetchEntries();
    } catch (error) {
      console.error("Error saving mood:", error);
      toast({
        title: "Error",
        description: "Failed to save your mood. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase.from("mood_entries").delete().eq("id", id);
      if (error) throw error;
      
      setEntries(entries.filter((e) => e.id !== id));
      toast({
        title: "Entry deleted",
        description: "Your mood entry has been removed",
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive",
      });
    }
  };

  const getMoodStats = () => {
    if (entries.length === 0) return null;
    
    const moodCounts: Record<string, number> = {};
    entries.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
    const moodInfo = moods.find((m) => m.value === topMood[0]);
    
    return { mood: moodInfo, count: topMood[1], total: entries.length };
  };

  const stats = getMoodStats();

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <Card className="p-8 card-calm">
          <h2 className="text-2xl font-bold mb-4">Sign in to Track Your Mood</h2>
          <p className="text-muted-foreground mb-6">
            Create an account or sign in to start logging your daily moods and see your emotional patterns.
          </p>
          <Button onClick={() => navigate("/auth")} className="w-full">
            Sign In / Sign Up
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Mood Tracker
        </h1>
          <p className="text-muted-foreground">
            Track your emotional journey, one day at a time
          </p>
        </div>

        {/* Log Mood Card */}
        <Card className="p-6 mb-8 card-calm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            How are you feeling today?
          </h2>
          
          <div className="grid grid-cols-4 gap-3 mb-6">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood)}
                className={`p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2 ${
                  selectedMood?.value === mood.value
                    ? "bg-primary/20 ring-2 ring-primary scale-105"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Add a note about your day (optional)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mb-4 resize-none"
            rows={3}
            maxLength={500}
          />

          <Button
            onClick={saveMoodEntry}
            disabled={isSaving || !selectedMood}
            className="w-full"
          >
            {isSaving ? "Saving..." : "Log My Mood"}
          </Button>
        </Card>

        {/* Stats Card */}
        {stats && (
          <Card className="p-6 mb-8 card-calm bg-primary/5">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Your Mood Insights
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-4xl">{stats.mood?.emoji}</span>
              <div>
                <p className="font-medium text-foreground">
                  Most common mood: {stats.mood?.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stats.count} of {stats.total} entries in the last 30 days
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* History */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Entries</h2>
          
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading your mood history...
            </div>
          ) : entries.length === 0 ? (
            <Card className="p-8 text-center card-calm">
              <p className="text-muted-foreground">
                No mood entries yet. Start tracking how you feel!
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {entries.map((entry) => (
                <Card key={entry.id} className="p-4 card-calm">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{entry.mood_emoji}</span>
                      <div>
                        <p className="font-medium capitalize text-foreground">
                          {entry.mood}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(entry.created_at), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                        {entry.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

export default MoodTracker;
