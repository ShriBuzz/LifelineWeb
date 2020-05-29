import io from "socket.io-client";
const socket = io("/");
const obstruction = {
  latitude: 20.425,
  longitude: 84.234,
  cause: "something happened",
};
const driverRoute = {
  start: {
    latitude: 20.425,
    longitude: 84.234,
  },
  end: {
    latitude: 20.425,
    longitude: 84.234,
  },
};
const driverGps = {
  latitude: 20.425,
  longitude: 84.234,
};

export function connect() {
  socket.on("connect", function () {
    socket.emit("obstruction", obstruction);
    socket.emit("driver_route", driverRoute);
    socket.emit("driver_gps", driverGps);

    // socket.emit("message", "string");
  });
  // socket.on("message", function (lol) {
  //   console.log("Received message: ", lol);
  // });
  // socket.on("json", function (json) {
  //   console.log("data: ", json);
  // });
  socket.on("json", function (json) {
    console.log("data: ", json);
  });
}
