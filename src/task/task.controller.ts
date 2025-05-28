import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskService } from "./task.service";


@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
    }
}