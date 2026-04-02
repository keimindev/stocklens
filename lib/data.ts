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


export const getStockQuote = async (symbol: string): Promise<StockQuote> => {
  const response = await fetch(
    `${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`
  );
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};