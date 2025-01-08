"use client";

import { EventType, useEventContext } from "@/app/_providers/events-provider";
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
import { CalendarClock, MapPin, UserRound } from "lucide-react";
import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function EventCards({ display }: { display: number | null }) {
  const { events, setEvents } = useEventContext();
  const [dialogOpen, setOpenDialog] = React.useState(false);
  const [event, setEvent] = React.useState<EventType | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [participantEmail, setParticipantEmail] = React.useState("");

  const submitJoinEvent = async () => {
    if (participantEmail === "" || !participantEmail.includes("@")) {
      return toast.error("Please provide a valid email address.");
    }
    setLoading(true);
    try {
      const res = await fetch("/api/events/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: event?.Event_ID,
          participantEmail,
        }),
      });

      const response = await res.json();

      if (response.message.success) {
        toast.success("You have successfully joined the event.");
        setOpenDialog(false);
        setLoading(false);
        setEvents((prevEvents) => {
          if (typeof prevEvents === "string") {
            return prevEvents;
          }
          return prevEvents.map((e) => {
            if (e.Event_ID === event?.Event_ID) {
              return {
                ...e,
                participantCount: e.participantCount + 1,
              };
            }
            return e;
          });
        });
      } else {
        toast.error(response.message.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(
        "An error occurred while joining the event." + (error as Error).message
      );
    }
  };

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
          <Skeleton className="text-blue-500 bg-blue-100 rounded-lg text-sm font-semibold w-24 h-5" />
          <Skeleton className="text-blue-500 bg-blue-100 rounded-lg text-sm font-semibold w-32 h-5" />
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
        (display ? events.slice(0, display) : events).map((event, index) => {
          const formattedDate = format(new Date(event.Date), "MMM dd, yyyy");
          const formattedTime = format(new Date(event.Start_Time), "hh:mm a");

          return (
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
                    <h3 className="text-xl font-bold mt-1">
                      {event.Event_Name}
                    </h3>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{event.Description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex text-gray-500  gap-1 items-center justify-center">
                  <MapPin className="stroke-primary" size={20} />
                  <span>{event.Place}</span>
                </div>
                <div className="text-gray-500 text-sm flex gap-1 items-center justify-center">
                  <CalendarClock size={20} className="stroke-primary" />
                  <i className="fas fa-calendar"></i>
                  {formattedDate} {formattedTime}
                </div>
                <Button
                  variant={"outline"}
                  className="text-primary"
                  onClick={() => {
                    setParticipantEmail("");
                    setOpenDialog(true);
                    setEvent(event);
                  }}
                >
                  Join Event
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      <Dialog open={dialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join {event?.Event_Name}?</DialogTitle>
            <DialogDescription>
              Please provide a valid email address to join the event.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                type="email"
                id="link"
                placeholder="Enter you email address"
                onChange={(e) => setParticipantEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button
              type="submit"
              onClick={() => submitJoinEvent()}
              disabled={loading}
            >
              Join Event
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
