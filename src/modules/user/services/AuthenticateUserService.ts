import { inject, injectable } from 'tsyringe';
import DependencyInjectionName from '@constants/names';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import jwtConfig from '@config/jwtConfig';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserDTO from '../dtos/ICreateUserDTO';

interface IAuthenticateUserProps {
  user: IUserDTO;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject(DependencyInjectionName.user)
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: Omit<IUserDTO, 'name' | 'type'>): Promise<IAuthenticateUserProps> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combinations');
    }

    const checkMatchPassword = await compare(password, user.password);

    if (!checkMatchPassword) {
      throw new AppError('Incorrect email/password combinations2');
    }

    const { expiresIn, secret } = jwtConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
