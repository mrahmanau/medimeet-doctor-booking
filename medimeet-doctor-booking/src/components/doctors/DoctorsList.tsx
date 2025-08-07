// src/components/doctors/DoctorsList.tsx

"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const doctors = [
  "Dr. D Jenny Hill",
  "Dr. Imran Khan",
  "Dr. Nusrat Jahan",
  "Dr. Michael Hughson",
  "Dr. Jessica Inglis",
  "Dr. Jackson Lori K",
];

export default function DoctorsList() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {doctors.map((doctor, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
        >
          <Image
            src={`https://randomuser.me/api/portraits/med/${
              idx % 2 === 0 ? "women" : "men"
            }/${idx + 10}.jpg`}
            alt={doctor}
            width={100}
            height={100}
            className="rounded-full mb-4"
          />
          <h3 className="text-xl font-semibold text-blue-900">{doctor}</h3>
          <p className="text-blue-700 text-sm mb-4">General Practitioner</p>
          <button
            onClick={() => router.push(`/appointment/${idx}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  );
}
