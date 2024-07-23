
import { IsEmpty, IsNotEmpty } from 'class-validator';


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
    id: number;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    attributes: string;
    @IsNotEmpty()
    price: string; 
    @IsNotEmpty()
    provider: Provider | External; 
}


export enum Provider {
  LICENSED_STORE  = "licensed_store",
  AMATUE = 'amatuer'
}

export  enum External {
  MERCADO_LIVRE = 'mercado_livre',
  OLX = 'olx'
}