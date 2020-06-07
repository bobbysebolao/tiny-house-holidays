"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = __importStar(require("lodash"));
const Booking_1 = require("./Booking");
const Listing_1 = require("./Listing");
const User_1 = require("./User");
const Viewer_1 = require("./Viewer");
exports.resolvers = lodash.merge(Booking_1.bookingResolvers, Listing_1.listingResolvers, User_1.userResolvers, Viewer_1.viewerResolvers);
