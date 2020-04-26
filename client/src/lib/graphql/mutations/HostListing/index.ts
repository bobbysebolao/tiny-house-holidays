import { gql } from "apollo-boost";

export const HOST_LISTINGS = gql`
mutation HostListing($input: HostListingInput!) {
    hostListing(input: $input) {
        id
    }
}
`;