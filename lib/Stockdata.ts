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

export interface Recommendation {
  buy: number;
  hold: number;
  period: string; // "2025-03-01"
  sell: number;
  strongBuy: number;
  strongSell: number;
  symbol: string;
}

export interface ChartData{
    date: string;
    price: number;
}

export interface FormattedRecData {
  period: string;       // X축 (예: 'Mar 25')
  'Strong Buy': number; // 누적할 데이터 1
  Buy: number;          // 누적할 데이터 2
  Hold: number;         // 누적할 데이터 3
  Sell: number;         // 누적할 데이터 4
  'Strong Sell': number;// 누적할 데이터 5
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


export const formatRecommendationData = (data: Recommendation[]): FormattedRecData[] => {
  // 최신 데이터가 오른쪽으로 오게 하려면 reverse()가 필요할 수 있습니다.
  return data.map((item) => ({
    // '2025-03-01' -> 'Mar 25' 형식으로 변환 (Recharts X축 가독성)
    period: new Date(item.period).toLocaleDateString('en-US', { 
      month: 'short', 
      year: '2-digit' 
    }),
    'Strong Buy': item.strongBuy || 0,
    Buy: item.buy || 0,
    Hold: item.hold || 0,
    Sell: item.sell || 0,
    'Strong Sell': item.strongSell || 0,
  })).reverse(); // 최신 데이터가 오른쪽에 위치하도록 배열 순서 뒤집기
};

export const getRecommendations = async (symbol: string): Promise<Recommendation[]> => {
  try {
    const response = await finnhubClient.get<Recommendation[]>('/stock/recommendation', {
      params: {
        symbol: symbol.toUpperCase(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch recommendations:", error);
    return []; // 에러 발생 시 빈 배열 반환으로 안정성 확보
  }
};

