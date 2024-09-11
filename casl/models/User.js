import { accessibleRecordsPlugin } from '@casl/mongoose';
import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'blogger'], required: true },
  },
  {
    methods: {
      verifyPassword: (p1, p2) => {
        return p1 == p2;
      },
    },
  }
);

UserSchema.plugin(accessibleRecordsPlugin);

export const User = mongoose.model('User', UserSchema);
