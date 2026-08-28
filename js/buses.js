import {collection, getDocs} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import {db} from "./firebase.js";

export async function getBuses() {
    const buses = await getDocs(collection(db, 'buses'))
    
    return buses.docs.map (
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    )
}