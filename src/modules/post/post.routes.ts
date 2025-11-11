import express from 'express';
import { postController } from './post.controller';
const router = express.Router();

router.post('/create', postController.createPost);
router.get('/stats', postController.getPostStats);
router.get('/all', postController.getAllPosts);
router.get('/:id', postController.getPostById);

export const PostRoutes = router;
