const express = require("express");
// const app = express();
// const port = 3001;
const router = express.Router();

router.use(express.static("public"));

router.get("/audio", (req, res) => {
  const audioFile = __dirname + "/public/audio.mp3";
  res.sendFile(audioFile);
});

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
