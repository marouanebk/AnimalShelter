import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../firebaseconfig";

export const handleUpload = async (files: File[]) => {
    const uploadedPictures: string[] = [];
  
    return new Promise<string[]>((resolve, reject) => {
      if (!files.length) {
        alert("Please choose at least one file first!");
        reject();
        return;
      }
  
      const uploadTasks = files.map((file, index) => {
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              // Do something with the progress if needed
            },
            (err) => {
              console.log(err);
              reject(err);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  uploadedPictures.push(url);
                  resolve(url);
                })
                .catch((err) => {
                  console.log(err);
                  reject(err);
                });
            }
          );
        });
      });
  
      Promise.all(uploadTasks)
        .then(() => {
          resolve(uploadedPictures);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  };