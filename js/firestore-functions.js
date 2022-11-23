import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js"
import { } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"
import { app } from "/js/firestore.js"


const db = getFirestore(app);

/*const getNotesFirestore = async (cont) => {
    const q = query(collection(db, "notes"), orderBy("create_at", "desc"), limit(cont));

    const querySnapshot = await getDocs(q);

    return querySnapshot;
    
}*/


const saveBase64Fire = async (base64) => {
    // Add a new document with a generated id.
    const ref = db.storage().ref('/gs://camareras-b6b7b.appspot.com/').child('observations')
    .putString(base64.split(',')[1], 'base64', {contentType:'image/jpg'});
    /*const docRef = await addDoc(collection(db, "notes"), {
        text: note.text,
        create_at: new Date()
    });
    if (docRef.id) {
        return 'ok';
    }
    return 'faild';*/
    console.log(ref);

};

export {
    saveBase64Fire
}
