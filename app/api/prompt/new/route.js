import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async(req) =>{

    const {userId,prompt,tag} = await req.json()  //* Getting all the data from body
    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator:userId,
            tag,
            prompt
        })
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response("Failed to create new Prompt",{status:500})
    }
}