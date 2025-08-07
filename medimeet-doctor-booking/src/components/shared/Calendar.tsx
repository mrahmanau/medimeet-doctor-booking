"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Available Slot",
    start: new Date(),
    end: new Date(new Date().getTime() + 30 * 60 * 1000),
  },
];

export default function BookingCalendar() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}
