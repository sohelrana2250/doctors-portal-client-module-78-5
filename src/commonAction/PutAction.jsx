import toast from "react-hot-toast";

const PutAction = (url, selectedSpecialties) => {
  fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(selectedSpecialties),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("API ERROR");
      }
      return res.json();
    })
    .then((data) => {
      toast.success(data?.message);
    })
    .catch((error) => {
      toast.error(error?.message);
    });
};

export default PutAction;
