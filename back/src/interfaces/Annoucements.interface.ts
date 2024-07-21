export interface AnnoncementsInterface {
  title: string;
  price: string;
  status: string;
  attributes: string;
  href_annoncements: string;
  image_href: string;
  provider: Providers;
}

export enum statusAD {
  ATIVO = 'ATIVO',
  ENCERRADO = 'ENCERRADO',
}

export enum Providers {
  MERCADO_LIVRE = 'mercado_livre',
}
