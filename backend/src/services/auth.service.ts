import bcrypt from 'bcrypt';
import { AppDataSource } from '../config/data-source';
import { User } from '../entities/user.entity';
import { SignupDto } from '../dto/signup.dto';

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);

  async signup(signupDto: SignupDto) {
    const { email, password, nickname } = signupDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new Error('이미 사용 중인 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      nickname,
    });

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      createdAt: user.createdAt,
    };
  }
}