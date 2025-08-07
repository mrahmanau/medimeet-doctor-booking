// src/app/page.tsx

import DoctorsList from "@/components/doctors/DoctorsList";

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 px-4 py-10">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-blue-900 mb-4">
          Welcome to MediMeet
        </h1>
        <p className="text-lg text-blue-800 max-w-2xl mx-auto">
          Book appointments with trusted doctors in just a few clicks. Your
          health, your schedule — made simple.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
          How It Works
        </h2>
        <ul className="space-y-4 text-blue-800 text-base list-disc list-inside">
          <li>Browse from a list of available doctors</li>
          <li>Select a doctor and choose a suitable time slot</li>
          <li>Book instantly — no account required!</li>
          <li>Receive email confirmation immediately</li>
        </ul>
      </section>

      {/* Featured Doctors */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
          Featured Doctors
        </h2>
        <DoctorsList />
      </section>
    </main>
  );
}
