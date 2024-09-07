import { batchTranslate } from "google-translate-api-x";
import { Translator } from "../../../lib/translator";


export async function POST(request: Request) { 
    const { success, data, error } = await Translator.validateBody(request.body)
    if (!success) {  return new Response(JSON.stringify(error), {status: 400})  }
    const { text, to, from } = data
    return await new Translator(() => batchTranslate(text, { to: to ?? "en", from: from ?? "auto" }))
    .execute()
}