import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus } from "@tabler/icons-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"

export function CreateAppointmentButton({ state }: { state: string }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size={state === "collapsed" ? "icon" : "default"}
                    className={state === "collapsed" ? "mx-auto" : "w-full gap-2"}
                >
                    <IconPlus />
                    {state !== "collapsed" ? (
                        <span>Create Appointment</span>
                    ) : (
                        <span className="sr-only">Create Appointment</span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Appointment</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new appointment.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="-mx-4 no-scrollbar max-h-[50vh] my-4 overflow-y-auto px-4">
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="patientName">Patient Name</Label>
                            <Input id="patientName" placeholder="John Doe" />
                        </Field>
                        <Field>
                            <Label htmlFor="doctor">Doctor</Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a doctor" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {
                                            ["Dr. Smith", "Dr. Johnson", "Dr. Lee"].map((doctor) => (
                                                <SelectItem key={doctor} value={doctor}>
                                                    {doctor}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label htmlFor="reason">Reason for Visit</Label>
                            <Textarea id="reason" placeholder="General Checkup" className="resize-none min-h-32" />
                        </Field>
                    </FieldGroup>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <Button type="submit" onClick={() => console.log("Create Appointment")}>
                        Create Appointment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
