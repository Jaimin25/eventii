"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import { EventType, useEventContext } from "@/app/_providers/events-provider";
import { useRouter } from "next/navigation";

const createEventFormSchema = z.object({
  eventName: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  eventType: z.string().min(2).max(50),
  startTime: z.date({
    required_error: "A start time is required.",
  }),
  date: z.date({
    required_error: "A date  is required.",
  }),
  hostEmail: z.string().email(),
  houseNumber: z.string().min(2).max(50),
  streetName: z.string().min(2).max(50),
  landmark: z.string().min(2).max(50),
  locality: z.string().min(2).max(50),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  postalCode: z.string().min(2).max(50),
});

export default function CreateJoinForm() {
  const { setEvents, setEventSummary } = useEventContext();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };
  // 1. Define your form.
  const createEventForm = useForm<z.infer<typeof createEventFormSchema>>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      eventName: "",
      description: "",
      eventType: "",
      startTime: undefined,
      date: undefined,
      hostEmail: "",
      houseNumber: "",
      streetName: "",
      landmark: "",
      locality: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createEventFormSchema>) {
    const id = toast.loading("Creating event...");
    setIsPending(true);
    const formattedStartTime = format(new Date(values.startTime), "hh:mm a");

    const updatedValues = {
      ...values,
      date: format(new Date(values.date), "yyyy-MM-dd"),
      startTime: formattedStartTime,
    };

    try {
      const res = await fetch("/api/events/create", {
        method: "POST",
        body: JSON.stringify(updatedValues),
      });
      const data = await res.json();
      if (data.status === 200) {
        toast.success("Event created successfully", {
          id,
        });
        handleClick();
        setIsPending(false);
        setEvents((prev) => {
          if (typeof prev === "string") return prev;
          return [
            ...prev,
            {
              Event_ID: data.message.eventId,
              Event_Name: updatedValues.eventName,
              Date: updatedValues.date,
              participantCount: 0,
              Description: updatedValues.description,
              House_Number: updatedValues.houseNumber,
              Street_Name: updatedValues.streetName,
              Landmark: updatedValues.landmark,
              Locality: updatedValues.locality,
              City: updatedValues.city,
              State: updatedValues.state,
              Postal_Code: updatedValues.postalCode,
              Start_Time: new Date(values.startTime).toISOString(),
              Event_Type: updatedValues.eventType,
            },
          ].sort((a: EventType, b: EventType) => {
            // Compare Dates
            const dateA = new Date(a.Date).getTime();
            const dateB = new Date(b.Date).getTime();

            if (dateA !== dateB) {
              return dateA - dateB; // Sort by Date if they are different
            }

            // If Dates are the same, compare Start_Time
            const timeA = new Date(`${a.Start_Time}`).getTime();
            const timeB = new Date(`${b.Start_Time}`).getTime();

            return timeA - timeB; // Sort by Start_Time if Dates are the same
          });
        });
        setEventSummary((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            totalEvents: prev.totalEvents + 1,
          };
        });
        router.push("/events/browse");
      } else {
        toast.error("Failed to create event", {
          id,
        });
        setIsPending(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleTimeChange(type: "hour" | "minute" | "ampm", value: string) {
    const currentDate = createEventForm.getValues("startTime") || new Date();
    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(newDate.getHours() >= 12 ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }
    createEventForm.setValue("startTime", newDate);
  }

  return (
    <Form {...createEventForm}>
      <form
        onSubmit={createEventForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={createEventForm.control}
          name="eventName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event name</FormLabel>
              <FormControl>
                <Input placeholder="Enter event name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a short description for the event"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <FormControl>
                <Input placeholder="Enter event type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select time (12h)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "hh:mm aa")
                      ) : (
                        <span>hh:mm aa</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="sm:flex">
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i + 1)
                            .reverse()
                            .map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  field.value &&
                                  field.value.getHours() % 12 === hour % 12
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleTimeChange("hour", hour.toString())
                                }
                              >
                                {hour}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (minute) => (
                              <Button
                                key={minute}
                                size="icon"
                                variant={
                                  field.value &&
                                  field.value.getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() =>
                                  handleTimeChange("minute", minute.toString())
                                }
                              >
                                {minute.toString().padStart(2, "0")}
                              </Button>
                            )
                          )}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                      <ScrollArea className="">
                        <div className="flex sm:flex-col p-2">
                          {["AM", "PM"].map((ampm) => (
                            <Button
                              key={ampm}
                              size="icon"
                              variant={
                                field.value &&
                                ((ampm === "AM" &&
                                  field.value.getHours() < 12) ||
                                  (ampm === "PM" &&
                                    field.value.getHours() >= 12))
                                  ? "default"
                                  : "ghost"
                              }
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange("ampm", ampm)}
                            >
                              {ampm}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="houseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>House Number/Area</FormLabel>
              <FormControl>
                <Input placeholder="Enter house number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="streetName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter street name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input placeholder="Enter landmark" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="locality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locality</FormLabel>
              <FormControl>
                <Input placeholder="Enter locality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="Enter state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createEventForm.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter postal code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createEventForm.control}
          name="hostEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
