import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AnnoncementsDocument = HydratedDocument<Annoncements>;

@Schema()
class Annoncements {
  @Prop()
  title: string;

  @Prop()
  price: string;

  @Prop()
  attributes: string;

  @Prop({
    default: '',
  })
  color: string;

  @Prop()
  status: string;

  @Prop()
  href_annoncements: string;

  @Prop()
  image_href: string;

  @Prop()
  Provider: string;
}

export const AnnoncementsSchema = SchemaFactory.createForClass(Annoncements);
