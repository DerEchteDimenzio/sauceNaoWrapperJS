import SauceNaoClient from './client/sauceNaoClient.js';
import dotenv from "dotenv";
import fs from 'fs';

dotenv.config();

let client = new SauceNaoClient(process.env.API_KEY);

client.makeRequest("https://i.redd.it/gq7163xtiid21.png", 10).then(res => {
    fs.writeFileSync("./result.json", JSON.stringify(res, null, 2));
});