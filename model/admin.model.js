import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

export const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (v) {
                return validator.isStrongPassword(v, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0,
                });
            }
        }
    },
    isSuperAdmin: {
        type: Boolean,
        default: false
    },
    otpToken: {
        type: String
    },
    otpExpires: {
        type: Date
    }
}, {
    timestamps: true
});

export const Admin = mongoose.model("Admin", adminSchema);