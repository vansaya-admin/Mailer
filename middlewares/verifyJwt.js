import jwt from "jsonwebtoken";
import { Admin } from "../model/admin.model.js";

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);
        if (!admin) {
            return res.status(401).json({message: "Unauthorized to access this route"});
        }
        const {_id, email, ...others} = admin._doc;
        req.user = {id: _id, email};
        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            error.message = "Token expired! Please login again";
            error.status = 401;
        } else if (error.name === "JsonWebTokenError") {
            error.message = "Invalid token";
            error.status = 401;
        }
        return res.status(error.status || 500).json({error: error.message});
    }
};