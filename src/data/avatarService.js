import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { updateProfile } from "./userService";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function uploadAvatar(uid, file) {
  if (!uid) throw new Error("Missing uid");
  if (!file) throw new Error("No file provided");

  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Image must be under 5 MB");
  }

  const storageRef = ref(storage, `avatars/${uid}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);

  await updateProfile(uid, { photoURL });

  return photoURL;
}
