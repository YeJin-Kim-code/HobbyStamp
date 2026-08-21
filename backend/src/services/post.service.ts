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
        throw new Error("존재하지 않는 회원입니다");
    }

    const hobby = await hobbyRepository.findOne({
    where: { id: hobbyId },
    });

    if (!hobby) {
    throw new Error("취미가 존재하지 않습니다");
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