import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService
  ){}

  async validateUser(email: string, password : string): Promise<any>{
    try{
      const user = await this.databaseService.users.findUnique({
        where:{
          email: email
        }
      })
      if(!user){
        return null;
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword){
        return null;
      }
      const { password: _ , ...result} = user;
      return result
    }catch(err){
      throw new UnauthorizedException("Credentials are not valid!")
    }
  }

  async login(user: any) : Promise<any>{
    try{
      const payload = {
        email: user.email,
        sub: user.id
      }
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload,{expiresIn: '7d'});

      await this.databaseService.users.update({
        where:{
          id: user.id,
        },
        data:{
          refreshToken : refreshToken
        }
      })

      return {
        "access_token" : accessToken,
        "refresh_token" : refreshToken
      }
    }catch(e){
      throw new UnauthorizedException("Credentials are not valid!")
    }
  }

  async refresh(refresh_token: string): Promise<any>{
    try{
      const payload = this.jwtService.verify(refresh_token);
      const user = await this.databaseService.users.findUnique({
        where:{
          id: payload.sub
        }
      })
      if (!user || user.refreshToken !== refresh_token) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.jwtService.sign({
        email: user.email,
        sub: user.id

      },{
        expiresIn: '1d'
      });

      return { access_token: newAccessToken };
    }catch(e){
      throw new UnauthorizedException("Refresh token expired or invalid")
    }
  }


}
