import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const getMeDocument = graphql(`
  query ME {
    me {
      ...UserFragment
    }
  }
`);

const useGetMe = () => {
  return useQuery(getMeDocument);
}

export { useGetMe };