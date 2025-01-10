import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

const CreateMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`)

const useCreateMessage = () => {
  return useMutation(CreateMessageDocument);
}

export { useCreateMessage }