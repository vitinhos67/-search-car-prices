import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'car_model',
})
export class CarModelModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  model: string;

  @Column()
  id_brand: number;

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
