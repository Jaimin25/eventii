import EventCards from "@/components/Cards/EventCards";
import React from "react";

export default function BrowserEventsComponent() {
  return (
    <div className="py-4 w-full md:px-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCards display={null} />
    </div>
  );
}
