import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Courier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  pattern: string;

  @Column()
  display_name: string;

  @Column()
  host: string;

  @Column()
  logo: string;

  @Column()
  phone: string;
}
