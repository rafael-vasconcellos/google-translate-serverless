import { VercelRequest, VercelResponse } from "@vercel/node";
//import axios, { AxiosResponse } from "axios";
import { IncomingHttpHeaders } from 'http'


function incomingHttpHeadersToHeadersInit(incomingHttpHeaders: IncomingHttpHeaders) { 
    const headers = new Headers()
    for (const [key, value] of Object.entries(incomingHttpHeaders)) {
        if (Array.isArray(value)) {
            for (const v of value) {
            headers.append(key, v);
            }
        } else if (value !== undefined) {
            headers.set(key, value);
        }
    }
    return headers
}

export default async function handler(req: VercelRequest, res: VercelResponse) { 
    const headers = incomingHttpHeadersToHeadersInit(req.headers)
    const response = await fetch('https://api.ipify.org?format=json', { 
        //headers,
    })
    //.then(response => response.data)
    .then(response => response.json())
    .catch(err => err);

    if (response instanceof Error) { return res.status(500).send('Error: ' + response.message) }
    res.status(200).send(response.ip)
}