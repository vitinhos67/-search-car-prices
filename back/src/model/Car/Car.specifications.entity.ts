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
  color: number;
  @Column({
    nullable: true,
  })
  fuel_type: number;
  @Column({
    nullable: true,
  })
  seats: number;

  @OneToOne(() => CarModel, (car) => car.id)
  car: CarModel;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
