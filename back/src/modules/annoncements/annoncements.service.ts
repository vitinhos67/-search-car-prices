import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { AnnoncementsInterface } from 'src/interfaces/Annoucements.interface';
import { AnnoncementsModel } from 'src/model/Announcements.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AnnoncementsService {
  constructor(
    @InjectRepository(AnnoncementsModel) private readonly adModel: Repository<AnnoncementsModel>,
    private dataSource: DataSource
  ) {}

  async findAd(search: string) {
    try {
    // VOU TER CRIAR UM MODEL DE TAGS;
/*       const data = await this.adModel.find({
        tags: {
          $in: search,
        },
      }); */

      return [];
    } catch (error) {
      console.log(error);
    }
  }

  async createMany(annoncements: AnnoncementsModel[]) {
    const queryRunner = this.dataSource.createQueryRunner();
  
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      annoncements.forEach(async val => {
        await queryRunner.manager.save(val);
      })
  
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {

      await queryRunner.release();
    }
  }


}
