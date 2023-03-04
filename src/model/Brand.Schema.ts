import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarBrandDocument = HydratedDocument<CarBrand>;

@Schema()
class CarBrand {
  @Prop({
    type: Number,
    unique: true,
  })
  id: number;

  @Prop({
    type: String,
    unique: true,
  })
  brand: string;

  @Prop({
    type: Boolean,
  })
  @Prop()
  type: string;

  @Prop()
  visited: boolean;

  @Prop({
    type: Date,
  })
  updated: Date;
}

export const CarBrandSchema = SchemaFactory.createForClass(CarBrand);
