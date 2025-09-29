import { NextRequest, NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: NextRequest) {
  try {
    const { minimalPlaces, searchHistory } = await req.json();
    const prompt = `You are a travel/weather assistant. Given the user's saved places and search history, suggest 4 unique, interesting places (not already in the lists) as an array of objects. Each object should have: id (number), name (city), country, latitude, longitude. Use the lists below for inspiration, but do not repeat places. Return only the JSON array.

Saved places: ${JSON.stringify(minimalPlaces, null, 2)}
Search history: ${JSON.stringify(searchHistory, null, 2)}
`;

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      temperature: 0.9,
      messages: [
        {
          role: "system",
          content: "You are a helpful travel/weather assistant.",
        },
        { role: "user", content: prompt },
      ],
    });
    const text = await result.text;
    let places;
    try {
      places = JSON.parse(text);
    } catch (e) {
      return NextResponse.json(
        { error: "Model did not return valid JSON." },
        { status: 500 }
      );
    }
    return NextResponse.json(places);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate recommended places" },
      { status: 500 }
    );
  }
}
