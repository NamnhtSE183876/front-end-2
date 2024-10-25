import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

const uploadFile = async (file) => {
  // lưu cái file này trên filebase

  const storageRef = ref(storage, file.name);
  const response = await uploadBytes(storageRef, file);
  // => lấy cái đường dẫn đến file vừa tạo
  const downloadURL = await getDownloadURL(response.ref);
  return downloadURL;
};

export default uploadFile;
