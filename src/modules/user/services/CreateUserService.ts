import { injectable, inject } from 'tsyringe';
import DependencyInjectionName from '@constants/names';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import User from '../entities/User';
import IUserDTO from '../dtos/ICreateUserDTO';
import IUserRepository from '../http/typeorm/repositories/UserRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject(DependencyInjectionName.user)
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    type,
  }: IUserDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('E-mail already registered in the application');
    }

    const hashPassword = await hash(password, 8);

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      type,
    });

    return newUser;
  }
}

export default CreateUserService;
