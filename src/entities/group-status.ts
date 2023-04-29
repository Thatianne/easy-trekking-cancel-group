import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GroupStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;
}
