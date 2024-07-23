import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AnnoncementsDTO } from './dto/Annoncements.dto';
import { AnnoncementsModel } from 'src/model/Announcements/Base/Announcements.entity';
import { AnnoncementsSpecificationsModel } from 'src/model/Announcements/Announcements.specifications.entity';

@Injectable()
export class AnnoncementsService {
  constructor(
    @InjectRepository(AnnoncementsModel)
    private readonly adModel: Repository<AnnoncementsModel>,
    @InjectRepository(AnnoncementsModel)
    private readonly adSpecificationsModel: Repository<AnnoncementsSpecificationsModel>,
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
      annoncements.forEach(async (val) => {
        await queryRunner.manager.save(val);
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if(err) {
        return {
          success: false,
          'error-codes': [
            'internal_server_error'
          ],
          message: err.getMessage()
        }
      } 
    } finally {
      await queryRunner.release();
    }
  }

  async create(annoncements: AnnoncementsDTO) {
    try {

      const createdAnnouncement = this.adModel.create(annoncements);
      const saved_ad = await this.adModel.save(createdAnnouncement);
      const saved_ad_specifications = await this.adSpecificationsModel.create(annoncements);

      delete saved_ad_specifications.id;
      return {
        success: true,
        data: {
          ...saved_ad,
          ...saved_ad_specifications
        }
      }
    } catch(err) {
      return {
        success: false,
        'error-codes': [
          'internal_server_error'
        ]
      }
    }
  }

  async showById(id: number) {
    try {
      const data = await this.adModel.findOneBy({
        id: id,
      });
      if(!data) {
        return {
          success: false,
          'error-codes': [
            'not_result_found'
          ]
        }
      }
      return {
        success: true,
        data: data
      };
    } catch (error) {
      if(error) {
        return {
          success: false,
          'error-codes': [
            'internal_server_error'
          ],
          message: error.getMessage()
        }
      } 
    } 
  }

  async deleteById(id: number) {
    try {
      const data = await this.adModel.findOneBy({
        id: id,
      });
      if(!data) {
        return {
          success: false,
          'error-codes': [
            'not_result_found'
          ]
        }
      }
      const response = await this.adModel.softRemove(data);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      if(error) {
        return {
          success: false,
          'error-codes': [
            'internal_server_error'
          ],
          message: error.getMessage()
        }
      } 
    } 
  }

}
