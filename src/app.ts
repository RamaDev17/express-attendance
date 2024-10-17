import express from "express";
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
