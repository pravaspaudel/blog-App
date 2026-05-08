import cloudinary from "../config/cloudinary.config";
import streamifier from "streamifier";

const uploadImage = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blogs" },
      (error, result) => {
        if (error) {
          console.log("Cloudinary error:", error);
          return reject(error);
        }

        console.log("Cloudinary result:", result);
        resolve(result);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export { uploadImage };
