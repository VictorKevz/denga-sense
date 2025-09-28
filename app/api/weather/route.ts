import { NextRequest, NextResponse } from "next/server";
import {
  getWeather,
  getDailyForecast,
  getHourlyForecast,
} from "@/app/lib/weather";

export async function POST(req: NextRequest) {
  try {
    const { lat, lon } = await req.json();
    const [currentData, dailyData, hourlyData] = await Promise.all([
      getWeather(lat, lon),
      getDailyForecast(lat, lon),
      getHourlyForecast(lat, lon),
    ]);
    return NextResponse.json({
      current: {
        ...currentData,
        precipitation: hourlyData[0]?.precipitation,
        humidity: hourlyData[0]?.humidity,
        feelsLike: hourlyData[0]?.feelsLike,
      },
      daily: dailyData,
      hourly: hourlyData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load weather data." },
      { status: 500 }
    );
  }
}
