import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";
import { Hobby } from "../entities/hobby.entity";

const postRepository = AppDataSource.getRepository(Post);
const userRepository = AppDataSource.getRepository(User);
const hobbyRepository = AppDataSource.getRepository(Hobby);

export const createPost = async (
    userId: number,
    hobbyId: number,
    title: string,
    content: string
) => {
    const user = await userRepository.findOne({
        where: {id:userId},
    });
    if(!user){
        throw new Error("USER_NOT_FOUND");
    }

    const hobby = await hobbyRepository.findOne({
    where: { id: hobbyId },
    });

    if (!hobby) {
    throw new Error("HOBBY_NOT_FOUND");
    }

    const post = postRepository.create({
        user,
        hobby,
        title,
        content,
        aiSummary: null,
    });

    return await postRepository.save(post);
};

export const updatePost = async (
    userId: number,
    postId: number,
    title:string,
    content:string,
    hobbyId: number
) => {
    const post = await postRepository.findOne({
        where: {id: postId},
        relations:{user: true, hobby:true},
    });

    if (!post){
        throw new Error("POST_NOT_FOUND");
    }

    if(post.user.id !== userId){
        throw new Error("FORBIDDEN");
    }
      const hobby = await hobbyRepository.findOne({
    where: { id: hobbyId },
    });

    if (!hobby) {
     throw new Error("HOBBY_NOT_FOUND");
    }

    post.title = title;
    post.content = content;
    post.hobby = hobby;

    return await postRepository.save(post);
}

export const deletePost = async (
    userId: number,
    postId: number
) => {
    const post = await postRepository.findOne({
        where: {id: postId},
        relations: {user:true},
    });
      if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  if (post.user.id !== userId) {
    throw new Error("FORBIDDEN");
  }

  await postRepository.remove(post);
}