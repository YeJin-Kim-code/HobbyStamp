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