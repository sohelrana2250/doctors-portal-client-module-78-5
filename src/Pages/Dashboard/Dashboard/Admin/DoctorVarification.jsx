import React from "react";

const DoctorVarification = () => {
  return (
    <>
      <div className=" flex justify-center mt-10">
        <div
          className="hero min-h-screen"
          style={{
            backgroundImage:
              "url(https://www.idfy.com/wp-content/uploads/2021/11/Doctor-Verification-API-.png)",
            width: "50%",
            height: "30%",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-serif">
                Doctor Varification Process
              </h1>

              <a
                href="https://verify.bmdc.org.bd/"
                target="_blank"
                className="btn btn-error bg-blue-900 text-white btn-outline btn-sm"
              >
                Varify
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorVarification;
