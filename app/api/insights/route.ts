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
      temp: Math.round(weather.current.temp),
      feelsLike: Math.round(weather.current.feelsLike),
      humidity: weather.current.humidity,
      windspeed: weather.current.windspeed,
      precipitation: weather.current.precipitation,
      weatherCode: weatherCodeMap[weather.current.weatherCode].label,
      daily: weather.daily.map((day: ForecastDay) => ({
        date: day.date,
        tempMax: Math.round(day.tempMax),
        tempMin: Math.round(day.tempMin),
        weatherCode: day.weatherCode,
      })),
    };
    const prompt = `Given the following weather data as JSON:
    ${JSON.stringify(minimalWeather, null, 2)}
    
    Generate an array of 5 objects in JSON format. Each object must have:
    - id (1-5)
    - title (fixed from this list, but for the first one include the location in the format "City, Country - Weather Overview":
      ["Weather Overview", "Forecast Outlook", "Sports & Fun Vibes", "Local Attractions", "Culture & Lifestyle"])
    - summary:
      - For id = 1 ("Weather Overview"), provide a concise summary of at least 3 sentences describing the current weather conditions.
      - For ids 2–5, provide a one-sentence natural-language summary related to the theme of the card and based on the weather data and/or location context.
    - features:
      - For id = 1 ("Weather Overview"): list 3 features showing exact metrics (temperature, feels like, humidity, wind, precipitation).
      - For ids 2–5: list 3 creative features that match the theme of the card (e.g., forecast tips, seasonal sports or activities, popular sites or attractions, cultural/food/lifestyle recommendations). Do not just repeat raw metrics.
    - subTitle: a short 1–2 word label that matches the theme of the features in each object (e.g., "Planning", "Activities", "Sites", "Culture").
    
    Rules:
    - Do not invent fake numerical data — only use metrics from the provided JSON where required (in the Weather Overview card).
    - Ensure features are specific, contextual, and engaging, not generic filler text.
    - Return only the JSON array.`;
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      temperature: 0.9,
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
    } catch {
      return NextResponse.json(
        { error: "Model did not return valid JSON." },
        { status: 500 }
      );
    }

    return NextResponse.json(insights);
  } catch {
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
