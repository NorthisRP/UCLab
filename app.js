const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

//app.use(express.static(path.join(__dirname, "client", "build")));

app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "client", "index.html"));
});

app.use("/api/create", require("./routes/admin"));
app.use("/api/auth", require("./routes/login"));

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
  } catch (error) {
    console.log(`Server error`, e.message);
    process.exit(1);
  }
}

start();
