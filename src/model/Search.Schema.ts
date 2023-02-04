import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema()
class Car {
  @Prop()
  search: string;

  @Prop()
  created_at: string;

  @Prop()
  type: string;

  @Prop()
  year: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
