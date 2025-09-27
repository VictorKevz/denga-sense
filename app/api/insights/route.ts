import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const weather = body.weather;
    const insights = [
      {
        id: 1,
        title: "Today’s Summary",
        description: `Currently ${weather.current.temp}°C in ${
          weather.current.city || "Oulu"
        }.
  Feels like ${
    weather.current.feelsLike ?? weather.current.temp
  }°C with winds around ${weather.current.windspeed ?? 0} km/h.
  Humidity is at ${
    weather.current.humidity ?? 0
  }% and precipitation chances remain low.`,
      },
      {
        id: 2,
        title: "Forecast Outlook",
        description:
          "Rain tomorrow with cooler temps, but the weekend warms up and turns sunnier.",
      },
      {
        id: 3,
        title: "Activity Outlook",
        description:
          "Good conditions for outdoor activity today! Consider a jog or evening walk.",
      },
      {
        id: 4,
        title: "Comfort & Conditions",
        description:
          "High humidity may make it feel warmer than the actual temperature. Light winds expected.",
      },
      {
        id: 5,
        title: "Fun Vibes",
        description: "Hoodie weather today — perfect excuse for a hot drink.",
      },
    ];

    return NextResponse.json(insights);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
