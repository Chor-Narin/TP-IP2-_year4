import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/modules/task/entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  create(taskData: Partial<Task>) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }

  findAll() {
    return this.tasksRepo.find({
      select: ['id', 'name', 'description', 'completedAt'],
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const task = await this.tasksRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateData: Partial<Task>) {
    await this.tasksRepo.update(id, updateData);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}