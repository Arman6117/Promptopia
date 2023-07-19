import { firebaseConfig } from "@utils/firebase";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const POST = async (req) => {
  const { userId, prompt, tag, image, userName, email } = await req.json(); // Getting all the data from the request body

  try {
    // Fetch additional user information from Firestore
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const userData = userDoc.data();

    // console.log(userData);
    // Create new prompt object with user information
    const newPrompt = {
      creator: userId,

      tag,
      prompt,
      image,
      userName,
      email,
    };

    const docRef = await addDoc(collection(db, "prompts"), newPrompt);
    const createdPrompt = { ...newPrompt, id: docRef.id };

    return new Response(JSON.stringify(createdPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new Prompt", { status: 500 });
  }
};
