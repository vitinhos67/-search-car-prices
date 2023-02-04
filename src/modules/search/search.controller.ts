import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './services/search.service';

@Controller('/api/v1/search')
export class SearchController {
  constructor(private readonly serviceSearch: SearchService) {}

  @Get()
  async search(@Query('q') query: string): Promise<any[] | unknown> {
    return await this.serviceSearch.search(query);
  }
}
