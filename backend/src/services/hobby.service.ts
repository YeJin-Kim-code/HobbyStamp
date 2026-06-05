import { AppDataSource } from '../config/data-source';
import { Hobby } from '../entities/hobby.entity';

export class HobbyService {
  private hobbyRepository = AppDataSource.getRepository(Hobby);

  async getHobbies() {
    return await this.hobbyRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }
}