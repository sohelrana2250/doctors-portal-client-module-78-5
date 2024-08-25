import React, { useContext } from "react";
import PutAction from "../commonAction/PutAction";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { FaCcPaypal } from "react-icons/fa";
const BookingReport = ({ mybooking, refetch, isLoading }) => {
  const { user } = useContext(AuthContext);
  const handelDelete = (id, condition) => {
    console.log(id);

    if (condition === process.env.REACT_APP_CONDITION) {
      if (id) {
        PutAction(
          `${process.env.REACT_APP_SERVER_API}/api/v1/isBookingSloat/${id}`,
          { isBooked: false, condition },
          refetch
        );
      }
    } else {
      if (id) {
        PutAction(
          `${process.env.REACT_APP_SERVER_API}/api/v1/isBookingSloat/${id}`,
          { isBooked: false },
          refetch
        );
      }
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Appointment Date</th>
              <th>Treatment</th>
              <th>Patient</th>
              <th>Slot</th>
              <th>Phone</th>
              <th>Price</th>
              <th>Patient Name </th>
              <th>Booked</th>
              <th>Status</th>
              <th>Transaction Id</th>
              <th>Progress</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              mybooking?.data?.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.treatment}</td>
                  <td>{appointment.patient}</td>
                  <td>{appointment.slot}</td>
                  <td>{appointment.phone}</td>
                  <td className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                    {appointment.price} tk
                  </td>
                  <td>{appointment?.patient}</td>
                  <td>
                    {appointment.isBooked ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        isBooked
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        Not Booked
                      </span>
                    )}
                  </td>

                  <td>
                    {user.photoURL === "doctor" ? (
                      <p className="text-red-500 btn btn-sm">
                        Only Patient Aceess
                      </p>
                    ) : (
                      <>
                        {appointment.price && !appointment.paid && (
                          <Link to={`/dashboard/payment/${appointment._id}`}>
                            <button className="btn btn-primary btn-sm">
                              Pay
                            </button>
                          </Link>
                        )}
                        {appointment.price && appointment.paid && (
                          <button className="text-green-500 btn btn-sm">
                            Paid
                          </button>
                        )}
                      </>
                    )}
                  </td>
                  <td>
                    {appointment.transactionId ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {appointment.transactionId}
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        Booking Not Confirm
                      </span>
                    )}
                  </td>
                  <td>
                    {appointment.status === "INPROGRESS" ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                        {appointment.status}
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {appointment.status}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      disabled={appointment?.paid}
                      onClick={() =>
                        handelDelete(appointment?._id, appointment.condition)
                      }
                      className="btn btn-outline btn-error btn-sm"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingReport;
