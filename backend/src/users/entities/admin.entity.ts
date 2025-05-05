import { ChildEntity } from 'typeorm';
import { User } from './user.entity';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
@ChildEntity()
export class Admin extends User {}
