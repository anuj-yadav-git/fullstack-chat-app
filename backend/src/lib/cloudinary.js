import {v2 as cloudinary} from 'cloudinary'
import { config } from 'dotenv'

//Loads .env file contents into process.env by default.
config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary