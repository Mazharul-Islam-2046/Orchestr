'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClockIcon, LucideDelete } from "lucide-react";

interface Patient {
  id: string;
  patientName: string;
  reason: string;
  doctor: string;
  time: string;
  status: string;
}

export function WaitingListCard({ patient }: { patient: Patient }) {
  const initials = patient.patientName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-3 gap-4 items-center p-4 rounded-lg bg-muted">
      <div className="flex gap-4 items-center min-w-0">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={patient.patientName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-medium truncate">{patient.patientName}</p>
          <p className="text-xs text-muted-foreground truncate">
            {patient.reason.split(" ").slice(0, 2).join(" ")}
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <Badge variant="outline" className="gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="24"
            height="24"
            fill="#000000"
            style={{ opacity: 1 }}
          >
            <path d="M42.924 13H38V7.774C38 4.038 35.052 1 31.306 1H18.695C14.947 1 12 4.038 12 7.774V13H7.075C3.719 13 1 15.591 1 18.937v23.007C1 45.289 3.719 48 7.075 48h35.849C46.279 48 49 45.289 49 41.943V18.937C49 15.591 46.279 13 42.924 13M16 7.774C16 6.375 17.292 5 18.695 5h12.611C32.705 5 34 6.375 34 7.774V13H16zM36 35h-7v7h-8v-7h-7v-8h7v-7h8v7h7z" />
          </svg>
          {patient.doctor}
        </Badge>
        <Badge variant="outline" className="gap-1">
          <ClockIcon className="size-4" />
          {patient.time}
        </Badge>
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" size="sm">
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-500 border-red-500 hover:bg-red-50"
        >
          {/* Cancel */}
          <LucideDelete className="size-4" />
        </Button>
      </div>
    </div>
  );
}
