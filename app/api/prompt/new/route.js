import { db } from "@utils/firebase";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json(); // Getting all the data from the request body

  try {
    // Fetch additional user information from Firestore
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    const userData = userDoc.data();

    // Create new prompt object with user information
    const newPrompt = {
      creator: {
        userId,
        username: userData.username,
        email: userData.email,
        image: userData.image,
      },
      tag,
      prompt,
    };

    const docRef = await addDoc(collection(db, "prompts"), newPrompt);
    const createdPrompt = { ...newPrompt, id: docRef.id };

    return new Response(JSON.stringify(createdPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new Prompt", { status: 500 });
  }
};
