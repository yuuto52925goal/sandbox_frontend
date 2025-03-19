import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart } from "lucide-react";
import Menubar from "../components/ui/Menubar"
import "./page.module.css"
import "./page.css"
import DynamicPieChart from "@/components/DynamicPieChart";

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
    <div className="flex flex_row">
      <Menubar/>
      <div className="dashboard-container h-screen p-6 flex flex-col gap-6">
        <h2 className="text-4xl font-bold pt-8 pb-6">Perfomance Overview</h2>
        <div className="flex flex_row place-content-between gap-25 pr-10 pl-10 pb-4">
          <Card className=" flex-1 col-span-1 md:col-span-2">
            <CardHeader className="text-xl font-bold">Review Summary</CardHeader>
            <CardContent className="text-lg">{data.summary}</CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="text-lg font-semibold">Next Action</CardHeader>
            <CardContent className="text-lg">{data.next_action}</CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(data.categories).map(([category, count]) => (
            <Card key={category}>
              <CardHeader className="flex items-center gap-2 text-lg font-semibold">
                <DynamicPieChart/>
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
    </div>
  );
}
