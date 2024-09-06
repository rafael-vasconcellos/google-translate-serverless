import { waitUntil } from '@vercel/functions'
import { z } from 'zod'
import { translate, singleTranslate, languages, googleTranslateApi } from 'google-translate-api-x';



async function readableStreamToString(stream: ReadableStream<Uint8Array> | null): Promise<string> {
    if (!stream) { throw new Error('Stream is null') }
  
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = '';
  
    while (true) {
      const { done, value } = await reader.read();
  
      if (done) { break }
  
      // Decodificar e concatenar o chunk ao resultado final
      result += decoder.decode(value, { stream: true });
    }
  
    // Decodificar qualquer parte restante do stream
    result += decoder.decode();
  
    return result;
}

async function readableStreamToObj<T= unknown>(stream: ReadableStream<Uint8Array> | null): Promise<T> { 
    return JSON.parse(await readableStreamToString(stream)) as T
}

const requestSchema = z.object({ 
    text: z.string(),
    to: z.enum(Object.keys(languages) as [keyof typeof languages]),
    from: z.enum(Object.keys(languages) as [keyof typeof languages]),
})

export function POST(request: Request) { 
    let response: googleTranslateApi.TranslationResponse | z.ZodError<any> = {} as never
    waitUntil( new Promise( async(res) => { 
        const body: z.infer<typeof requestSchema> = await readableStreamToObj(request.body)
        const parse = requestSchema.safeParse(body)
        if (!parse.success) { response = parse.error ; return }
        const { text, to } = body
        singleTranslate(text, { to }).then(result => response = result)
    }))

    return response
}