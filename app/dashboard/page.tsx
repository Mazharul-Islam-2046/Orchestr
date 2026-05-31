import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import data from "./data.json";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-4">
                <div className="card bg-card/50 col-span-3 rounded-xl border border-border p-6 flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold">Waiting List</h2>
                    <p className="text-sm text-muted-foreground">
                      View the current waiting list and manage appointments
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 md:p-6 rounded-tl-xl rounded-tr-xl">
                    {/* waiting list cards */}
                    
                  </div>
                </div>
              </div>
              {/* <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div> */}
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
