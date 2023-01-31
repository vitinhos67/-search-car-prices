import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ResearchListDocument = HydratedDocument<ResearchList>;

@Schema()
class ResearchList {
  @Prop({ type: Object })
  data: object;

  @Prop({
    type: Date,
    default: Date.now(),
  })
  created_at: Date;

  @Prop({
    type: Array,
  })
  tags: [];
}

export const ResearchListSchema = SchemaFactory.createForClass(ResearchList);
