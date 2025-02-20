import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const getMeDocument = graphql(`
  query ME {
    me {
      _id
      email
      username
    }
  }
`);

const useGetMe = () => {
  return useQuery(getMeDocument);
}

export { useGetMe };