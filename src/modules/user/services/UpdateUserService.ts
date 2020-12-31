import { inject, injectable } from 'tsyringe';
import DependencyInjectionName from '@constants/names';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import User from '../entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IUpdateUserRequest {
  idUser: string;
  name: string;
  email: string;
  old_password: string;
  password: string;
}

@injectable()
class ListUsersService {
  constructor(
    @inject(DependencyInjectionName.user)
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    idUser,
    name,
    email,
    old_password,
    password,
  }: IUpdateUserRequest): Promise<User> {
    const user = await this.usersRepository.findById(idUser);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    const newUser = await this.usersRepository.updateUser(user);

    return newUser;
  }
}

export default ListUsersService;
