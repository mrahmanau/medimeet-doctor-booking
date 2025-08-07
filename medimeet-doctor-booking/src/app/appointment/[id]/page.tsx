// src/app/appointment/[id]/page.tsx

import BookingCalendar from "@/components/shared/Calendar";
import { notFound } from "next/navigation";

const doctors = [
  "Dr. D Jenny Hill",
  "Dr. Imran Khan",
  "Dr. Nusrat Jahan",
  "Dr. Michael Hughson",
  "Dr. Jessica Inglis",
  "Dr. Jackson Lori K",
];

export default async function BookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doctor = doctors[parseInt(id)];

  if (!doctor) return notFound();

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Book Appointment with {doctor}
      </h1>
      <div className="max-w-xl mx-auto">
        <BookingCalendar />
      </div>
    </main>
  );
}
