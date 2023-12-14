import { gql } from "@apollo/client";

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      description
      completed
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($todo: AddTodoInput!) {
    addTodo(todo: $todo) {
      id
      title
      description
      completed
    }
  }
`;

export const UPDATE_TODO = gql`
mutation EditTodo( $updateTodoId: ID!,$editTodo: EditTodoInput){
  updateTodo(id: $updateTodoId,editTodo: $editTodo) {
    completed
    description
    id
    title
  }
}
`