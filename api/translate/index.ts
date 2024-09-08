import { singleTranslate } from "google-translate-api-x";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { validate } from "../../lib/translator";


export default async function handler(req: VercelRequest, res: VercelResponse) { 
    const body = validate(req, res)
    if (body) { 
        const response = await singleTranslate(body.text, { to: body.to ?? "en", from: body.from ?? "auto" })
        res.status(201).json(response)
    }
}