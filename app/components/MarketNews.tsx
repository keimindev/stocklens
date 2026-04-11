"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMarketNews} from "@/lib/Stockdata";
import { motion, AnimatePresence } from "framer-motion";

export function MarketNews() {
  const [news, setNews] = useState([]);
  const [loading, setloading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getMarketNews().then((newsData) => {
      setNews(newsData);
      setloading(false);
    });
  }, []);

  const newsRolling = (news) => {
    if (news.length === 0) return; // 뉴스 데이터가 없으면 타이머 설정하지 않음

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % news.length); // 뉴스 아이템 순환
    }, 5000);

    return () => clearInterval(timer);
  };

  useEffect(() => {
    if (!loading) {
      newsRolling(news);
    }
  }, [news]);

  return (
    <Card className="col-span-12">
      <CardHeader>
        <CardTitle className="text-lg">Market Overview</CardTitle>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="lg:w-[750px] h-32 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center relative bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <a
                href={news[index]?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium mt-0 text-sm text-blue-600 flex items-start w-full group"
              >
                <span className="flex-shrink-0 text-sm font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-3 ml-3 mt-1">TRENDING</span>
                <span className="text-lg text-slate-900 group-hover:underline leading-snug break-words flex-1 mt-1">{news[index]?.headline}</span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
