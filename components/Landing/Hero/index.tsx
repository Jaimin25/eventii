"use client";

import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/ui/number-ticker";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HeroComponent() {
  const [summaryData, setSummaryData] = useState({
    totalEvents: 1,
    totalParticipants: 1,
  });

  useEffect(() => {
    console.log(summaryData);
    async function fetchData() {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbx6-ULkGCEqLpoKTldfwpozSFdpxRUfTzxWgw5ZX1xlrPbS80ZeE6mCN77mNYe6iMcr/exec?action=getSummary"
        );
        const data = await res.json();
        setSummaryData(data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <section
      id="hero"
      className="bg-primary min-h-full flex items-center relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 ">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl animate__animated animate__fadeInDown">
            <span className="block">Create &amp; Discover</span>
            <span className="block">Amazing Events</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-white sm:text-lg md:mt-5 md:text-xl md:max-w-3xl animate__animated animate__fadeInUp">
            Join the community where event planning meets simplicity. Create,
            manage, and discover events that matter to you.
          </p>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center gap-x-6 animate__animated animate__fadeInUp animate__delay-1s">
            <Link href="/events/create">
              <Button className="rounded-md px-8 py-3 text-base font-semibold bg-white hover:bg-blue-50 text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all duration-300">
                Create Event
              </Button>
            </Link>
            <Link href="">
              <Button className="rounded-md bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-all duration-300">
                Browse Events
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-x-8 text-white animate__animated animate__fadeInUp animate__delay-2s">
            <div className="text-center">
              <div className="text-3xl font-bold">
                <NumberTicker
                  className="text-white"
                  value={summaryData.totalEvents}
                />
              </div>
              <div className="text-sm ">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                <NumberTicker
                  className="text-white"
                  value={summaryData.totalParticipants}
                />
              </div>
              <div className="text-sm ">Participants</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
