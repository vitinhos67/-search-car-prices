import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'car',
})
export class CarModel {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  search: string;

  @Column()
  type: string;

  @Column()
  year: number;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
