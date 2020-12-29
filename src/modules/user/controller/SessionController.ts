import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userAuthenticate = container.resolve(AuthenticateUserService);

    const { token, user } = await userAuthenticate.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({
      user,
      token,
    });
  }
}

export default new SessionController();
