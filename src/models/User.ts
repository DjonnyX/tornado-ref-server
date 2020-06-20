import * as mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import * as bcrypt from "bcrypt";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    isAdmin: Boolean
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

const hashPassword = async (password: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error(`Hashing failed. ${error}`);
    }
};

const checkIfUnencryptedPasswordIsValid = (unencryptedPassword: string, password: string): boolean => {
    return bcrypt.compareSync(unencryptedPassword, password);
};

export { UserSchema, UserModel, IUser, hashPassword, checkIfUnencryptedPasswordIsValid };