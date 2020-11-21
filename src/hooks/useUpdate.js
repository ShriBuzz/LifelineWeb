import { useState, useEffect, useContext } from 'react';

// hook
import { LoginContext } from './LoginContext';

// packages
import axios from 'axios';
import { toast } from 'react-toastify';

const useUpdate = (o_contact, type) => {
  const { Dusers, Tusers } = useContext(LoginContext);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [driver_id, setDriverId] = useState('');
  const [user, setUser] = useState(null);
  const [urls, setUrls] = useState('');
  const [loading, setLoading] = useState(true);
  const [upload, setUpload] = useState(null);
  const [url, setUrl] = useState(null);
  const driver_pic = '/update_driver_pic/' + o_contact;
  const traffic_pic = '/update_traffic_pic/' + o_contact;

  useEffect(() => {
    if (type === 'driver') {
      setLoading(true);
      setUrls(process.env.REACT_APP_BASE_URL + 'get_driver_pic/' + o_contact);
      const data = Dusers.filter((user) => {
        return user.contact === parseInt(o_contact);
      });
      setUser(data[0]);
      setName(data[0].name);
      setContact(data[0].contact);
      setEmail(data[0].email);
      setDriverId(data[0].driver_id);
      setLoading(false);
    } else {
      setUrls(process.env.REACT_APP_BASE_URL + 'get_traffic_pic/' + o_contact);
      setLoading(true);
      const data = Tusers.filter((user) => {
        return user.contact === parseInt(o_contact);
      });
      setUser(data[0]);
      setName(data[0].name);
      setContact(data[0].contact);
      setEmail(data[0].email);
      setDriverId(data[0].driver_id);
      setLoading(false);
    }
  }, [Dusers, Tusers, o_contact, type]);

  function handlePreview(e) {
    e.preventDefault();
    if (upload == null) {
      toast.warn('Choose an image to preview.');
    } else {
      const objectUrl = URL.createObjectURL(upload);
      setUrl(objectUrl);
    }
  }

  const handleDriverUpdate = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `/driver/` + o_contact,
        {
          // data to be sent
          name,
          email,
          driver_id,
          contact,
        },
        {}
      )
      .then((response) => {
        handleDriverUpload();
        toast.success('succesfully updated!');
        // window.location.reload(false);
      })
      .catch((error) => {
        toast.error('failed to update!');
        console.log(error);
      });
  };

  const handleDriverUpload = async () => {
    if (upload == null) {
      return;
    } else {
      let file = new FormData();
      file.append('file', upload, upload.name);
      await axios
        .post(driver_pic, file, {})
        .then((response) => {
          // console.log(response.statusText, "Sent image!!!!!");
          toast.success('Successfully uploaded image.');
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleTrafficUpdate = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `/traffic/` + o_contact,
        {
          // data to be sent
          name,
          email,
          contact,
        },
        {}
      )
      .then((response) => {
        handleTrafficUpload();
        toast.success('succesfully updated!');
        // window.location.reload(false);
      })
      .catch((error) => {
        toast.error('failed to update!');
        console.log(error);
      });
  };

  const handleTrafficUpload = async () => {
    if (upload == null) {
      return;
    } else {
      let file = new FormData();
      file.append('file', upload, upload.name);
      await axios
        .post(traffic_pic, file, {})
        .then((response) => {
          toast.success('Successfully uploaded image.');
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return {
    user,
    urls,
    handleDriverUpdate,
    handleTrafficUpdate,
    name,
    setName,
    email,
    setEmail,
    contact,
    setContact,
    driver_id,
    setDriverId,
    loading,
    url,
    setUpload,
    handlePreview,
  };
};

export default useUpdate;
