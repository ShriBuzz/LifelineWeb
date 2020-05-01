import { useState, useEffect } from "react";
import axios from "axios";

const useTrafficData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/traffic")
      .then((res) => {
        setUsers(Array.from(res.data).sort(compare));
      })
      .catch((e) => {
        return console.log(e);
      });
  }, [users.length]);

  function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  return { users };
};

export default useTrafficData;
