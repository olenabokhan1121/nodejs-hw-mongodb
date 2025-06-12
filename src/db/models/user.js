import { model, Schema } from 'mongoose';
//import { ROLES } from '../../constants/index.js';
const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    /*role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },*/
  },
  { timestamps: true, versionKey: false },
);
usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
export const User = model('User', usersSchema);
