import toast from "react-hot-toast";

const PostAction = (data, url) => {
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res?.ok) {
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

export default PostAction;
