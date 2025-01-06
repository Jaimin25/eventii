import CreateJoinForm from "@/components/Forms/CreateEvent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function CreateEventPage() {
  return (
    <div className="w-full m-4 p-4 sm:w-3/5 lg:w-2/5 content-center place-self-center md:m-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateJoinForm />
        </CardContent>
      </Card>
    </div>
  );
}
