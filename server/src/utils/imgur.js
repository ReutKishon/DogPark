import axios from "axios";
import fs from "fs";
import url from "url";
import path from "path";

export async function uploadImageToImgur(imageUrl, dogId) {
  try {
    const decodedUrl = decodeURIComponent(imageUrl.replace(/^file:\/\//, ""));
    const filePath = path.resolve(decodedUrl);

    const base64Image = await getBase64Image(filePath);

    // Create a new album
    const albumTitle = "dogId-" + dogId;
    const albumId = await createAlbum(albumTitle);

    if (!albumId) {
      console.error("Failed to create album. Aborting image upload.");
      return;
    }

    // Upload image to the newly created album
    const response = await axios.put(
      `https://api.imgur.com/3/album/${albumId}/add`,
      {
        image: base64Image,
      },
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      console.log("Image uploaded successfully:", response.data.data);
      console.log("Image link:", response.data.data.link);
    } else {
      console.error("Failed to upload image to Imgur:", response.data);
    }
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
  }
}

export async function getImageFromImgur(dogId) {
  console.log("Getting image from Imgur:", dogId, process.env.IMGUR_CLIENT_ID);
  try {
    const response = await axios.get(
      `https://api.imgur.com/3/album/dogId-${dogId}/images`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
      }
    );

    if (response.data.success) {
      //console.log("Image data:", response.data.data);
      // You can access various properties of the image, e.g., link, title, description
      //console.log("Image link:", response.data.data.link);
      return response.data.data.link;
    } else {
      return null;
    }
  } catch (error) {
    //console.error("Error getting image from Imgur:", error);
    return null;
  }
}

const getBase64Image = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "base64" }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Function to create a new album on Imgur
const createAlbum = async (title) => {
  try {
    const response = await axios.post(
      "https://api.imgur.com/3/album",
      { title },
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return response.data.data.id;
    } else {
      console.error("Failed to create album on Imgur:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error creating album on Imgur:", error);
    return null;
  }
};
