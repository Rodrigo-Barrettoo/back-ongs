import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findAllUsers(): Promise<User[]>;
  updateUser(user: User): Promise<User>;
}
