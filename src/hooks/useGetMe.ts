import { useQuery } from "@apollo/client";
import { User } from "../models/User";
import { graphql } from "../gql";

const getMeDocument = graphql(`
  query ME {
    me {
      _id
      email
    }
  }
`);

const useGetMe = () => {
  return useQuery(getMeDocument);
}

export { useGetMe };