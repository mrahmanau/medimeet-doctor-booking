// src/app/appointment/page.tsx

import DoctorsList from "@/components/doctors/DoctorsList";

export default function AppointmentPage() {
  return (
    <main className="min-h-screen bg-blue-50 px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
        Book an Appointment
      </h1>
      <DoctorsList />
    </main>
  );
}
