import express from 'express';
import mongoose, { isObjectIdOrHexString } from 'mongoose';
import PostMessage from '../models/postMessage.js';

const router = express.Router();


//query means-> /post?page equals 1 then -> page is 1
//params -> /posts/123 ->id is 123 (used to get specific result)

// export const getPosts = async (req, res) => { 
//     try {
//         const postMessages = await PostMessage.find();            
//         res.status(200).json(postMessages);
//     } 
//     catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }


export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const getPost = async (req, res) => { 
    const { id } = req.params;
    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] });

        res.json({ data: posts });
    } 
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });

        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const createPost = async (req, res) => {

    const post = req.body;
    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString()}); //... spreads the post
    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage );
    } 
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    //check if id is valid mongoose object
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    //req.userId ...
    if(!req.userId) return res.json({message:'Unauthorized'});//if not logged in
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id)=>id ===String(req.userId));//that person already liked the post
    if(index===-1){
        //like the post
        post.likes.push(req.userId);
    }
    else{
        post.likes = post.likes.filter((id)=>id!==String(req.userId));
        //dislike
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });//created new post kinnda
    res.json(updatedPost);
}

export default router;