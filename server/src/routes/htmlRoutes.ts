import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router, Request, Response } from 'express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();


router.get("/", (_req: Request, res: Response) => { 
    const filePath = path.join(__dirname, '../../../client/dist/index.html');

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Error: index.html not found");
    }

    return res.sendFile(filePath); 
});

export default router;
