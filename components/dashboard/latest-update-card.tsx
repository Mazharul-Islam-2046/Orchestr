'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
}

export function LatestUpdateCard({ doctor }: { doctor: Doctor }) {
  const initials = doctor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center min-w-0">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt={doctor.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex flex-col gap-0.5">
          <p className="text-sm truncate">{doctor.name}</p>
          <p className="text-xs text-muted-foreground">A new patient has been added</p>
        </div>
      </div>

      <Badge variant="outline">
            2m ago
      </Badge>
    </div>
  );
}
