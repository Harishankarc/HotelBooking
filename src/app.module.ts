import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { DatabaseModule } from './database/database.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [RoomModule, DatabaseModule, BookingModule, AuthModule, UsersModule],
  controllers: [AppController,UsersController],
  providers: [AppService, UsersService ],
})
export class AppModule {}
