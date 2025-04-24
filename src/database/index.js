import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://khemrajsaud56:6Etb7DkTTeR1zNh0@cluster0.pxuhuma.mongodb.net/";
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("blog database connection is sucessfull"))
    .catch((error) => console.log(error));
};

export default connectToDB;
