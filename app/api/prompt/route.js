import { firebaseConfig } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const GET = async (req, res) => {
  try {
    const promptsRef = collection(db, 'prompts');
    const promptsSnapshot = await getDocs(promptsRef);
    const prompts = [];

    promptsSnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() });
    });
    // console.log();

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch the prompts', { status: 500 });
  }
};
