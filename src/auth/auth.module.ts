import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtSrategy } from './strategy/jwt.strategy';
@Module({
  imports: [UsersModule,DatabaseModule,JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' }
  })],
  providers: [AuthService,LocalStrategy,JwtSrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
