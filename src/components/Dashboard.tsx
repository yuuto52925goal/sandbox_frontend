"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import DynamicPieChart, { PieChartData } from "@/components/DynamicPieChart";
import { useEffect, useMemo, useState } from "react";
import { BarChart } from "lucide-react";

interface analyzeResultType{
    action: string;
    company_id: number;
    id: number;
    summarize: string;
    [key: `negative_${string}`]: number;
    [key: `positive_${string}`]: number;
}

export const Dashboard = () =>  {

    const defaultAnalyzeResult: analyzeResultType = {
        summarize: "Overall, customers have provided mixed feedback about our services. The quality of products receives mostly positive reviews, while there are some concerns about pricing.",
        action: "Focus on improving customer service response times and consider reviewing the pricing strategy.",
        negative_atmosphere: 20,
        positive_atmosphere: 80,
        negative_location: 30,
        positive_location: 70,
        negative_price: 45,
        positive_price: 55,
        negative_quality: 15,
        positive_quality: 85,
        negative_service: 25,
        positive_service: 75,
        negative_suggestions: 40,
        positive_suggestions: 60,
        id: 1,
        company_id: 3
      };

    const categories = useMemo(() => ["atmosphere", "location", "price", "quality", "service", "suggestions"], [])

    const [analyze_result, setAnalyzeResult] = useState<analyzeResultType>(defaultAnalyzeResult);
    const [pieAnalyzeResult, setPieAnalyzeResult] = useState<Record<string, PieChartData[]>>({})
    const [currentCompany, setCorrentCompany] = useState<number>(3)

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
            const transformedData: Record<string, PieChartData[]> = {};
            categories.forEach((category) => {
              transformedData[category] = [
                { name: "Negative", value: analyzeData.result[`negative_${category}`] },
                { name: "Positive", value: analyzeData.result[`positive_${category}`] },
              ];
            });
            setPieAnalyzeResult(transformedData)
            setAnalyzeResult(analyzeData.result as analyzeResultType);
          } catch (error) {
            console.error("Error fetching analyze data: ", error);
          }
        }
        fetchAnalyzeData()
      }, [currentCompany, categories]);

    return (
        <div className="flex flex-col h-screen p-6 dashboard-container gap-6">
        <h2 className="text-4xl font-bold pb-6 pt-8" onClick={() => setCorrentCompany(3)}>Perfomance Overview</h2>
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
          {categories.map( (category, index) => (
            <Card key={category + index}>
              <CardHeader className="flex text-lg font-semibold gap-2 items-center">
                <DynamicPieChart piecharData={pieAnalyzeResult[category]}/>
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
    )
}