import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./app/config/db.config.js";
import movieRoutes from "./app/routes/movie.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", movieRoutes);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a BD exitosa");

    await sequelize.sync();
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Servidor en puerto ${process.env.PORT || 3000}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar:", error);
  }
}

startServer();
