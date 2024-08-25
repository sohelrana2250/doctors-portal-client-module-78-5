import React from "react";
import OnSiteBookingSloat from "./OnSiteBookingSloat";

const OnsiteDoctorCard = ({ doctor, refetch }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl mb-8">
      <div className="avatar">
        <div className="w-full">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full object-cover h-64"
          />
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title text-2xl">{doctor.name}</h2>
        <div className="border-x-lime-800">
          <p className="text-gray-600">{doctor.specialty}</p>
          <p>Experience: {doctor.experience} years</p>
          <p>Appointment Fee: ${doctor.appointmentfee}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Bookings Sloat</h3>

          <div>
            {doctor?.onsitebookings?.map((booking, index) => (
              <OnSiteBookingSloat
                key={index}
                booking={booking}
                refetch={refetch}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnsiteDoctorCard;
