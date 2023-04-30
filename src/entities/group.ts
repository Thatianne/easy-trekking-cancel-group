import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import { Trekking } from './trekking';
import { GroupStatus } from './group-status';
import { TouristUserGroup } from './tourist-user-group';

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @ManyToOne(() => Trekking, (trekking) => trekking.id)
    trekking: Trekking;

    @ManyToOne(() => GroupStatus, (groupStatus) => groupStatus.id)
    groupStatus: GroupStatus;

    @ManyToMany(() => TouristUserGroup)
    tourists: TouristUserGroup[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ select: false })
    deletedAt?: Date;
}
