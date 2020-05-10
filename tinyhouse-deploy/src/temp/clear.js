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
require("dotenv").config();
const database_1 = require("../src/database");
const clear = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("[clear] : running...");
        const db = yield database_1.connectDatabase();
        const bookings = yield db.bookings.find({}).toArray();
        const listings = yield db.listings.find({}).toArray();
        const users = yield db.users.find({}).toArray();
        if (bookings.length > 0) {
            yield db.bookings.drop();
        }
        if (listings.length > 0) {
            yield db.listings.drop();
        }
        if (users.length > 0) {
            yield db.users.drop();
        }
        console.log("[clear] : success");
    }
    catch (_a) {
        throw new Error("failed to clear database");
    }
});
clear();
