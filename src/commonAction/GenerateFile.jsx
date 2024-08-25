const GenerateFile = async (file) => {
  const formData = new FormData();
  formData.append("token", process.env.REACT_APP_FILE_TOKEN);
  formData.append("file", file);
  try {
    const response = await fetch("https://api.upfiles.com/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("API ERROR");
    }
    const data = await response.json();
    if (response.ok && data.status === "success") {
      return data?.url;
    } else {
      return "Server Responese Issues";
    }
  } catch (error) {
    return error?.message;
  }
};

export default GenerateFile;
