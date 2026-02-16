import { Schema, model } from 'mongoose';

export const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    photo: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const contactscollection = model('contacts', contactSchema);
