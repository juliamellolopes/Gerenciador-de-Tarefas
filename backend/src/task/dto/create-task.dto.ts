import { Priority } from '../task.entity';

export class CreateTaskDto {
  title: string;
  description?: string;
  dueDate: Date;
  priority: Priority;
}
