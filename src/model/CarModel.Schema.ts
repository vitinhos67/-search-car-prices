import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarModelDocument = HydratedDocument<CarModel>;

@Schema()
class CarModel {
  @Prop()
  model: string;

  @Prop()
  id: string;

  @Prop()
  id_brand: string;

  @Prop()
  type: string;

  @Prop()
  visited: boolean;

  @Prop({
    default: 0,
  })
  updated: Date;
}

export const CarModelSchema = SchemaFactory.createForClass(CarModel);
