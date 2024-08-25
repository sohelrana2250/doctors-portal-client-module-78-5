import React from "react";

const AppointmentOption = ({ appointmentOption, setTreatment }) => {
  const { name, price, slots } = appointmentOption || {};
  return (
    <div className="card shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-2xl text-secondary font-bold text-center">
          {name}
        </h2>
        <p>{slots.length > 0 ? slots[0] : "Try Another day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <p>
          <small>Price: ${price}</small>
        </p>
        <div className="card-actions justify-between">
          <label
            disabled={slots.length === 0}
            htmlFor="booking-modal"
            className="btn btn-primary btn-sm text-white"
            onClick={() =>
              setTreatment({ appointmentOption, condition: "online" })
            }
          >
            Online Booking
          </label>

          <label
            disabled={slots.length === 0}
            htmlFor="booking-modal"
            className="btn btn-primary btn-sm text-white"
            onClick={() =>
              setTreatment({ appointmentOption, condition: "onsite" })
            }
          >
            OnSite Booking
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
