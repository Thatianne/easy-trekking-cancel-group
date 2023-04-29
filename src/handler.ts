import * as dotenv from 'dotenv';
dotenv.config();

import { In } from "typeorm";
import { AppDataSource } from './database/configuration/db-data-source';
import { Trekking } from './entities/trekking';
import { Group } from "./entities/group";
import { TouristUserGroup } from "./entities/tourist-user-group";
import { GroupStatus } from "./entities/group-status";
import { GroupStatusEnum } from "./enums/group-status.enum"

const shouldCancelGroup = (group: Group, today: Date): boolean => {
  const dueDate = new Date(group.date);
  dueDate.setDate(group.date.getDate() - group.trekking.daysFormGroup);

  dueDate.setHours(0, 0, 0, 0);

  return today >= dueDate;
}

const myHandler = async () => {
  const groupRepository = AppDataSource.getRepository(Group);
  const touristUserGroupRepository = AppDataSource.getRepository(TouristUserGroup);

  const groups = await groupRepository.find({
      where: {
        groupStatus: {
          id: In([GroupStatusEnum.WaitingTourist, GroupStatusEnum.WaitingTouristGuide])
        }
      },
      relations: {
        groupStatus: true,
        trekking: true
      }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const groupsToBeCanceled = groups.filter((group) => shouldCancelGroup(group, today));

    const cancelStatus = new GroupStatus();
    cancelStatus.id = GroupStatusEnum.Canceled
    groupsToBeCanceled.forEach((group) => group.groupStatus = cancelStatus);

    await groupRepository.save(groupsToBeCanceled);
}

// Database connection
AppDataSource.initialize()
  .then(() => {
    myHandler(); // test locally
  })

module.exports.handler = myHandler