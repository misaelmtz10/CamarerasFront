import {  getStorage,  ref as storageReff, uploadString} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"
import { app } from "/js/firestore.js"
//const db = getFirestore(app);

const saveImage = async (img) => {
    const storage = getStorage(app);
    const storageRef = storageReff(storage, '/images/rivers.jpg');

    // Base64 formatted string
    const photo = img;
    uploadString(storageRef, photo, 'data_url').then((snapshot) => {
        console.log('Uploaded a base64 string!');
    });
}

export {
    saveImage
}


