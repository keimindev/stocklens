import axios from 'axios';

const finnhubClient = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: process.env.NEXT_PUBLIC_FINNHUB_API_KEY, // 환경변수에서 키 관리
  },
  timeout: 5000, // 5초 타임아웃 설정
});

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
  try{
    const response = await finnhubClient.get('/quote', {
      params:{
        symbol : symbol.toUpperCase(),
      }
  });
  return response.data;;
 } catch(error){
  if(axios.isAxiosError(error)){
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(`Failed to fetch stock quote: ${error.message}`);
  } else {
    throw new Error('An unexpected error occurred');
  }
 }
};
