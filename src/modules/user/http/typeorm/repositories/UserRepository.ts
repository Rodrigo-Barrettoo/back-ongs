import { getRepository, Repository } from 'typeorm';
import IUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '@modules/user/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    email,
    name,
    password,
    type,
  }: IUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      password,
      email,
      type,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }
}

export default UserRepository;
