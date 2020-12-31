import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import UpdateUserService from '../services/UpdateUserService';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, type, password } = request.body;

    // Sem a injeção de dependências, eu precisaria importar o repostorio e passar como parametro pro service
    // const userRepository = new UserRepository();
    // const createUserService = new CreateUserService(userRepository);

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      type,
      password,
    });

    return response.json(classToClass(user));
  }

  async index(request: Request, response: Response) {
    const listAllUsers = container.resolve(ListUsersService);

    const users = await listAllUsers.execute();

    return response.json(classToClass(users));
  }

  async update(request: Request, response: Response) {
    const { idUser } = request.params;
    const { name, email, old_password, password } = request.body;

    const userService = container.resolve(UpdateUserService);

    const user = await userService.execute({
      idUser,
      email,
      name,
      old_password,
      password,
    });

    return response.json(user);
  }
}

export default new UserController();
