import { Injectable } from '@nestjs/common';
import { Client } from 'src/config/redis.connection';
import { uniqueID } from 'src/common/utils/generateRandomID';

@Injectable()
export class CacheService {
  async setSearch(searchArray: string[], dataSearch): Promise<void> {
    const id = uniqueID();

    searchArray.forEach(async (value) => {
      await Client.set(`search:${value}:${id}`, dataSearch);
    });
  }

  async getSearch(searchArray: string[]): Promise<string[]> {
    const data: string[] = [];
    for (let i = 0; i < searchArray.length; i++) {
      const response = await Client.get(`search:${searchArray[i]}`);
      if (response) data.push(response);
    }
    return data;
  }
}
