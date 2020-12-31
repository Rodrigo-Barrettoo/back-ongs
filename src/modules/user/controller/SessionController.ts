import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userAuthenticate = container.resolve(AuthenticateUserService);

    const { token, user } = await userAuthenticate.execute({
      email,
      password,
    });

    return response.json({
      user: classToClass(user),
      token,
    });
  }
}

export default new SessionController();
