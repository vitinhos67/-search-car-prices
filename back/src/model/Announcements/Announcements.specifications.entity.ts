import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Annoncements } from './Base/Announcements.entity';

@Entity({
  name: 'annoncements_specifications',
})
export class AnnoncementsSpecifications {
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

  @OneToOne(() => Annoncements, annoncement => annoncement.id)
  @JoinColumn({ name: "annoncement_id" })
  annoncements: Annoncements;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deleted?: Date;
}
