const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}

export interface ChartData{
    date: string;
    price: number;
}



export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  const response = await fetch(
    `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const getStockCandles = async (symbol: string, resolution: string = 'D'): Promise<ChartData[]> => {
  // 현재 시간과 1년 전 시간을 Unix Timestamp로 계산
  const to = Math.floor(Date.now() / 1000);
  const from = to - (60 * 60 * 24 * 365); // 1년 전

  const response = await fetch(
    `${BASE_URL}/stock/candle?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}&token=${API_KEY}`
  );

  const data = await response.json();

  if (data.s !== 'ok') throw new Error('Failed to fetch candle data');

  // Finnhub의 [c: 가격배열, t: 시간배열] 구조를 Recharts가 읽을 수 있는 [{date, price}] 배열로 변환
  return data.t.map((time: number, index: number) => ({
    date: new Date(time * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: data.c[index],
  }));
};