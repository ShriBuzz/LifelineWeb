import { useState } from "react";
import axios from "axios";

const useSubmit = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [driver_id, setDriverId] = useState("");
  const [password, setPassword] = useState("");
  const [upload, setUpload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [url, setUrl] = useState(null);
  const driver_pic = "/update_driver_pic/" + contact;
  const traffic_pic = "/update_traffic_pic/" + contact;

  const handleClose = () => {
    setSuccess(false);
    setFail(false);
  };

  const handleDriverUpload = async () => {
    if (upload == null) {
      alert("Submit form and choose image before upload.");
    } else {
      let file = new FormData();
      file.append("file", upload, upload.name);
      await axios
        .post(driver_pic, file, {})
        .then((response) => {
          console.log(response.statusText, "Sent image!!!!!");
          alert("Successfully uploaded image to server.");
        })
        .catch((error) => {
          setFail(true);
          console.log(error);
        });
    }
  };

  function handlePreview(e) {
    e.preventDefault();
    if (upload == null) {
      alert("Choose an image to preview.");
    } else {
      const objectUrl = URL.createObjectURL(upload);
      setUrl(objectUrl);
    }
  }

  function resetForm() {
    setName("");
    setContact("");
    setEmail("");
    setDriverId("");
    setPassword("");
    setUpload(null);
  }

  const postData = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!upload) {
      alert("Please upload an image!");
    }

    //API call here
    if (upload) {
      await axios
        .post(
          `/driver_signup`,
          {
            // data to be sent
            name,
            email,
            password,
            driver_id,
            contact,
          },
          {}
        )
        .then((response) => {
          handleDriverUpload();
          setSuccess(true);
          resetForm();
        })
        .catch((error) => {
          setFail(true);
          console.log(error);
        });
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const postTrafficData = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!upload) {
      alert("Please upload an image!");
    }

    //API call here
    if (upload) {
      await axios
        .post(`/traffic_signup`, {
          // data to be sent
          name,
          email,
          password,
          contact,
        })
        .then((response) => {
          console.log(response.data);
          handleTrafficUpload();
          setSuccess(true);
        })
        .catch((error) => {
          setFail(true);
          console.log(error);
        });
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleTrafficUpload = async () => {
    if (upload == null) {
      alert("Submit form and choose image before upload.");
    } else {
      let file = new FormData();
      file.append("file", upload, upload.name);
      await axios
        .post(traffic_pic, file, {})
        .then((response) => {
          console.log(response.statusText, "Sent image!!!!!");
          resetForm();
        })
        .catch((error) => {
          setFail(true);
          console.log(error);
        });
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    driver_id,
    setDriverId,
    password,
    setPassword,
    postData,
    postTrafficData,
    url,
    setUpload,
    handlePreview,
    loading,
    success,
    handleClose,
    fail,
  };
};

export default useSubmit;
