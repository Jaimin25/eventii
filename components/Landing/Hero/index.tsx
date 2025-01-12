"use client";

import { useEventContext } from "@/app/_providers/events-provider";
import { Button } from "@/components/ui/button";
import NumberTicker from "@/components/ui/number-ticker";
import Link from "next/link";
import React from "react";

export default function HeroComponent() {
  const { eventSummary } = useEventContext();

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
              <Button className="rounded-md  bg-gradient-to-r from-blue-700 to-green-600 text-white px-8 py-3 text-base font-semibold hover:bg-blue-50  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 transition-all duration-300">
                Create Event
              </Button>
            </Link>
            <Link href="/events/browse">
              <Button className="rounded-md bg-white px-8 py-3 text-base font-semibold text-primary shadow-sm hover:bg-blue-100 transition-all duration-300">
                Browse Events
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex justify-center gap-x-8 text-white animate__animated animate__fadeInUp animate__delay-2s">
            <div className="text-center">
              <div className="text-3xl font-bold">
                <NumberTicker
                  className="text-white"
                  value={eventSummary ? eventSummary.totalEvents : 1}
                />
              </div>
              <div className="text-sm ">Active Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                <NumberTicker
                  className="text-white"
                  value={
                    eventSummary
                      ? eventSummary.totalParticipants > 0
                        ? eventSummary.totalParticipants
                        : 0
                      : 1
                  }
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
