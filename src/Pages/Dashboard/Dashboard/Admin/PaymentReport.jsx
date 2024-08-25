import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/Loading";
import DisplayError from "../../../Shared/DisplayError/DisplayError";
const PaymentReport = () => {
  const [search, setSearchTerm] = useState("");
  const {
    data: payment_report = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["payment_report"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER_API}/api/v1/payment_transaction_report`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <DisplayError />;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-serif text-center mb-4">
          All Payment Report
        </h1>
        <div className="flex items-center justify-center mb-8 m-3">
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pl-6 text-sm text-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-slate-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by  patient email, doctor email, transaction Id"
            required
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Price</th>
                <th>Transaction ID</th>
                <th>Email</th>
                <th>Patient Email</th>
                <th>Slot</th>
                <th>Treatment</th>
                <th>Doctor ID</th>
                <th>Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                payment_report?.data
                  ?.filter((payment) => {
                    return search.toLowerCase() === ""
                      ? payment
                      : payment.patientEmail.includes(search) ||
                          payment.email.includes(search) ||
                          payment.transactionId.includes(search);
                  })
                  .map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
                        {payment._id}
                      </td>
                      <td className="px-2 py-1 font-semibold leading-tight text-white bg-green-500 rounded-sm">
                        {payment.price}
                      </td>
                      <td className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-yellow-100 rounded-sm">
                        {payment.transactionId}
                      </td>
                      <td>{payment.email}</td>
                      <td>{payment.patientEmail}</td>
                      <td>{payment.slot}</td>
                      <td>{payment.treatment}</td>
                      <td className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
                        {payment.doctorId}
                      </td>
                      <td>
                        {payment?.condition ===
                        process.env.REACT_APP_CONDITION ? (
                          <p className="px-2 py-2 text-center font-semibold leading-tight text-blue-500-700 bg-green-500 rounded-md">
                            OnSite
                          </p>
                        ) : (
                          <p className="px-2 py-2 text-center font-semibold leading-tight text-blue-500-700 bg-yellow-600  rounded-md">
                            Online
                          </p>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentReport;
