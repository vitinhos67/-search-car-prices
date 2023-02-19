import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnnoncementsInterface } from 'src/interfaces/Annoucements.interface';

@Injectable()
export class AnnoncementsService {
  constructor(
    @InjectModel('announcements') private adModel: Model<AnnoncementsInterface>
  ) {}

  async findAd(search: string) {
    try {
      const data = await this.adModel.find({
        tags: {
          $in: search,
        },
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
