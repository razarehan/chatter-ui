import { useMutation } from "@apollo/client";
import { graphql } from "../gql";

const CreateMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      _id
      content
      createdAt
    }
  }
`)

const useCreateMessage = () => {
  return useMutation(CreateMessageDocument);
}

export { useCreateMessage }