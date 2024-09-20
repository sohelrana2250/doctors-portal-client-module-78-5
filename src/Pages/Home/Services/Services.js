import React from "react";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import Service from "./Service";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      name: "General Physician",
      description:
        "Cold, flu, fever, vomiting, infections, headaches or any other general health issues.",
      img: "https://media.istockphoto.com/id/1144636192/vector/medical-consultant-icon-flat-style-vector-eps.jpg?s=612x612&w=0&k=20&c=pj7IaVaJSaUDRaV1k7HAM_k_RdvLF675-p-WQdWWkS0=",
    },
    {
      id: 2,
      name: "Pediatrics",
      description:
        "Any childrens health related issues including physical, behavior and mental health.",
      img: "https://static.vecteezy.com/system/resources/previews/034/780/979/non_2x/pediatrics-icon-on-white-background-free-vector.jpg",
    },
    {
      id: 3,
      name: "Gynae & Obs",
      description:
        "Any womens health related issues including pregnancy, menstruation, fertility  issues, hormone disorders etc.",
      img: "https://www.creativefabrica.com/wp-content/uploads/2021/06/16/Obstetrics-Icon-Graphics-13471232-1-1-580x385.jpg",
    },
    {
      id: 4,
      name: "Internal Medicine",
      description:
        "Prevention, diagnosis and treatment of adults across the spectrum from health to complex illness.",
      img: "https://static.vecteezy.com/system/resources/thumbnails/000/637/367/small_2x/vector60-7993-01.jpg",
    },
    {
      id: 5,
      name: "Urology",
      description:
        "Diagnosis and treatment of disease of the male and female urinary- tract system.",
      img: "https://static.vecteezy.com/system/resources/previews/010/749/450/non_2x/urology-icon-design-free-vector.jpg",
    },
    {
      id: 6,
      name: "Orthopedics",
      description: "Bones, muscles, joints, tendons, ligaments.",
      img: "https://static.thenounproject.com/png/2575071-200.png",
    },
    {
      id: 7,
      name: "Neurology",
      description:
        "Diagnosis, treatment for disease involving the central and peripheral nervous systems.",
      img: "https://static.vecteezy.com/system/resources/previews/006/408/298/non_2x/brain-icon-isolated-on-white-background-brain-icon-similar-design-illustration-brain-icon-symbol-for-logo-web-app-and-template-vector.jpg",
    },
    {
      id: 8,
      name: "Gastroenterology",
      description:
        "Diseases affecting the gastrointestinal tract, which include the organs from the mouth to the anus, along the alimentary canal.",
      img: "https://static.thenounproject.com/png/4303617-200.png",
    },
    {
      id: 9,
      name: "Cardiology",
      description:
        "Diagnosis, treatment of congenital heart defects, coronary artery disease heart failure, and valvular heart disease.",
      img: "https://img.freepik.com/premium-vector/cardiology-icon-white-background_404166-1376.jpg?w=740",
    },
    {
      id: 10,
      name: "Psychology",
      description:
        "Identify and diagnose mental behavioral and emotional disorders.",
      img: "https://static.thenounproject.com/png/3216368-200.png",
    },
    {
      id: 11,
      name: "General Surgery",
      description:
        "Focuses on abdominal contents including the esophagus, stomach, small intestine, large intestine, liver, pancreas, gallbladder, and spleen.",
      img: "https://cdn-icons-png.flaticon.com/512/1165/1165542.png",
    },
    {
      id: 12,
      name: "Dentistry",
      description:
        "Diagnosis, management, and treatment of defects and injuries related to the teeth and gums.",
      img: "https://static.vecteezy.com/system/resources/previews/021/625/301/original/medical-teeth-treatment-line-icon-dental-care-linear-pictogram-oral-medicine-clinic-sign-dentistry-outline-symbol-dental-treatment-editable-stroke-isolated-illustration-vector.jpg",
    },
  ];

  return (
    <div className="mt-16">
      <div className="text-center">
        <h3 className="text-xl font-bold text-primary uppercase">
          Our Services
        </h3>
        <h2 className="text-3xl">Services We Provide</h2>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
        {servicesData.map((service) => (
          <Service key={service.id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
