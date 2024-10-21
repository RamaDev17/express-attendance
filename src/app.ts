import express from "express";
import "dotenv/config";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import officeRoutes from "./routes/officeRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/offices", officeRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found'
  });
});


app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
