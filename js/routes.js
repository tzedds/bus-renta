import {collection, getDocs} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";
import {db} from "./firebase.js";

export async function getRoutes() {
    const routes = await getDocs(collection(db, 'routes'))
    
    return routes.docs.map (
        doc => ({
            id: doc.id,
            ...doc.data()
        })
    ).filter(route => route.active !== false)
}