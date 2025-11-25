require("dotenv").config();
const express = require("express");
const mega = require("mega");
const path = require("path");

const app = express();
app.use(express.static(pagitth.join(__dirname, "views")));

// Conexión a Mega
const storage = mega({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASSWORD
});

// 🎬 Streaming de archivos desde MEGA
app.get("/stream/:id", async (req, res) => {
  const fileId = req.params.id;

  try {
    const file = storage.files[fileId];

    if (!file) return res.status(404).send("Archivo no encontrado en MEGA");

    res.setHeader("Content-Type", "video/mp4");

    file.download().pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al reproducir la película");
  }
});

// Página del reproductor
app.get("/player/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views/player.html"));
});

const PORT = 3001;
app.listen(PORT, () => console.log("Backend listo en puerto", PORT));
