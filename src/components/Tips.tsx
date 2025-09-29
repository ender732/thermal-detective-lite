import { Card } from "@/components/ui/card";
import { Wind, Snowflake, Lightbulb, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Tip {
  icon: typeof Wind;
  title: string;
  description: string;
  steps: string[];
  category: "draft" | "fridge" | "general";
}

const Tips = () => {
  const navigate = useNavigate();

  const tips: Tip[] = [
    {
      icon: Wind,
      title: "Fix a Drafty Window",
      description: "Drafty windows are one of the biggest sources of heat loss in homes.",
      category: "draft",
      steps: [
        "Check for visible gaps around the window frame",
        "Use weatherstripping tape on movable parts of the window",
        "Apply caulk to seal non-movable cracks and gaps",
        "Consider using a door snake or draft stopper at the window sill",
        "Install heavy curtains or thermal blinds for extra insulation",
      ],
    },
    {
      icon: Snowflake,
      title: "Check Your Fridge Seal",
      description: "A faulty refrigerator seal can increase energy consumption by up to 25%.",
      category: "fridge",
      steps: [
        "Close the fridge door on a dollar bill - if it slides out easily, the seal is weak",
        "Clean the seal with warm soapy water to remove dirt and debris",
        "Check for cracks, tears, or deformation in the rubber gasket",
        "If damaged, replace the seal (available at hardware stores)",
        "Ensure the fridge is level - use a level tool to check",
      ],
    },
    {
      icon: Lightbulb,
      title: "General Energy Saving Tips",
      description: "Small changes can lead to significant savings on your energy bill.",
      category: "general",
      steps: [
        "Keep your thermostat at 68°F (20°C) during winter",
        "Use LED bulbs instead of incandescent lights",
        "Unplug devices when not in use to avoid phantom power drain",
        "Run dishwasher and washing machine with full loads only",
        "Clean or replace HVAC filters every 1-3 months",
      ],
    },
    {
      icon: DollarSign,
      title: "Understanding Your Energy Bill",
      description: "Learn what impacts your energy costs the most.",
      category: "general",
      steps: [
        "Heating and cooling account for 40-50% of energy bills",
        "Water heating is typically 15-20% of energy costs",
        "Appliances and electronics make up about 20-25%",
        "Lighting accounts for roughly 10-15%",
        "Focus on the biggest energy users first for maximum savings",
      ],
    },
  ];

  const draftTips = tips.filter((tip) => tip.category === "draft");
  const fridgeTips = tips.filter((tip) => tip.category === "fridge");
  const generalTips = tips.filter((tip) => tip.category === "general");

  const TipCard = ({ tip }: { tip: Tip }) => {
    const Icon = tip.icon;
    return (
      <Card className="p-6 bg-gradient-card shadow-card hover:shadow-lg transition-all duration-300">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground mb-2">{tip.title}</h3>
            <p className="text-sm text-muted-foreground">{tip.description}</p>
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <h4 className="font-medium text-sm text-foreground">Steps:</h4>
          <ol className="space-y-2">
            {tip.steps.map((step, index) => (
              <li key={index} className="text-sm text-foreground flex gap-3">
                <span className="font-semibold text-primary min-w-[20px]">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Energy Saving Tips</h1>
              <p className="text-sm text-muted-foreground">Actionable advice to reduce your energy costs</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-10">
        {/* Phantom Draft Tips */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Phantom Draft Solutions</h2>
            <p className="text-muted-foreground">
              Address temperature differentials and drafts to keep your home comfortable
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {draftTips.map((tip, index) => (
              <TipCard key={index} tip={tip} />
            ))}
          </div>
        </section>

        {/* Fridge Leak Tips */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Refrigerator Maintenance</h2>
            <p className="text-muted-foreground">
              Keep your fridge running efficiently and prevent energy waste
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {fridgeTips.map((tip, index) => (
              <TipCard key={index} tip={tip} />
            ))}
          </div>
        </section>

        {/* General Tips */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">General Energy Tips</h2>
            <p className="text-muted-foreground">
              Additional strategies to optimize your energy usage
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {generalTips.map((tip, index) => (
              <TipCard key={index} tip={tip} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-thermal shadow-card text-center">
          <h3 className="text-2xl font-bold text-primary-foreground mb-2">Need More Help?</h3>
          <p className="text-primary-foreground/80 mb-6">
            Our Thermal Detective system is continuously monitoring your home for energy inefficiencies.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/")}
            className="font-semibold"
          >
            View Live Dashboard
          </Button>
        </Card>
      </main>
    </div>
  );
};

export default Tips;
