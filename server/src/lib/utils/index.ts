import { Request } from "express";
import { Database, User } from "../types";

export const authorise = async (db: Database, req: Request): Promise<User | null> => {
    const token = req.get("X-CSRF-TOKEN");
    const viewer = await db.users.findOne({
        _id: req.signedCookies.viewer,
        token
    });

    console.log("the token: ", token);
    console.log("the viewer: ", viewer);

    return viewer;
}