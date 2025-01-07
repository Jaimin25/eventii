import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.APP_SCRIPT}/exec?action=getSummary`,
      {
        method: "GET",
      }
    );

    const response = await res.json();

    return NextResponse.json({ status: 200, message: response });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error: " + (error as Error).message,
    });
  }
}
