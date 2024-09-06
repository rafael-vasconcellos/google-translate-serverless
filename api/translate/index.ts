import { singleTranslate } from "google-translate-api-x";
import { Translator } from "../../lib/translator";


export async function POST(request: Request) { 
    const translator = new Translator(request, singleTranslate)
    return await translator.execute()
}