import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskService } from "./task.service";


@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
    }

    @Get(':id')
    findone (@Param('id') id : number){
        return this.taskService.findOne(id)
    }
}