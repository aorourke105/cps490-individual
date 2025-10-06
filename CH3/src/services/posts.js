import { Post } from '../db/models/post.js'

export async function createPost({title, author, contents, tags}){
    const post = new Post({title, author, contents, tags})
    return await post.save()
}

async function listPosts(
    query = {},
    { sortBy = 'createdAt', sortOrder = 'descending'} = {},
){
    return await Post.find(query).sort({[sortBy]: sortOrder})
}

export async function listAllPosts(options){
    return await listPosts({}, options)
}

export async function listPostsByAuthor(author, options){
    return await listPosts({author}, options)
}

export async function listPostsByTag(tags, options){
    return await listPosts({tags}, options)
}

export async function getPostById(postID){
    return await Post.findById(postID)
}

export async function updatePost(postID, {title, author, contents, tags}){
    return await Post.findOneAndUpdate(
        {_id: postID},
        {$set: {title, author, contents, tags}},
        {new: true},
    )
}

export async function deletePost(postId){
    return await Post.deleteOne({_id: postId})
}