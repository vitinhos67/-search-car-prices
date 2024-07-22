
import { IsNotEmpty } from 'class-validator';

export class AnnoncementsSpecficationsDTO {
  @IsNotEmpty()
  engine: string;
  @IsNotEmpty()
  color: string;
  @IsNotEmpty()
  fuel_type: string;
  @IsNotEmpty()
  seats: number;
  @IsNotEmpty()
  doors: number;
}    

export class AnnoncementsDTO extends AnnoncementsSpecficationsDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    attributes: string;
    @IsNotEmpty()
    price: string;  
}