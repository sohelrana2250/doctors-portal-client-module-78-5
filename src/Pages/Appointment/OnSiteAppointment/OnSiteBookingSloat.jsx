import React from "react";
import { Link } from "react-router-dom";
import PutAction from "../../../commonAction/PutAction";

const OnSiteBookingSloat = ({ booking, refetch }) => {
  const isBookingSloat = (id) => {
    if (id) {
      PutAction(
        `${process.env.REACT_APP_SERVER_API}/api/v1/isOnsiteBookingSloat/${id}`,
        { isBooked: true },
        refetch
      );
    }
  };
  return (
    <>
      <div className="border rounded p-4 mb-2 shadow-sm bg-white">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-lg">{booking.treatment}</span>
          <span className="text-gray-500">{booking.appointmentDate}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">{booking.slot}</span>
          <span className="font-semibold text-lg text-right">
            ${booking.price}
          </span>
        </div>
        <div className="text-right">
          <span
            className={`badge ${
              booking.status === "INPROGRESS"
                ? "badge-primary"
                : "badge-secondary"
            }`}
          >
            {booking.status}is Booking Sloat
          </span>
        </div>
        <div>
          <button
            disabled={booking.isBooked}
            onClick={() => isBookingSloat(booking._id)}
            className="btn btn-outline btn-sm btn-info m-1"
          >
            Booking
          </button>
          <Link
            to={`/doctor/details/${booking.doctorId}`}
            className="btn btn-outline btn-sm btn-info m-1"
          >
            Doctor Details
          </Link>
        </div>
      </div>
    </>
  );
};

export default OnSiteBookingSloat;
