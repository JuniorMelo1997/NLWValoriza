import { getCustomRepository } from 'typeorm'

import { User } from '../entities/User'
import { UsersRepositories } from '../repositories/UsersRepositories'
import { hash } from "bcryptjs"

export interface UserRequest {
  name: string
  email: string
  password: string
  admin?: boolean
}

export class CreateUserService {
  private readonly userRepository = getCustomRepository(UsersRepositories)

  async execute(data: UserRequest): Promise<User> {
    const { name, email, password, admin = false } = data

    if (!email){
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await this.userRepository.findOne({ email })

    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const hashPassword = await hash(password, 8);

    const user = this.userRepository.create({ name, email, password: hashPassword, admin })

    await this.userRepository.save(user)

    return user
  }
}