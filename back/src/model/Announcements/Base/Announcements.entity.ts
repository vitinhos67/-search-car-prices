import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AnnoncementsSpecifications } from '../Announcements.specifications.entity';

@Entity({
  name: 'annoncements',
})
export class Annoncements {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  price: string;

  @Column()
  attributes: string;

  @Column()
  status: string;

  @Column({
    nullable: true,
  })
  href_annoncements: string;

  @Column({
    nullable: true,
  })
  image_href: string;

  @OneToOne(() => AnnoncementsSpecifications, { cascade: true })
  specifications: AnnoncementsSpecifications;

  @Column()
  provider: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}