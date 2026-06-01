'use client';

import { SectionCards } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import { WaitingList } from "./waiting-list";

interface Patient {
  id: string;
  patientName: string;
  reason: string;
  doctor: string;
  time: string;
  status: string;
  date: string;
}

interface DashboardContentProps {
  data: Patient[];
}

export function DashboardContent({ data }: DashboardContentProps) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-4">
            <WaitingList data={data} />
            <div></div>
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
