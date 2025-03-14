import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";

const data = {
  summary:
    "The reviews present mixed feedback. One reviewer criticized the food quality, particularly poor ingredient portions in a takeout order. Another reviewer praised the excellent customer service, friendly staff, and quick service. A third reviewer expressed dissatisfaction but did not specify any details.",
  next_action:
    "Improve consistency in food preparation and ingredient portions, especially for takeout orders. Continue reinforcing strong customer service. Consider reaching out to dissatisfied customers for more specific feedback to identify areas for improvement.",
  categories: {
    "Product/Service Quality": 10,
    "Customer Service": 7,
    "Pricing": 5,
    "Atmosphere/Environment": 3,
    "Location/Accessibility": 4,
    "Suggestions": 6,
  },
};

export default function Dashboard() {
  return (
    <div className="h-screen p-6 flex flex-col gap-6 bg-background">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="text-xl font-bold">Review Summary</CardHeader>
        <CardContent>{data.summary}</CardContent>
      </Card>
      <Card>
        <CardHeader className="text-lg font-semibold">Next Action</CardHeader>
        <CardContent>{data.next_action}</CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data.categories).map(([category, count]) => (
          <Card key={category}>
            <CardHeader className="flex items-center gap-2 text-lg font-semibold">
              <BarChart size={20} /> {category}
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{category}</span>
                  <span>{count}</span>
                </div>
                <Progress value={(count / 10) * 100} className="h-2 bg-gray-200" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
