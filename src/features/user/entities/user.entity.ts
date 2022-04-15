import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../../author/enums/role.enum';
import { Plan } from '../../../author/enums/plan.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Plan,
    default: Plan.Basic,
  })
  plan: Plan;

  @Column()
  apikey: string;

  @Column()
  clientId: string;

  @Column()
  paypalCustomerId: string;

  @Column({ nullable: true })
  monthlySubscriptionStatus?: string;
}
