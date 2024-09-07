import { singleTranslate } from "google-translate-api-x";
import { Translator } from "../../lib/translator";


export async function POST(request: Request) { 
    const { success, data, error } = await Translator.validateBody(request.body)
    if (!success) {  return new Response(JSON.stringify(error), {status: 400})  }
    const { text, to, from } = data
    return await new Translator(() => singleTranslate(text, { to: to ?? "en", from: from ?? "auto" }))
    .execute()
}

export async function OPTIONS(request: Request) { 
    return new Response("", { 
        status: 204, 
        headers: { 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
            'Access-Control-Max-Age': '86400', // Cache preflight (1 day)
        }
    })
}