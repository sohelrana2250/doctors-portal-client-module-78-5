import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";

const PrescriptionList = ({ isLoading, myprescription }) => {
  const [prescriptionrReport, setPrescriptionrReport] = useState("");

  // Function to download the prescription as a PDF
  const downloadPrescription = (id) => {
    const input = document.getElementById(id);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("prescription.pdf");
    });
  };

  // Fetch prescription analysis report
  const handelPrescriptionAnalysis = async (id) => {
    fetch(
      `${process.env.REACT_APP_SERVER_API}/api/v1/doctor_prescription_analysis/${id}`,
      {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPrescriptionrReport(data.message);
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  // Function to close modal
  const closeModal = () => {
    setPrescriptionrReport("");
  };

  return (
    <>
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-3xl font-serif mb-4 text-center bg-blue-900 text-white rounded p-2">
          My Prescriptions List
        </h1>

        {myprescription?.data?.length === 0 && (
          <img
            className="w-full h-full"
            src="https://static.vecteezy.com/system/resources/thumbnails/023/103/916/small_2x/not-available-rubber-stamp-seal-vector.jpg"
            alt="No Data"
          />
        )}

        {!isLoading &&
          myprescription?.data?.map((prescription) => (
            <div
              key={prescription._id}
              id={`prescription-${prescription._id}`}
              className="card w-full md:w-1/2 bg-base-100 shadow-xl mb-4"
            >
              <div className="card-body">
                <h2 className="card-title">{prescription.name}</h2>
                <p>
                  <strong>Date:</strong> {prescription.date}
                </p>
                <p>
                  <strong>Age:</strong> {prescription.age}
                </p>
                <p>
                  <strong>Sex:</strong> {prescription.sex}
                </p>
                <p>
                  <strong>Doctor Email:</strong> {prescription.email}
                </p>
                <p>
                  <strong>Address:</strong> {prescription.address}
                </p>
                <p>
                  <strong>Email:</strong> {prescription.patientemail}
                </p>
                <p>
                  <strong>Prescription:</strong>
                </p>
                <pre className="whitespace-pre-wrap">
                  {prescription.prescription}
                </pre>
              </div>
              <div className="flex justify-center m-1">
                <button
                  onClick={() => handelPrescriptionAnalysis(prescription._id)}
                  className="btn btn-outline btn-accent btn-sm mr-1"
                >
                  Prescription Analysis
                </button>
                <button
                  onClick={() =>
                    downloadPrescription(`prescription-${prescription._id}`)
                  }
                  className="btn btn-outline btn-sm btn-primary"
                >
                  Download Prescription
                </button>
              </div>
            </div>
          ))}

        {/* Modal to show prescription report */}
        {prescriptionrReport && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-full md:w-1/3">
              <h2 className="text-xl font-bold mb-4">
                Prescription Analysis Report
              </h2>
              <p className="mb-4">{prescriptionrReport}</p>
              <div className="flex justify-end">
                <button onClick={closeModal} className="btn btn-sm btn-error">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PrescriptionList;
