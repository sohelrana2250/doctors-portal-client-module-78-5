import React from "react";
import doctor from "../../../assets/images/doctor.png";
import appointment from "../../../assets/images/appointment.png";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const MakeAppointment = () => {
  return (
    <section
      className="mt-32"
      style={{
        background: `url(${appointment})`,
      }}
    >
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={doctor}
            alt=""
            className="-mt-32 hidden md:block lg:w-1/2 rounded-lg shadow-2xl"
          />
          <div>
            <h4 className="text-lg text-primary font-bold">Appointment</h4>
            <h1 className=" text-white text-4xl font-bold">
              Make an appointment Today
            </h1>
            <p className="text-white py-6">
              Care pulse is an end-to-end health solution that enables better
              health and wellbeing with advanced technology. Care pulse offers
              several services including healthcare and booking appointment for
              certified and verified doctors online/ onsite and specialist
              consultations, online prescription verification. our secure
              technology gives affordable access to healthcare for all.
            </p>
            <PrimaryButton>Appointment</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
