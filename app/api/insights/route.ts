import { NextRequest, NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { ForecastDay } from "@/app/types/weather";
import { weatherCodeMap } from "@/app/data/weatherIcons";

export async function POST(req: NextRequest) {
  try {
    const { weather } = await req.json();
    const minimalWeather = {
      city: weather.current.city,
      country: weather.current.country,
      temp: weather.current.temp,
      feelsLike: weather.current.feelsLike,
      humidity: weather.current.humidity,
      windspeed: weather.current.windspeed,
      precipitation: weather.current.precipitation,
      weatherCode: weatherCodeMap[weather.current.weatherCode].label,
      daily: weather.daily.map((day: ForecastDay) => ({
        date: day.date,
        tempMax: day.tempMax,
        tempMin: day.tempMin,
        weatherCode: day.weatherCode,
      })),
    };
    const prompt = `Given the following weather data as JSON:
${JSON.stringify(minimalWeather, null, 2)}

Generate an array of 5 objects in JSON format. Each object must have an id (1-5), a fixed title from this list: ["Today’s Summary", "Forecast Outlook", "Activity Outlook", "Comfort & Conditions", "Fun Vibes"], and a description that is a that corresponds the title, well-detailed summary only based on the weather data. Only change the description based on the data and keep it concise. Return only the JSON array.`;

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      messages: [
        {
          role: "system",
          content: "You are a helpful weather insights generator.",
        },
        { role: "user", content: prompt },
      ],
    });

    const text = await result.text;
    let insights;
    try {
      insights = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        { error: "Model did not return valid JSON." },
        { status: 500 }
      );
    }

    return NextResponse.json(insights);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
