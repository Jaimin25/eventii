import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const res = await fetch(`${process.env.APP_SCRIPT}/exec?action=joinEvent`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const response = await res.json();

    return NextResponse.json({ status: 200, message: response });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error: " + (error as Error).message,
    });
  }
}
