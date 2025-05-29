import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

 async create(userId: number, taskData: Partial<Task>): Promise<Task> {
  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) throw new Error(`User not found`);

  const task = this.tasksRepo.create({
    ...taskData,
    user,
  });

  return await this.tasksRepo.save(task);
}


  findAll() {
    return this.tasksRepo.find({
      select: ['id', 'name', 'description', 'completedAt'],
      relations: ['user'],
    });
  }

  findOne(id: number) {
    return this.tasksRepo.findOne({
      where: { id },
      select: ['id', 'name', 'description', 'completedAt'],
      relations: ['user'],
    });
  }

  async update(id: number, updateData: Partial<Task>) {
    try{
      await this.tasksRepo.update(id, updateData);
      return this.findOne(id);
    }catch (error) {
      throw new Error(`Error updating task with id ${id}: ${error.message}`);
    } 
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}