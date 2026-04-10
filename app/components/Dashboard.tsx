"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Globe } from "lucide-react";
import { StockStatCard } from "./HeaderCard";
import { MainChart } from "./MainChart";
import { RecommendationChart } from "./RecommendationChart";

export default function StockDashboard() {
  const stocks = ["AAPL", "TSLA", "NVDA", "AMZN"];
  const timeframes = ["24h", "7d", "30d", "1y"];

  const [selectedTimeframe, setSelectedTimeframe] = useState("1y");
  const [selectedStock, setSelectedStock] = useState("AAPL");
  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      {/* --- HEADER --- */}
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-2xl font-bold text-amber-500">
          <div className="h-6 w-6 rounded-full bg-amber-400" />
          StockLens
        </div>

        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input className="pl-10" placeholder="Search Stock..." />
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Button variant="ghost" size="sm" className="gap-2">
            <Globe className="h-4 w-4" /> Lang / DarkMode
          </Button>
        </div>
      </header>

      {/* --- MAIN GRID SYSTEM --- */}
      <div className="grid grid-cols-12 gap-4">
        {stocks.map((stock) => {
          return <StockStatCard key={stock} symbol={stock} />;
        })}

        {/* 2. Main Chart */}
        {/* <MainChart symbol={selectedStock} /> */}
        <RecommendationChart symbol={selectedStock} />

        {/* 3. Side Widgets */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-md">Trending 🔥</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>1. NVDA</span>{" "}
                  <span className="font-bold">8.2k pts</span>
                </li>
                <li className="flex justify-between">
                  <span>2. AMD</span>{" "}
                  <span className="font-bold">5.1k pts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-md">Assets</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p>AAPL: 45%</p>
              <p>TSLA: 30%</p>
            </CardContent>
          </Card>
        </div>

        {/* 4. Bottom Table (12컬럼) */}
        <Card className="col-span-12">
          <CardHeader>
            <CardTitle className="text-lg">Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-32 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center text-slate-400">
              Stock Table Placeholder (Use shadcn Table component here)
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
