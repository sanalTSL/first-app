import {
  Body,
  Controller,
  Delete,
  Get, HttpCode, HttpException, HttpStatus,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { UserService } from './user.service';
import { UpdateUserDto } from "./dto/updateUserDto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getControllerName() {
    return 'User Controller';
  }

  @Get('getAllUsersWithPagination')
  findAllUsersWithPagination(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `All Users from ${limit} to ${offset}`;
  }

  @Get('getAllUsers')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    this.userService.findOne(id);
    return `id: ${id}`;
  }

  @Post('createUser')
  createUser(@Body() userDto: UpdateUserDto) {
    return this.userService.createOne(userDto);
  }

  @Post('postReq')
  postRequest(@Body('name') userDetails) {
    return 'this takes only name field from body eg: ' + userDetails;
  }

  @Patch(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  updateUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateOne(id, userDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return this.userService.removeOne(id);
  }
}
