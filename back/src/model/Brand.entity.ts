import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';
import { AnnoncementsModel } from './Announcements/Base/Announcements.entity';

@Entity({
  name: 'car_brand',
})
export class CarBrandModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: String,
    unique: true,
  })
  brand: string;

  @Column({
    type: Boolean,
  })
  @Column()
  type: string;

  @Column()
  visited: boolean;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
