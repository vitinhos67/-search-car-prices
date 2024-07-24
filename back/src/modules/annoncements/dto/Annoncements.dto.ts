
import { IsEmpty, IsNotEmpty, IsNumber } from 'class-validator';


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
  @IsNumber()
  doors: number;
  @IsNotEmpty()
  @IsNumber()
  transmission: any;
  Annoucement: AnnoncementsDTO;

}    

export class AnnoncementsDTO {
    id: number;
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    attributes: string;
    @IsNotEmpty()
    price: string;
    @IsNotEmpty()
    status: string; 
    @IsNotEmpty()
    provider: Provider | External; 
    @IsNotEmpty()
    href_annoncements: string
    @IsNotEmpty()
    image_href: string

}


export enum Provider {
  LICENSED_STORE  = "licensed_store",
  AMATUE = 'amatuer'
}

export  enum External {
  MERCADO_LIVRE = 'mercado_livre',
  OLX = 'olx'
}