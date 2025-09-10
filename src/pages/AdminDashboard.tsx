import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Users, MessageCircle, Calendar, AlertTriangle, Download, RefreshCw } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  // Mock data for charts
  const stressTrendData = [
    { month: "Jan", stress: 65, anxiety: 45, depression: 25 },
    { month: "Feb", stress: 70, anxiety: 50, depression: 30 },
    { month: "Mar", stress: 85, anxiety: 65, depression: 35 },
    { month: "Apr", stress: 90, anxiety: 75, depression: 40 },
    { month: "May", stress: 95, anxiety: 85, depression: 45 },
    { month: "Jun", stress: 80, anxiety: 70, depression: 38 },
    { month: "Jul", stress: 75, anxiety: 60, depression: 32 },
    { month: "Aug", stress: 88, anxiety: 78, depression: 42 }
  ];

  const categoryData = [
    { name: "Academic Stress", value: 145, color: "#3B82F6" },
    { name: "Anxiety", value: 98, color: "#EF4444" },
    { name: "Depression", value: 67, color: "#8B5CF6" },
    { name: "Social Issues", value: 54, color: "#EC4899" },
    { name: "Family Problems", value: 34, color: "#10B981" },
    { name: "Financial Stress", value: 28, color: "#F59E0B" }
  ];

  const sessionData = [
    { day: "Mon", sessions: 24 },
    { day: "Tue", sessions: 32 },
    { day: "Wed", sessions: 28 },
    { day: "Thu", sessions: 35 },
    { day: "Fri", sessions: 29 },
    { day: "Sat", sessions: 18 },
    { day: "Sun", sessions: 15 }
  ];

  const peakHoursData = [
    { hour: "6AM", usage: 5 },
    { hour: "8AM", usage: 15 },
    { hour: "10AM", usage: 35 },
    { hour: "12PM", usage: 55 },
    { hour: "2PM", usage: 45 },
    { hour: "4PM", usage: 65 },
    { hour: "6PM", usage: 85 },
    { hour: "8PM", usage: 95 },
    { hour: "10PM", usage: 75 },
    { hour: "12AM", usage: 25 }
  ];

  const kpiCards = [
    {
      title: "Active Students",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Monthly Sessions",
      value: "1,234",
      change: "+8.3%", 
      trend: "up",
      icon: Calendar,
      color: "text-green-600"
    },
    {
      title: "Crisis Interventions",
      value: "23",
      change: "-15.2%",
      trend: "down",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Forum Posts",
      value: "845",
      change: "+22.1%",
      trend: "up", 
      icon: MessageCircle,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-calm py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Monitor student mental health trends and platform usage insights
            </p>
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Select defaultValue="30days">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
                <SelectItem value="90days">90 Days</SelectItem>
                <SelectItem value="1year">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
            const IconComponent = kpi.icon;
            return (
              <Card key={index} className="card-calm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-sm font-medium flex items-center gap-1 ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                      {kpi.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">{kpi.value}</h3>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Stress Trends Over Time */}
          <Card className="card-calm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Mental Health Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stressTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="stress" stroke="#3B82F6" strokeWidth={2} name="Stress" />
                  <Line type="monotone" dataKey="anxiety" stroke="#EF4444" strokeWidth={2} name="Anxiety" />
                  <Line type="monotone" dataKey="depression" stroke="#8B5CF6" strokeWidth={2} name="Depression" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Issue Categories */}
          <Card className="card-calm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Support Requests by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Sessions */}
          <Card className="card-calm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Counseling Sessions This Week</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sessionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="day" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="sessions" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Peak Usage Hours */}
          <Card className="card-calm">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-6">Peak Usage Hours</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hour" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="usage" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 card-calm">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Crisis Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">High-risk keyword detected</p>
                    <p className="text-sm text-red-700">Student mentioned self-harm in chat session</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-red-600">2 hours ago</p>
                  <Button size="sm" variant="outline" className="mt-1">
                    Review
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-900">Multiple support requests</p>
                    <p className="text-sm text-yellow-700">Same student booked 3 sessions this week</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-yellow-600">1 day ago</p>
                  <Button size="sm" variant="outline" className="mt-1">
                    Follow up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;