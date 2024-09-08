import { z } from "zod"
import { languages } from "google-translate-api-x"
import { VercelRequest, VercelResponse } from "@vercel/node"
import { readableStreamToObj } from "./streams"


const requestSchema = z.object({ 
    text: z.string(),
    to: z.enum(Object.keys(languages) as [keyof typeof languages]).optional(),
    from: z.enum(Object.keys(languages) as [keyof typeof languages]).optional(),
})

export class Translator { 
    public readonly request?: Request
    private handler?: () => unknown

    constructor(handler: () => unknown) { 
        if (typeof handler === "function") { this.handler = handler as any }
    }

    async execute() { 
        if (typeof this.handler === "function") { 
            const response = JSON.stringify(await this.handler())
            //console.log(response)
            return new Response(response, { 
                headers: { "Content-Type": "application/json" }
            })
        }

    }

    public static validate(request: VercelRequest, response: VercelResponse) { 
        if (request.method === "OPTIONS") { 
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader("Access-Control-Allow-Credentials", "true")
            response.setHeader('Access-Control-Allow-Methods', 'POST');
            response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            response.setHeader('Access-Control-Max-Age', '86400'); // Cache preflight (1 day)
            response.status(204).send("");
            return
        }
        const { success, data, error } = requestSchema.safeParse(request.body)
        if (success) { return data }
        response.status(400).json(error)
    }

}