import { Request } from "express";
import { IResolvers } from "apollo-server-express";
import { Database, User } from "../../../lib/types";
import { authorise } from "../../../lib/utils";
import { UserArgs, UserBookingsArgs, UserBookingsData, UserListingsArgs, UserListingsData } from "./types";

export const userResolvers: IResolvers = {
    Query: {
        user: async (
            _root: undefined,
            { id }: UserArgs,
            { db, req }: { db: Database, req: Request }
        ): Promise<User> => {
            try {
                const user = await db.users.findOne({ _id: id });

                if (!user) {
                    throw new Error("user can't be found");
                }

                const viewer = await authorise(db, req);
                if (viewer && viewer._id === user._id) {
                    user.authorised = true;
                }

                return user
            } catch (error) {
                throw new Error(`Failed to query user: ${error}`);
            }
        }
    },
    User: {
        id: (user: User): string => {
            return user._id;
        },
        hasWallet: (user: User): boolean => {
            return Boolean(user.walletId);
        },
        income: (user: User): number | null => {
            return user.authorised ? user.income : null;
        },
        bookings: async (user: User, { limit, page}: UserBookingsArgs, { db }: { db: Database }): Promise<UserBookingsData | null> => {
            try {
                if (!user.authorised) {
                    return null;
                }

                const data: UserBookingsData = {
                    total: 0,
                    result: []
                }

                let cursor = await db.bookings.find({
                    _id: { $in: user.bookings }
                });

                cursor.skip(page > 0 ? (page - 1) * limit : 0)
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();

                return data;
            } catch (error) {
                throw new Error(`Failed to query user bookings: ${error}`)
            }
        },
        listings: async (user: User, { limit, page}: UserListingsArgs, { db }: { db: Database }): Promise<UserListingsData | null> => {
            try {
                const data: UserListingsData = {
                    total: 0,
                    result: []
                }

                let cursor = await db.listings.find({
                    _id: { $in: user.listings }
                });

                cursor.skip(page > 0 ? (page - 1) * limit : 0)
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();

                return data;
            } catch (error) {
                throw new Error(`Failed to query user listings: ${error}`)
            }
        }
    }
}