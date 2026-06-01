'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { AvailableDoctorCard } from "./available-doctor-card";

interface Patient {
  id: string;
  patientName: string;
  reason: string;
  doctor: string;
  time: string;
  status: string;
  date: string;
}

export function AvailableDoctors({ data }: { data: Patient[] }) {
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
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">Available Doctors</h2>
        <p className="text-sm text-muted-foreground">
          Doctors available for appointments today
        </p>
      </div>
      <ScrollArea className="h-80 rounded-tl-xl rounded-tr-xl border border-border/50">
        <div className="p-4 space-y-2">
          {uniqueDoctors.map((doctor) => (
            <AvailableDoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
