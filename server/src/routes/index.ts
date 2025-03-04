import { Router } from 'express';
const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

try {
    router.use('/api', apiRoutes);
    router.use('/', htmlRoutes);
} catch (err) {
    console.error("Error setting up routes:", err);
}

export default router;
