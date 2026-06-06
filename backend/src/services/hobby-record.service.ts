import { AppDataSource } from '../config/data-source';
import { HobbyRecord } from '../entities/hobby-record.entity';
import { User } from '../entities/user.entity';
import { Hobby } from '../entities/hobby.entity';
import { CreateHobbyRecordDto } from '../dto/create-hobby-record.dto';

export class HobbyRecordService {
  private hobbyRecordRepository = AppDataSource.getRepository(HobbyRecord);
  private userRepository = AppDataSource.getRepository(User);
  private hobbyRepository = AppDataSource.getRepository(Hobby);

  async createHobbyRecord(createHobbyRecordDto: CreateHobbyRecordDto) {
    const { userId, hobbyId, title, content, activityDate, goalAchieved } =
      createHobbyRecordDto;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('존재하지 않는 사용자입니다.');
    }

    const hobby = await this.hobbyRepository.findOne({
      where: { id: hobbyId },
    });

    if (!hobby) {
      throw new Error('존재하지 않는 취미입니다.');
    }

    const hobbyRecord = this.hobbyRecordRepository.create({
      user,
      hobby,
      title,
      content,
      activityDate,
      goalAchieved: goalAchieved ?? false,
    });

    await this.hobbyRecordRepository.save(hobbyRecord);

    return {
      id: hobbyRecord.id,
      title: hobbyRecord.title,
      content: hobbyRecord.content,
      activityDate: hobbyRecord.activityDate,
      goalAchieved: hobbyRecord.goalAchieved,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      },
      hobby: {
        id: hobby.id,
        name: hobby.name,
      },
      createdAt: hobbyRecord.createdAt,
      updatedAt: hobbyRecord.updatedAt,
    };
  }
}