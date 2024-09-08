import { translate } from "@vitalets/google-translate-api";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { Translator } from "../../../lib/translator";


export default async function handler(request: VercelRequest, response: VercelResponse) { 
    const body = Translator.validate(request, response)
    if (body) { 
        const translator = new Translator(() => translate(body.text, { to: body.to ?? "en", from: body.from ?? "auto" }))
        response.status(201).json(await translator.execute())
    }
}