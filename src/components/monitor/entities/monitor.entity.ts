import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Monitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apikey: string;

  @Column({ default: 0 })
  requestSuccess: number;

  @Column({ default: 0 })
  requestTotal: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  time: Date;
}
