import mongoose from "mongoose";

function connect(url) {
  mongoose.set({ strictQuery: true });
  mongoose
    .connect(url)
    .then((res) => {
      console.log("connected to mongodb");
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
      console.log("Not connected");
    });
}

export default connect;
