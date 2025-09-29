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

Generate an array of 5 objects in JSON format. Each object must have:
- id (1-5)
- title (fixed from this list except for the first one where you should insert the location in the format city, country - ["Weather Overview", "Forecast Outlook", "Activity Outlook", "Comfort & Conditions", "Fun Vibes"])
- summary: for the first object ("Today’s Weather Overview"), provide a concise summary of at least 3 sentences. For all other objects, provide a one-sentence natural-language summary of the card based on the weather data
- features: an array of 3 concise bullet points (8-12 words each) giving additional insights, tips, or related details specific to the weather data.
- subTitle: a 1 or 2-word title that matches the features in the array of each object, for example "Games" for the "Fun Vibes" object
Only change the summary, subTitle and features based on the data. Titles and ids must remain fixed. Return only the JSON array.`;

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
