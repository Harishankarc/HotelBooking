import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly databseService: DatabaseService){}

  async register(userData: Prisma.UsersCreateInput){
    try{
      const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    const user = await this.databseService.users.create({
      data:{
        email : userData.email,
        password: hashedPassword,
        name: userData.name
      }
    })
    return user;
    }catch(err){
      throw new HttpException("Cannot create user",HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
