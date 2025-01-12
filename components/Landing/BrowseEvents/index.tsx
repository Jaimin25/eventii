import EventCards from "@/components/Cards/EventCards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function BrowserEventsComponent() {
  return (
    <section id="browseEvents" className="py-16">
      <div className="flex flex-col w-full mx-auto px-4 items-center justify-center">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Browse Events
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing events happening around you
          </p>
        </div>

        <div className="w-full md:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventCards display={6} />
        </div>
        <Link href={"/events/browse"}>
          <Button className="mt-8">Load More Events</Button>
        </Link>
      </div>
    </section>
  );
}
