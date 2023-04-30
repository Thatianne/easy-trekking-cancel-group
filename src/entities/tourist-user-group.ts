import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import { Group } from './group';

@Entity()
export class TouristUserGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Group)
    group: Group;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt?: Date;
}
