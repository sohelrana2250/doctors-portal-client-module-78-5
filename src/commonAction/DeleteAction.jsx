import toast from "react-hot-toast";
import Swal from "sweetalert2";

const DeleteAction = (url, refetch) => {
  Swal.fire({
    title: "Do you want to  Delete Appointment Information?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't Delete`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Delete!", "", "success");
      fetch(url, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          toast.success(data?.message);
          refetch();
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
};

export default DeleteAction;
