'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { LatestUpdateCard } from "./latest-update-card";
import { Badge } from "../ui/badge";

interface Patient {
  id: string;
  patientName: string;
  reason: string;
  doctor: string;
  time: string;
  status: string;
  date: string;
}

export function LatestUpdates({ data }: { data: Patient[] }) {
  // Get unique doctors from the data
  const uniqueDoctors = Array.from(
    new Map(
      data
        .filter((patient) => patient.doctor)
        .map((patient) => [
          patient.doctor,
          { id: patient.doctor, name: patient.doctor },
        ])
    ).values()
  );

  return (
    <div className="card bg-card/50 rounded-xl border border-border p-6 flex flex-col gap-6">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold">Latest Updates</h2>
          <p className="text-sm text-muted-foreground">
            Recent activities and updates
          </p>
        </div>

        <div className="grow flex justify-end items-start">
          <Badge variant="secondary" className="mt-2">Live</Badge>
        </div>
      </div>
      <ScrollArea className="h-80">
        <div className="pr-4 space-y-4">
          {uniqueDoctors.map((doctor) => (
            <LatestUpdateCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
