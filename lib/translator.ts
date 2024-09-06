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
    private handler?: (
        input: string,
        opts?: googleTranslateApi.RequestOptions,
    ) => googleTranslateApi.TranslationResponseStructure<any>;

    constructor(request: Request, handler: CallableFunction) { 
        if (request instanceof Request && typeof handler === "function") { 
            this.request = request
            this.handler = handler as any
        }
    }

    async execute() { 
        if (this.request && typeof this.handler === "function") { 
            const body: z.infer<typeof requestSchema> = await readableStreamToObj(this.request?.body)
            const parse = requestSchema.safeParse(body)
            if (!parse.success) { return new Response(JSON.stringify(parse.error), { status: 400 }); }
            const { text, to, from } = body
            const response = JSON.stringify(await this.handler(text, { to: to ?? "en", from: from ?? "auto" }))

            console.log(response)
            return new Response(response, { 
                //headers: { "Content-Type": "application/json" }
            })
        }

    }

}