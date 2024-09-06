export async function readableStreamToString(stream?: ReadableStream<Uint8Array> | null): Promise<string> {
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

export async function readableStreamToObj<T= unknown>(stream?: ReadableStream<Uint8Array> | null): Promise<T> { 
    return JSON.parse(await readableStreamToString(stream)) as T
}