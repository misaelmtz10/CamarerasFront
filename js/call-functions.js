const firebaseConfig = {
    apiKey: "AIzaSyAQFw6bkYq1gsb5cI6Per48CNb2thnXclg",
    authDomain: "camareras-b6b7b.firebaseapp.com",
    projectId: "camareras-b6b7b",
    storageBucket: "camareras-b6b7b.appspot.com",
    messagingSenderId: "45092282858",
    appId: "1:45092282858:web:f07969ba45408ef7031293"
  };
    // Initialize Firebase
const app = firebaseConfig

const saveBase64Fire = async (base64) => {
    // Add a new document with a generated id.
    app.storage().ref('/gs://camareras-b6b7b.appspot.com/img/').child('observations')
    .putString(base64.split(',')[1], 'base64', {contentType:'image/jpg'}).then((response)=>{
        console.log(response);
    })
    /*const docRef = await addDoc(collection(db, "notes"), {
        text: note.text,
        create_at: new Date()
    });
    if (docRef.id) {
        return 'ok';
    }
    return 'faild';*/
    

};

//import { getStorage,  ref as storageReff} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
//import { getStorage, ref } from "firebase/storage";
import {  getStorage,  ref as storageReff, uploadString} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"
import { app } from "/js/firestore.js"
//const db = getFirestore(app);

const saveImage = async (img) => {


    const storage = getStorage(app);
    const storageRef = storageReff(storage, '/images/rivers.jpg');

    // Base64 formatted string
    const message2 = img;
    uploadString(storageRef, message2, 'data_url').then((snapshot) => {
        console.log('Uploaded a base64 string!');
    });

}

export {
    saveImage
}
