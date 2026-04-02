"use client";

import { useEffect, useState } from "react";
import { getStockCandles, ChartData } from "@/lib/Stockdata";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MainChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    getStockCandles(symbol).then(setData).catch(console.error);
  }, [symbol]);

  return (
    <Card className="col-span-12 lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Price History</CardTitle>
        <div className="flex gap-2">
          {["24h", "7d", "30d", "1y"].map((t) => (
            <Button key={t} variant="outline" size="sm">
              {t}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[350px] w-full p-0 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="date"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              domain={["auto", "auto"]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#f59e0b"
              fillOpacity={1}
              fill="url(#colorPrice)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
