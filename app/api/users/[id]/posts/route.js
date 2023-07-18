import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";


export const GET = async (request, { params }) => {
  try {
    const promptsRef = collection(db, 'prompts');
    const querySnapshot = await getDocs(
      query(promptsRef, where('creator', '==', params.id))
    );

    const prompts = [];

    querySnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() });
    });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts created by user', { status: 500 });
  }
};
