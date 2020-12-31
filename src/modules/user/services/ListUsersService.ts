import { inject, injectable } from 'tsyringe';
import DependencyInjectionName from '@constants/names';
import User from '../entities/User';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
class ListUsersService {
  constructor(
    @inject(DependencyInjectionName.user)
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers();

    return users;
  }
}

export default ListUsersService;
