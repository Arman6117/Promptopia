import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";


export const GET = async (req, res) => {
  try {
    const promptsRef = collection(db, 'prompts');
    const promptsSnapshot = await getDocs(promptsRef);
    const prompts = [];

    promptsSnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() });
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch the prompts', { status: 500 });
  }
};
