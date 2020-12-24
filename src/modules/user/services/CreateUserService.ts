import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../../../models/User';
import IUserDTO from '../dtos/ICreateUserDTO';

class CreateUserService {
  public async execute({
    name,
    email,
    type,
    password,
  }: IUserDTO): Promise<User> {
    const userRepository = getRepository(User);

    const passwordHashed = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      type,
      password: passwordHashed,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
