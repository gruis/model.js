import Model from '@/model';
export default class User extends Model {
  attributes () {
    return {
      id: Number,
      username: String,
      fullname: String,
      email: String,
      provider: String,
      confirmed: Boolean,
      blocked: Boolean,
      role: Number,
      created_at: Date,
      updated_at: Date
    };
  }
};
