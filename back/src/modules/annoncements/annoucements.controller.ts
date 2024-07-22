import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AnnoncementsService } from 'src/modules/annoncements/annoncements.service';
import { AnnoncementsDTO } from './dto/Annoncements.dto';

@Controller('/api/v1/annoncements')
export class AnnoncementsController {
  constructor(private readonly annoncementsService: AnnoncementsService) {}

  @Post()
  create(@Body() annoncements: AnnoncementsDTO): any {
    return this.annoncementsService.create(annoncements);
  }
}
