import { firebaseConfig } from "@utils/firebase";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//!GET
export const GET = async (request, { params }) => {
  try {
    const promptDoc = await getDoc(doc(db, "prompts", params.id));

    if (!promptDoc.exists()) {
      return new Response("Prompt not found", { status: 404 });
    }

    const prompt = { id: promptDoc.id, ...promptDoc.data() };

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the prompts", { status: 500 });
  }
};

//!PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    const promptRef = doc(db, "prompts", params.id);
    const promptDoc = await getDoc(promptRef);

    if (!promptDoc.exists()) {
      return new Response("Prompt not found", { status: 404 });
    }

    await updateDoc(promptRef, { prompt, tag });

    const updatedPrompt = { id: params.id, prompt, tag };

    return new Response(JSON.stringify(updatedPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

//!DELETE
export const DELETE = async (request, { params }) => {
  try {
    const promptRef = doc(db, "prompts", params.id);
    const promptDoc = await getDoc(promptRef);

    if (!promptDoc.exists()) {
      return new Response("Prompt not found", { status: 404 });
    }

    await deleteDoc(promptRef);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
