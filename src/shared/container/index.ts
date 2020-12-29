import { container } from 'tsyringe';
import DependencyInjectionName from '@constants/names';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import UserRepository from '@modules/user/http/typeorm/repositories/UserRepository';

// O generic é pra garantir que o UserRepository vai possuir o formato do IUserRepository
container.registerSingleton<IUserRepository>(
  DependencyInjectionName.user,
  UserRepository,
);
