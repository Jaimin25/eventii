"use client";

import { useEventContext } from "@/app/_providers/events-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { UserRound } from "lucide-react";
import React from "react";

export default function EventCards({ display }: { display: number }) {
  const { events } = useEventContext();

  if (typeof events === "string" && events === "loading") {
    return Array.from({ length: 6 }, (_, i) => (
      <Card key={i} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardDescription className="justify-between flex items-center">
            <Skeleton className="text-blue-500 bg-blue-100 text-sm font-semibold w-40 rounded-lg h-6" />
            <span className="bg-blue-100 flex items-center gap-1 justify-center text-blue-600 w-1/5 px-3 py-1 rounded-full text-sm">
              <Skeleton className="text-blue-500 bg-blue-100 text-sm font-semibold w-full h-5" />
            </span>
          </CardDescription>
          <CardTitle>
            <div className="flex justify-between items-start mb-4">
              <Skeleton className="text-blue-500 rounded-lg text-sm font-semibold w-2/3 h-8" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="text-blue-500 rounded-lg text-sm font-semibold w-3/4 h-5" />
          <Skeleton className="text-blue-500 rounded-lg text-sm font-semibold w-2/3 h-5" />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Skeleton className="text-blue-500 rounded-lg text-sm font-semibold w-32 h-5" />
          <Button variant="outline" className="text-primary" disabled>
            Join Event
          </Button>
        </CardFooter>
      </Card>
    ));
  }
  return (
    <>
      {Array.isArray(events) &&
        events.slice(0, display).map((event, index) => (
          <Card className="hover:shadow-md transition-shadow" key={index}>
            <CardHeader>
              <CardDescription className="justify-between flex">
                <span className="text-blue-500 text-sm font-semibold">
                  {event.Event_Type}
                </span>

                <span className="bg-blue-100 flex items-center gap-1 justify-center text-blue-600 px-3 py-1 rounded-full text-sm">
                  <UserRound size={20} />
                  <span>{event.participantCount}</span>
                </span>
              </CardDescription>
              <CardTitle>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold mt-1">{event.Event_Name}</h3>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{event.Description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-gray-500 text-sm">
                <i className="fas fa-calendar"></i>{" "}
                {format(new Date(event.Date), "MMM dd, yyyy")}
              </div>
              <Button variant={"outline"} className="text-primary">
                Join Event
              </Button>
            </CardFooter>
          </Card>
        ))}
    </>
  );
}
