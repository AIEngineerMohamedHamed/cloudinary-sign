import express from "express";
import cloudinary from "cloudinary";
import cors from "cors";

const app = express();
app.use(cors());

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/signature", (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);

  const folder = "market_images";

  const signature = cloudinary.v2.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    folder,
  });
});


app.listen(process.env.PORT || 3000);
