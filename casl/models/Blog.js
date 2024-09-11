import { accessibleRecordsPlugin } from '@casl/mongoose';
import mongoose, { Schema } from 'mongoose';

export const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  _authorId: { type: mongoose.Types.ObjectId, required: true },
});

BlogSchema.plugin(accessibleRecordsPlugin);

export const Blog = mongoose.model('Blog', BlogSchema);
