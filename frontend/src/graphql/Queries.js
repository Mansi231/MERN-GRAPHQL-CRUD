import { gql } from "@apollo/client";

export const GET_ALL_TODOS = gql`
{
  getTodos{
    id
    title 
    description
    completed
  }
}
`