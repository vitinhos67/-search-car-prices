import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { CarModel } from './Car.entity';

@Entity({
  name: 'car',
})
export class CarSpecificationsModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  engine: string;

  @Column({
    nullable: true,
  })
  transmission: string;

  @Column({
    nullable: true,
  })
  color: string;
  @Column({
    nullable: true,
  })
  fuel_type: string;
  @Column({
    nullable: true,
  })
  seats: string;

  @Column({
    nullable: true,
  })
  doors: number;

  @OneToOne(() => CarModel, (car) => car.id)
  car: CarModel;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
