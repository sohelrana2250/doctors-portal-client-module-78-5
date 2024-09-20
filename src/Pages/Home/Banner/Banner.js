import React from "react";
import chair from "../../../assets/images/bannerImage.jpeg";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";

const Banner = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt="" />
        <div>
          <h1 className="text-5xl font-bold">Care Pulse Office News!</h1>
          <p className="py-6">
            You don not have to wait in line for hours or go to the hospital to
            take healthcare services. Easily consult a doctor in just 10 minutes
            on your device at home or office.
          </p>
          <PrimaryButton>Getting Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Banner;
