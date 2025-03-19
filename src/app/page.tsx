import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import Menubar from "../components/ui/Menubar"
import "./page.module.css"
import "./page.css"
import DynamicPieChart, { PieChartData } from "@/components/DynamicPieChart";
import { useEffect, useState } from "react";

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

const pieChartData: Record<string, PieChartData[]> = {
  "Product/Service Quality": [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ],
  "Customer Service": [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ],
  "Pricing": [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ],
  "Atmosphere/Environment": [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ],
  "Location/Accessibility": [
    { name: "Group A", value: 500 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ],
  "Suggestions": [
    { name: "Group A", value: 200 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ],
};

export default function Dashboard() {
  const [analyze_result, setAnalyzeResult] = useState<any>(null);

  useEffect(() => {
    const fetchAnalyzeData = async () => {
      try {
        const response = await fetch("http://localhost:5000/analysis/get_analyze_result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company_id: 3 }),
        });
        const data = await response.json();
        setAnalyzeResult(data);
      } catch (error) {
        console.error("Error fetching analyze data: ", error);
      }
    }
  }, []);


  return (
    <div className="flex flex_row">
      <Menubar/>
      <div className="flex flex-col h-screen p-6 dashboard-container gap-6">
        <h2 className="text-4xl font-bold pb-6 pt-8">Perfomance Overview</h2>
        <div className="flex flex_row gap-25 pb-4 pl-10 place-content-between pr-10">
          <Card className="col-span-1 flex-1 md:col-span-2">
            <CardHeader className="text-xl font-bold">Review Summary</CardHeader>
            <CardContent className="text-lg">{data.summary}</CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="text-lg font-semibold">Next Action</CardHeader>
            <CardContent className="text-lg">{data.next_action}</CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Object.entries(data.categories).map(([category, count]) => (
            <Card key={category}>
              <CardHeader className="flex text-lg font-semibold gap-2 items-center">
                <DynamicPieChart piecharData={pieChartData[category] || pieChartData["Suggestions"]}/>
                <BarChart size={20} /> {category}
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{category}</span>
                    <span>{count}</span>
                  </div>
                  {/* <Progress value={(count / 10) * 100} className="bg-gray-200 h-2" /> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
