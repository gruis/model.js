import User from './user';
import { Media } from './media';
import Model from '@/model';

const oneof = (...allowed) => {
  return class extends Model {
    constructor (value) {
      super(value);
      if (!allowed.includes(value)) {
        throw new Error(`'${value}' is not one of ${allowed.join(", ")}`);
      }
      this.value = value;
    }

    valueOf () {
      return this.value;
    }
  };
};

export default class Memory extends Model {
  attributes () {
    return {
      id: Number,
      title: String,
      body: String,
      date: Date,
      author: User,
      status: oneof("draft", "review", "reject", "publish"),
      reviewer: User,
      created_at: Date,
      updated_at: Date,
      media: Media
    };
  }
};
