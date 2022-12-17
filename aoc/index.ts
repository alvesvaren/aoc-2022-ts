import axios from 'axios';
import "dotenv/config";
import fs from 'fs/promises';
import path from 'path';
const session = process.env.SESSION;
const year = process.env.YEAR || new Date().getFullYear();

if (!session) {
    throw new Error("No session cookie specified in .env-file");
}

const client = axios.create({
    baseURL: `https://adventofcode.com/${year}`,
    headers: {
        Cookie: `session=${session}`
    }
});

/** Get the text input for a specific day using the session specified in your .env-file */
export const getInput = async (day: number) => {
    const cachePath = `./inputs/${year}/${day}.txt`;
    try {
        fs.mkdir(path.parse(cachePath).dir, {recursive: true});
        try {
            return (await fs.readFile(cachePath)).toString();
        } catch (e) {
            const { data } = await client.get(`/day/${day}/input`);
            await fs.writeFile(cachePath, data);
            return data as string;        
        }
    } catch (e) {
        throw new Error(`Failed to get input for day ${day}`, { cause: e });
    }
}

/** Cache all available days, to make new script runtime faster */
export const cacheAvailable = async () => {
    for (let day = 1; day <= 25; day++) {
        try {
            await getInput(day);
        } catch (e) {
            break;
        }
    }
}