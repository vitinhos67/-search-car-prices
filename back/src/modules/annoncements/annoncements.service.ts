import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntitySchema, EntityTarget, Repository } from 'typeorm';
import { AnnoncementsDTO, AnnoncementsSpecficationsDTO } from './dto/Annoncements.dto';
import { Annoncements } from 'src/model/Announcements/Base/Announcements.entity';
import { AnnoncementsSpecifications } from 'src/model/Announcements/Announcements.specifications.entity';

@Injectable()
export class AnnoncementsService {
  constructor(
    @InjectRepository(Annoncements)
    private readonly adModel: Repository<Annoncements>,
    @InjectRepository(AnnoncementsSpecifications)
    private readonly adSpecificationsModel: Repository<AnnoncementsSpecifications>,
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

  async createMany(annoncements: Annoncements[]) {
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
          ]
        }
      } 
    } finally {
      await queryRunner.release();
    }
  }

  async create(annoncements: AnnoncementsDTO, annoncementsSpecfications: AnnoncementsSpecficationsDTO) {
    try {
    const createdAnnouncement = new Annoncements();
    this.setAnnoncements(createdAnnouncement, annoncements);
    await this.adModel.save(createdAnnouncement);
    const createSpecifications = new AnnoncementsSpecifications();
    this.setAnnoncementsSpecifications(createSpecifications, annoncementsSpecfications, createdAnnouncement);
    await this.adSpecificationsModel.save(createSpecifications);
      
      delete createSpecifications.annoncements;
      delete createSpecifications.deleted;
      delete createdAnnouncement.deletedAt;
      return {
        success: true,
        data: {
          ...createdAnnouncement,
          ...createSpecifications,
        }
      }
    } catch(err) {
      console.log(err);
      return {
        success: false,
        'error-codes': [
          'internal_server_error'
        ]
      }
    }
  }

  private setAnnoncements(createdAnnouncement, annoncements) {
    createdAnnouncement.title = annoncements.title;
    createdAnnouncement.price = annoncements.price;
    createdAnnouncement.attributes = annoncements.attributes;
    createdAnnouncement.href_annoncements = annoncements.href_annoncements;
    createdAnnouncement.image_href = annoncements.image_href;
    createdAnnouncement.provider = annoncements.provider;
    return createdAnnouncement;
  }

  private setAnnoncementsSpecifications(createSpecifications, val, annoncement) {
    createSpecifications.engine = val.engine;
    createSpecifications.transmission = val.transmission;
    createSpecifications.color = val.color;
    createSpecifications.fuel_type = val.fuel_type;
    createSpecifications.seats = val.seats;
    createSpecifications.doors = val.doors;
    createSpecifications.annoncements = annoncement;
    return createSpecifications;
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
