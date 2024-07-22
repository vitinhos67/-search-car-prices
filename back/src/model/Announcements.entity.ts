import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({
  name: 'annoncements',
})
export class AnnoncementsModel {
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

  @Column()
  provider: string;

  @CreateDateColumn()
  created!: Date;

  @UpdateDateColumn()
  updated!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
