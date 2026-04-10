"use client";

import { useEffect, useState } from "react";
import {
  getRecommendations,
  formatRecommendationData,
  FormattedRecData,
} from "@/lib/Stockdata";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function RecommendationChart({ symbol }: { symbol: string }) {
  const [chartData, setChartData] = useState<FormattedRecData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecommendations(symbol)
      .then((res) => {
        setChartData(formatRecommendationData(res));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [symbol]);

  const COLORS = {
    strongBuy: "#166534", 
    buy: "#22c55e", 
    hold: "#f59e0b", 
    sell: "#ef4444", 
    strongSell: "#991b1b", 
  };

  return (
    <Card className="col-span-12 lg:col-span-8">
 <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          Analyst Recommendations ({symbol})
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[350px] w-full p-0 pr-4">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center bg-slate-50">
            <p className="text-sm text-slate-400 animate-pulse">
              Loading Recs...
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="period"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                cursor={{ fill: "rgba(0,0,0,0.05)" }} 
              />
              <Legend
                iconSize={10}
                iconType="circle"
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
              />
              <Bar
                dataKey="Strong Buy"
                stackId="a"
                fill={COLORS.strongBuy}
                radius={[0, 0, 0, 0]}
                barSize={35}
              />
              <Bar dataKey="Buy" stackId="a" fill={COLORS.buy} />
              <Bar dataKey="Hold" stackId="a" fill={COLORS.hold} />
              <Bar dataKey="Sell" stackId="a" fill={COLORS.sell} />
              <Bar
                dataKey="Strong Sell"
                stackId="a"
                fill={COLORS.strongSell}
                radius={[4, 4, 0, 0]}
              />{" "}
              {/* 맨 위 막대에만 곡선 적용 */}
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
