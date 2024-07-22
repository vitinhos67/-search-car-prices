import { IsEmail, IsEmpty, IsNotEmpty } from "class-validator";

export class AnnoncementsDTO {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    price: string;
    @IsNotEmpty()
    attributes: string;
    @IsEmpty()
    href_annoncements: string;
  }