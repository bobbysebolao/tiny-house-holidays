import * as lodash from "lodash";
import { bookingResolvers } from "./Booking";
import { listingResolvers } from "./Listing";
import { userResolvers } from "./User";
import { viewerResolvers } from "./Viewer";

export const resolvers = lodash.merge(bookingResolvers,listingResolvers, userResolvers, viewerResolvers);
