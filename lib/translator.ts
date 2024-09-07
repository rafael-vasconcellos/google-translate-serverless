import { z } from "zod"
import { googleTranslateApi, languages } from "google-translate-api-x"
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

    public static async validateBody(bodyStream?: ReadableStream<Uint8Array> | null) { 
        const body: z.infer<typeof requestSchema> = await readableStreamToObj(bodyStream)
        return requestSchema.safeParse(body)
    }

}