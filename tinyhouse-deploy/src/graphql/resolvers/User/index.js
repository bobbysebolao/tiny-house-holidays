"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../lib/utils");
exports.userResolvers = {
    Query: {
        user: (_root, { id }, { db, req }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const user = yield db.users.findOne({ _id: id });
                if (!user) {
                    throw new Error("user can't be found");
                }
                const viewer = yield utils_1.authorise(db, req);
                if (viewer && viewer._id === user._id) {
                    user.authorised = true;
                }
                return user;
            }
            catch (error) {
                throw new Error(`Failed to query user: ${error}`);
            }
        })
    },
    User: {
        id: (user) => {
            return user._id;
        },
        hasWallet: (user) => {
            return Boolean(user.walletId);
        },
        income: (user) => {
            return user.authorised ? user.income : null;
        },
        bookings: (user, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!user.authorised) {
                    return null;
                }
                const data = {
                    total: 0,
                    result: []
                };
                let cursor = yield db.bookings.find({
                    _id: { $in: user.bookings }
                });
                cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query user bookings: ${error}`);
            }
        }),
        listings: (user, { limit, page }, { db }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = {
                    total: 0,
                    result: []
                };
                let cursor = yield db.listings.find({
                    _id: { $in: user.listings }
                });
                cursor.skip(page > 0 ? (page - 1) * limit : 0);
                cursor = cursor.limit(limit);
                data.total = yield cursor.count();
                data.result = yield cursor.toArray();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to query user listings: ${error}`);
            }
        })
    }
};
