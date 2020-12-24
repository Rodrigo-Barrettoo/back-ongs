import { Request, Response } from 'express';
import CreateUserService from '../modules/user/services/CreateUserService';

class UserController {
  async create(request: Request, response: Response) {
    const { name, email, type, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
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
