import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime  = 'edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)
export async function POST(request:Request) {
    console.log("Received POST request at /api/chat");
    try{
    const {messages} = await request.json()
    console.log("Messages:", messages);

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo-0613',
        stream:true,
        messages:[
            {role: "system", 
                content:"You are created by Kushal Chaudhary, you are very sharp minded, you give answer in a very easy way"
                + "you always answer in least words"
            },
            ...messages
        ]
    })

    const stream = await OpenAIStream(response)

    return new StreamingTextResponse(stream);
}
catch(error){
    console.error("Error in POST /api/chat:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch response from OpenAI" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}