import express from 'express';
import { postController } from './post.controller';
const router = express.Router();

router.post('/create', postController.createPost);

export const PostRoutes = router;
