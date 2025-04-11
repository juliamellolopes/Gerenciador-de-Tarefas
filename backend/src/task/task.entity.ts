import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: Priority })
  priority: Priority;

  @Column({ default: false })
  completed: boolean;
}
