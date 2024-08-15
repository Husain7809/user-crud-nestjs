import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const isExitsEmail = await this.usersRepository.count({ where: { email: createUserDto.email.trim() } })
      if (isExitsEmail) {
        throw new BadRequestException("This email is already in used.")
      }
      await this.usersRepository.save(createUserDto);
      return {
        status: true,
        statusCode: HttpStatus.CREATED,
        message: "User created successfully",
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findAll() {
    try {
      const result = await this.usersRepository.find();
      return {
        status: true,
        statusCode: HttpStatus.ACCEPTED,
        message: "User fetched successfully",
        data: result
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.usersRepository.find({ where: { id } });
      return {
        status: true,
        statusCode: HttpStatus.ACCEPTED,
        message: "User fetched successfully",
        data: result
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } })
      if (!user) {
        throw new BadRequestException("User not found")
      }
      user.firstName = updateUserDto.firstName || user.firstName
      user.lastName = updateUserDto.lastName || user.lastName
      user.email = updateUserDto.email || user.email
      user.gender = updateUserDto.gender || user.gender
      user.status = updateUserDto.status ?? user.status

      await this.usersRepository.save(user);
      return {
        status: true,
        statusCode: HttpStatus.ACCEPTED,
        message: "User updated successfully"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete({ id });
      return {
        status: true,
        statusCode: HttpStatus.ACCEPTED,
        message: "User deleted successfully"
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }
}
