import express from 'express';
// import { g } from '../../client/src/actions/posts.js';
import { getPostsBySearch, getPostsByCreator,getPosts, getPost, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/creator', getPostsByCreator);
router.get('/', getPosts);
router.post('/', auth, createPost);
router.get('/:id', getPost); //get single post
router.patch('/:id', auth, updatePost);//only you created
router.delete('/:id', auth, deletePost);//only you created
router.patch('/:id/likePost', auth, likePost);

export default router;