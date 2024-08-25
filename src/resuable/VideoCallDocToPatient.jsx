import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const VideoCallDocToPatient = ({ isLoading, videocall }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-serif text-center mb-4">Appointments</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {!isLoading &&
              videocall?.data?.map((appointment) => (
                <div
                  key={appointment._id}
                  className="max-w-md p-4 bg-white rounded-lg shadow-md"
                >
                  <div className="mb-2">
                    <h2 className="text-xl font-serif">
                      {appointment.treatment}
                    </h2>
                    <p className="text-gray-600">
                      {appointment.appointmentDate}
                    </p>
                    <p className="text-gray-600">{appointment.slot}</p>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-700">
                      <span className="font-bold">Patient:</span>{" "}
                      {appointment.patient}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">Email:</span>{" "}
                      {appointment.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">Phone:</span>{" "}
                      {appointment.phone}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-700">
                      <span className="font-bold">Price:</span> $
                      {appointment.price}
                    </p>
                    <p
                      className={`${
                        appointment.paid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      <span className="font-bold">Status:</span>
                      {appointment.paid ? "Paid" : "Unpaid"}
                    </p>
                    <p
                      className={`${
                        appointment.paid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      <span className="font-bold">Booking Status:</span>
                      {appointment.isBooked ? "Booked" : "Not Booked"}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p
                      className={`${
                        appointment.paid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      <span className="font-bold">Appointment Status:</span>{" "}
                      {appointment.status}
                    </p>
                  </div>
                  <div className="mb-2">
                    <Link
                      disabled={!appointment.paid || appointment.prescription}
                      className="btn btn-outline bg-green-400 text-white btn-sm w-full mt-1"
                      to={`/dashboard/my_video_call/${appointment.videoCallingId}`}
                    >
                      Start Video Call
                    </Link>
                  </div>

                  {user?.photoURL === "user" ? (
                    <button
                      disabled={appointment.prescription ? true : false}
                      className="btn btn-outline bg-blue-900 text-white btn-sm w-full mt-1"
                    >
                      Prescription
                    </button>
                  ) : (
                    <Link
                      to={`/dashboard/doctor_presscription/${appointment._id}`}
                      disabled={appointment.prescription ? true : false}
                      className="btn btn-outline bg-blue-900 text-white btn-sm w-full mt-1"
                    >
                      Prescription
                    </Link>
                  )}
                  {user?.photoURL === "user" && !!appointment.prescription ? (
                    <>
                      <Link
                        to={`/dashboard/review/${appointment?.doctorId}/${appointment?._id}`}
                        className="btn btn-outline bg-blue-900 text-white btn-sm w-full mt-1"
                      >
                        Review
                      </Link>
                    </>
                  ) : (
                    <button
                      disabled={!!appointment.prescription}
                      className="btn btn-outline bg-blue-900 text-white btn-sm w-full mt-1"
                    >
                      Not Possible Review
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCallDocToPatient;
