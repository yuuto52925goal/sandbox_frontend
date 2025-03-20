"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import Menubar from "../components/ui/Menubar"
import "./page.module.css"
import "./page.css"
import DynamicPieChart, { PieChartData } from "@/components/DynamicPieChart";
import { useEffect, useState } from "react";

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

  const categories = ["atmosphere", "location", "price", "quality", "service", "suggestions"]

  const [analyze_result, setAnalyzeResult] = useState<any>(null);

  useEffect(() => {
    const fetchAnalyzeData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/analysis/get_analyze_result", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ company_id: 3 }),
        });
        const analyzeData = await response.json();
        console.log(analyzeData.result)
        console.log(analyzeData.result[`negative_${categories[0]}`])
        setAnalyzeResult(analyzeData.result);
      } catch (error) {
        console.error("Error fetching analyze data: ", error);
      }
    }
    fetchAnalyzeData()
  }, []);


  return (
    <div className="flex h-screen flex-grow h-full">
      <Menubar/>
      <div className="flex flex-col h-screen p-6 dashboard-container gap-6">
        <h2 className="text-4xl font-bold pb-6 pt-8">Perfomance Overview</h2>
        <div className="flex flex_row gap-25 pb-4 pl-10 place-content-between pr-10">
          <Card className="col-span-1 flex-1 md:col-span-2">
            <CardHeader className="text-xl font-bold">Review Summary</CardHeader>
            <CardContent className="text-lg">{analyze_result?.summarize || ""}</CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="text-lg font-semibold">Next Action</CardHeader>
            <CardContent className="text-lg">{analyze_result?.action || ""}</CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map( (category) => (
            <Card key={category + ""}>
              <CardHeader className="flex text-lg font-semibold gap-2 items-center">
                <DynamicPieChart piecharData={pieChartData["Suggestions"]}/>
                <BarChart size={20} /> 
                {/* <div className="max-w-3xs">
                  {category}
                </div> */}
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <div className="flex justify-between text-lg font-medium">
                    <span>{category}</span>
                    {analyze_result && <span>total: {analyze_result[`negative_${category}`] + analyze_result[`positive_${category}`]}</span>}
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
