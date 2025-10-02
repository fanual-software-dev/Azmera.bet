import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt'
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(data: Partial<User>) {
    try {
      if (!data || !data.phoneNumber) {
        throw new BadRequestException('Please provide a phone number');
      }

      const userExists = await this.userModel.findOne({ phoneNumber: data.phoneNumber });

      if (userExists) {
        throw new BadRequestException('User already exists with this phone number');
      }

      const hashedPassword = await bcrypt.hash(data.password!, 10);
      const user = new this.userModel({ ...data, password: hashedPassword });

      return user.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
  const user = await this.userModel.findById(id).exec();
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}
}
