"use client";

import { useEffect, useState } from "react";
import { getStockQuote, StockQuote } from "@/lib/Stockdata";
import { Card, CardContent } from "@/components/ui/card";

export function StockStatCard({ symbol }: { symbol: string }) {
  const [data, setData] = useState<StockQuote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStockQuote(symbol)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [symbol]);

  if (loading)
    return <Card className="col-span-3 h-24 animate-pulse bg-slate-100" />;
  if (!data) return null;

  const isPositive = data.d >= 0;

  return (
    <Card className="col-span-12 md:col-span-3">
      <CardContent className="pt-6">
        <p className="text-sm font-medium text-slate-500">{symbol}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold">${data.c.toLocaleString()}</h3>
          <span
            className={`text-sm font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}
          >
            {isPositive ? "▲" : "▼"} {data.dp.toFixed(2)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
