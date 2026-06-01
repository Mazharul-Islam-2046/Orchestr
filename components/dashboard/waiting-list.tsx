'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { WaitingListCard } from "./waiting-list-card";

interface Patient {
  id: string;
  patientName: string;
  reason: string;
  doctor: string;
  time: string;
  status: string;
}

export function WaitingList({ data }: { data: Patient[] }) {
  const inProcessPatients = data.filter(
    (patient) => patient.status === "In Process"
  );

  return (
    <div className="card bg-card/50 col-span-2 rounded-xl border border-border p-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Waiting List</h2>
        <p className="text-sm text-muted-foreground">
          View the current waiting list and manage appointments
        </p>
      </div>
      <ScrollArea className="h-80 rounded-tl-xl rounded-tr-xl border border-border/50">
        <div className="p-4 space-y-2">
          {inProcessPatients.map((patient) => (
            <WaitingListCard key={patient.id} patient={patient} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
