import { Collection, ObjectId } from "mongodb";

export interface Viewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}

// enum is a special Typescript type that lets you limit the values that a collection property can have to ones that you define.
export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE"
}

export interface BookingsIndexMonth {
  [key: string]: boolean;
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth;
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear;
}

export interface Booking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

// Note 1: the 'admin' property of Listing refers to a US state/province. We call it this to match how the data is called in the GeoJSON data we'll get back from an API call.

//Note 2: The 'bookingsIndex' property consists of an object (BookingsIndexYear) containing another object (BookingsIndexMonth). Nested objects are the simplest way to deal with MongoDB queries to check booking dates to make sure that users cannot book a listing on a date when it has already been booked.
export interface Listing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: ListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: BookingsIndex;
  price: number;
  numOfGuests: number;
  authorised?: boolean;
}

// There is a one to many relationship between the User collection and the Bookings and Listings collections. In the User interface definition, the 'bookings' and 'listing' fields take an array of values.
export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
  authorised?: boolean;
}

export interface Database {
  bookings: Collection<Booking>;
  listings: Collection<Listing>;
  users: Collection<User>;
}
