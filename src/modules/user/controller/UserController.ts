import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '../services/CreateUserService';

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

    // delete user.password;

    return response.json(user);
  }
}

export default new UserController();
