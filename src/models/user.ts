import {Model, HydratedDocument} from "mongoose";
import db from 'src/config/mongo';

export interface IUser {
  username: string;
  password: string;
  email: string;
  verified: boolean;
  role: string;
  createdAt: Date;
}

interface IUserMethods {
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  register(username: string, password: string, email: string, verified?: boolean, role?: string): Promise<HydratedDocument<IUser, IUserMethods>>;
  verifyUserById(id: string): Promise<void>;
}


const UserSchema = new db.Schema<IUser, UserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verified: {
    type: Boolean,
  },
  role: {
    type: String,
  },
  createdAt: {
    type: Date,
  }
})

UserSchema.static('register', async function (username: string, password: string, email: string, verified: boolean = false, role: string = 'USER') {
  const user = await this.create({
    username,
    password,
    email,
    verified,
    role
  })
})

UserSchema.static('verifyUserById', async function (id: string) {
  const user = await this.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  user.verified = true;
  await user.save();
})

const UserModel = db.model<IUser, UserModel>('User', UserSchema);

export default UserModel;

