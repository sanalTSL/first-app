import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { UserModel } from './models/user.model';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
  private users: UserModel[] = [
    {
      id: '20',
      name: 'Sanal',
      email: 'sanal@gmail.com',
    },
  ];
  findAll() {
    return this.users;
  }
  findOne(id: string) {
    if (id === '0') {
      throw new Error('All Others errors that can happen while runtime'); // Automaticallly handled by Nest and Sends Internal Server Error (500)
      // throw new HttpException(
      //   `ID not acceptable it's ${id}!!`,
      //   HttpStatus.NOT_ACCEPTABLE,
      // );
      //OR
      throw new NotAcceptableException(`ID not acceptable it's ${id}!!`); // Another way of throwing NotAccaptable by NestJS
    }
    return this.users[0];
  }
  createOne(userDto: UpdateUserDto) {
    const user = this.users[0];
    user.name = userDto.name;
    user.email = userDto.email;
    user.id = this.users[this.users.length - 1].id + 1;
    this.users.push(user);
    return 'Success';
  }
  updateOne(id: string, userDto: UpdateUserDto) {
    const user = this.users[0];
    user.name = userDto.name;
    user.email = userDto.email;
    return user;
  }
  removeOne(id: string) {
    this.users.pop();
  }
}
