import React, { useState } from "react";
import { PiHandPointingLight } from "react-icons/pi";
import UpdateAppointmentModal from "./UpdateAppointmentModal";
const CardComponent = ({ data, onDelete }) => {
  const [appointmentId, setAppointmentId] = useState({});
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2">
      {data.map((item) => (
        <div key={item._id} className="w-full  mb-4">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>Price: ${item.price}</p>
              <div>
                <h3 className="font-semibold mb-2 underline text-center">
                  Available Slots
                </h3>
                <div className="grid grid-cols-2">
                  {item.slots.map((slot, index) => (
                    <p key={index} className="flex m-1 bg-cyan-400 rounded">
                      <PiHandPointingLight className="text-xl bg-green-500 rounded" />{" "}
                      {slot}
                    </p>
                  ))}
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <label
                  htmlFor="UpdateAppointment"
                  className="btn btn-primary btn-sm text-white"
                  onClick={() => setAppointmentId(item)}
                >
                  Edit
                </label>
                <UpdateAppointmentModal appointmentId={appointmentId} />
                <button
                  className="btn btn-error btn-sm ml-2"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
