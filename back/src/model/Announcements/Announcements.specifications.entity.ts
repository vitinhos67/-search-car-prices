import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { AnnoncementsModel } from './Base/Announcements.entity';

@Entity({
  name: 'annoncements_specifications',
})
export class AnnoncementsSpecificationsModel {
  @PrimaryGeneratedColumn()
  id: number;

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
  seats: number;

  @Column({
    nullable: true,
  })
  doors: number;

  @OneToOne(() => AnnoncementsModel, (ad) => ad.id)
  annoncements: AnnoncementsModel;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
