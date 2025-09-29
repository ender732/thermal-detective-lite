import { Thermometer, Wind, Snowflake, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SensorData {
  location: string;
  temperature: number;
  icon: typeof Thermometer;
  status: "normal" | "warning";
}

const Dashboard = () => {
  // Simulated sensor data
  const sensors: SensorData[] = [
    { location: "Living Room", temperature: 22, icon: Thermometer, status: "normal" },
    { location: "Window Frame", temperature: 16, icon: Wind, status: "warning" },
    { location: "Refrigerator", temperature: 4, icon: Snowflake, status: "normal" },
  ];

  // Simulated alerts
  const alerts = [
    {
      id: 1,
      type: "phantom-draft",
      title: "Phantom Draft Detected",
      message: "Temperature difference of 6°C between living room and window. Check for drafts or open windows.",
      severity: "high",
      active: true,
    },
    {
      id: 2,
      type: "fridge-leak",
      title: "Fridge Leak Alert",
      message: "Refrigerator temperature spiked to 8°C. Check if door is properly closed.",
      severity: "medium",
      active: false,
    },
  ];

  const energyScore = 87; // Weekly score out of 100
  const alertsThisWeek = 3;
  const alertsLastWeek = 8;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Thermal Detective</h1>
              <p className="text-sm text-muted-foreground">Home Energy Monitoring</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Apartment 12B
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Energy Score */}
        <Card className="p-6 bg-gradient-thermal shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-foreground/80">Weekly Energy Score</p>
              <h2 className="text-5xl font-bold text-primary-foreground mt-2">{energyScore}</h2>
              <p className="text-sm text-primary-foreground/70 mt-2">
                {alertsThisWeek < alertsLastWeek ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    {alertsLastWeek - alertsThisWeek} fewer alerts than last week
                  </span>
                ) : (
                  <span>{alertsThisWeek} alerts this week</span>
                )}
              </p>
            </div>
            <div className="text-primary-foreground/60 text-6xl font-light">/100</div>
          </div>
        </Card>

        {/* Active Alerts */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-alert" />
            Active Alerts
          </h3>
          
          {alerts
            .filter((alert) => alert.active)
            .map((alert) => (
              <Card
                key={alert.id}
                className="p-6 bg-gradient-alert shadow-alert animate-pulse-alert border-alert/20"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-alert-foreground/10">
                    <AlertTriangle className="w-6 h-6 text-alert-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-alert-foreground">{alert.title}</h4>
                      <Badge variant="destructive" className="text-xs">
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-alert-foreground/90">{alert.message}</p>
                  </div>
                </div>
              </Card>
            ))}
          
          {alerts.filter((alert) => alert.active).length === 0 && (
            <Card className="p-6 bg-gradient-card shadow-card">
              <div className="flex items-center gap-3 text-success">
                <CheckCircle2 className="w-6 h-6" />
                <p className="font-medium">All systems normal - no active alerts</p>
              </div>
            </Card>
          )}
        </div>

        {/* Sensor Readings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Sensor Readings</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {sensors.map((sensor, index) => {
              const Icon = sensor.icon;
              return (
                <Card
                  key={index}
                  className="p-6 bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {sensor.status === "warning" && (
                      <Badge variant="outline" className="border-alert text-alert">
                        Alert
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{sensor.location}</h4>
                  <p className="text-3xl font-bold text-primary">{sensor.temperature}°C</p>
                  <p className="text-xs text-muted-foreground mt-2">Last updated: just now</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent History */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Recent History</h3>
          <Card className="p-6 bg-gradient-card shadow-card">
            <div className="space-y-4">
              {alerts
                .filter((alert) => !alert.active)
                .map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="p-2 rounded-full bg-muted">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">Resolved 2 hours ago</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
