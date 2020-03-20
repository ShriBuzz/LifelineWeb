import background from "../../assets/bg.png";

export const bg = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "100%",
  height: "80vh",
  margin: 0,
  justifyContent: "flex-start",
  //   alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
};

export const Form = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

export const text = {
  color: "#9D9C9C",
  margin: 15
};

export const input = {
  minWidth: 250,
  width: "30%",
  textAlign: "center",
  margin: 20
};
