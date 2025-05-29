import { VercelRequest, VercelResponse } from "@vercel/node";
import axios, { AxiosResponse } from "axios";


export default async function handler(req: VercelRequest, res: VercelResponse) { 
    const response = await axios.get('https://api.ipify.org?format=json')
    .catch(err => err);

    if (response instanceof Error) { return res.status(500).send('Error: ' + response.message) }
    return new Response('IP address: ' + response.data.ip)
}