import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnnoncementsService } from 'src/modules/annoncements/annoncements.service';
import { AnnoncementsDTO, AnnoncementsSpecficationsDTO } from './dto/Annoncements.dto';

@Controller('/api/v1/annoncements')
export class AnnoncementsController {
  constructor(private readonly annoncementsService: AnnoncementsService) {}

  @Post()
  create(@Body() annoncements: AnnoncementsDTO, @Body() annoncementsSpecfications: AnnoncementsSpecficationsDTO): any {
    return this.annoncementsService.create(annoncements, annoncementsSpecfications);
  }

  @Get(':id')
  showById(@Param('id') id: number): any {
    return this.annoncementsService.showById(id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): any {
    return this.annoncementsService.deleteById(id);
  }
}
