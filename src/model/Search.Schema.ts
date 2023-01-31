import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema()
class Car {
  @Prop({ type: String })
  search: string;

  @Prop()
  created_at: string;

  @Prop()
  type: string;

  @Prop()
  year: number;

  @Prop()
  color: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
