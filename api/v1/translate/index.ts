import { translate } from "@vitalets/google-translate-api";
import { Translator } from "../../../lib/translator";


export async function POST(request: Request) { 
    const translator = new Translator(request, translate)
    return await translator.execute()
}