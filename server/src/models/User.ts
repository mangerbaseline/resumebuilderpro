import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'user' | 'admin';
    oauthProvider?: 'google' | 'local';
    oauthId?: string;
    isSubscribed: boolean;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        oauthProvider: { type: String, enum: ['google', 'local'], default: 'local' },
        oauthId: { type: String },
        isSubscribed: { type: Boolean, default: false },
        stripeCustomerId: { type: String },
        stripeSubscriptionId: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
