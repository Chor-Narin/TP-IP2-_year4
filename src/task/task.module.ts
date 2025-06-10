import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../modules/task/entity/task.entity';
import { TaskService } from './task.service';
import { UserModule } from 'src/user/user.module';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
  // Add any other necessary configurations or modules
})
export class TaskModule {}