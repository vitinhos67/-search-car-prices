import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnnoncementsModel } from 'src/model/Announcements.entity';
import { DataSource, Repository } from 'typeorm';
import { AnnoncementsDTO } from './dto/Annoncements.dto';

@Injectable()
export class AnnoncementsService {
  constructor(
    @InjectRepository(AnnoncementsModel)
    private readonly adModel: Repository<AnnoncementsModel>,
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
      const data = await this.adModel.save(annoncements);
      return {
        success: true,
        data: data
      }
    } catch(err) {
      return {
        success: false,
        'error-codes': [
          'internal_server_error'
        ],
        message: err.getMessage()
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
