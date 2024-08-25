import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PrescriptionList = ({ isLoading, myprescription }) => {
  const downloadPrescription = (id) => {
    const input = document.getElementById(id);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("prescription.pdf");
    });
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
            alt=""
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
      </div>
    </>
  );
};

export default PrescriptionList;
