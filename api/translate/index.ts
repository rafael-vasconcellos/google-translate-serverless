import { z } from 'zod'
import { translate, singleTranslate, languages } from 'google-translate-api-x';



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
    to: z.enum(Object.keys(languages) as [keyof typeof languages]).optional(),
    from: z.enum(Object.keys(languages) as [keyof typeof languages]).optional(),
})

export async function POST(request: Request) { 
    const body: z.infer<typeof requestSchema> = await readableStreamToObj(request.body)
    const parse = requestSchema.safeParse(body)
    if (!parse.success) { return new Response(JSON.stringify(parse.error), { status: 400 }); }
    const { text, to, from } = body
    const response = JSON.stringify(await singleTranslate(text, { to: to ?? "en", from: from ?? "auto" }))

    console.log(response)
    return new Response(response, { 
        //headers: { "Content-Type": "application/json" }
    })
}