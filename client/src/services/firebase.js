import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArvR2D8gtD40RKp4piuGmlIFUi3L3eseU",
  authDomain: "mern-blog-application-8525b.firebaseapp.com",
  projectId: "mern-blog-application-8525b",
  storageBucket: "mern-blog-application-8525b.appspot.com",
  messagingSenderId: "136585858132",
  appId: "1:136585858132:web:8dc21550f092310135b1c1",
  measurementId: "G-DCWM859SD3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);

// profile image
export const uploadImage = async (file) => {
  const storageRef = ref(imageDb, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const deleteImage = async (imageUrl) => {
  const storageRef = ref(imageDb, imageUrl);
  await deleteObject(storageRef);
};

// blog image
export const uploadBlogImage = async (file) => {
  const storageRef = ref(imageDb, `blogImages/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const deleteBlogImage = async (imageUrl) => {
  const storageRef = ref(imageDb, imageUrl);
  await deleteObject(storageRef);
};
