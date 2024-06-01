import React from "react";
import PutAction from "../../../commonAction/PutAction";

const UpdateAppointmentModal = ({ appointmentId }) => {
  const handleUpdateAppointment = (event) => {
    event.preventDefault();
    const element = event.target;
    const name = element.name.value;
    const price = Number(element.price.value);
    PutAction(
      `${process.env.REACT_APP_SERVER_API}/admin/updateappoinment/${appointmentId._id}`,
      { name, price }
    );
  };

  return (
    <>
      <input type="checkbox" id="UpdateAppointment" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-full max-w-2xl relative">
          <label
            htmlFor="UpdateAppointment"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>

          <form
            onSubmit={handleUpdateAppointment}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <div className="grid lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4">
              <div className="form-control w-full max-w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={appointmentId?.name}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>
              <div className="form-control w-full max-w-full">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={appointmentId?.price}
                  className="input input-bordered w-full max-w-full"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <input
                className="btn btn-accent  btn-sm m-3"
                value="Update"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateAppointmentModal;
