import { IResolvers } from "apollo-server-express";
import { Request } from "express";
import { ObjectId } from "mongodb";
import { Database, Listing, User } from "../../../lib/types";
import { authorise } from "../../../lib/utils";
import { ListingArgs, ListingBookingsArgs, ListingBookingsData } from "./types";

export const listingResolvers: IResolvers = {
    Query: {
        listing: async (_root: undefined, { id }: ListingArgs, { db, req }: { db: Database; req: Request }): Promise<Listing> => {
            try {
                const listing = await db.listings.findOne({ _id: new ObjectId(id) });
            if (!listing) {
                throw new Error("listing can't be found");
            }

            const viewer = await authorise(db, req);

            if (viewer && viewer._id === listing.host) {
                listing.authorised = true;
            }

            return listing;
            } catch (error) {
                throw new Error(`Failed to query listing: ${error}`);
            }
        }
    },
    Listing: {
        id: (listing: Listing): string => {
            return listing._id.toString();
        },
        host: async (
            listing: Listing,
            _args: {},
            { db }: { db: Database }
        ): Promise<User> => {
            const host = await db.users.findOne({ _id: listing.host});
            if (!host) {
                throw new Error("host can't be found");
            }
            return host;
        },
        bookingsIndex: (listing: Listing): string => {
            return JSON.stringify(listing.bookingsIndex);
        },
        bookings: async (listing: Listing, { limit, page}: ListingBookingsArgs, { db }: { db: Database }): Promise<ListingBookingsData | null> => {
            try {
                if (!listing.authorised) {
                    return null;
                }

                const data: ListingBookingsData = {
                    total: 0,
                    result: []
                }

                let cursor = await db.bookings.find({
                    _id: { $in: listing.bookings }
                });

                cursor.skip(page > 0 ? (page - 1) * limit : 0)
                cursor = cursor.limit(limit);

                data.total = await cursor.count();
                data.result = await cursor.toArray();

                return data;
            } catch (error) {
                throw new Error(`Failed to query listing bookings: ${error}`)
            }
        }
    }
};