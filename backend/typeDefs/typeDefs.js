const typeDefs = `
    type Todo {
        id:ID!
        title:String!
        description:String!
        completed:Boolean
    }
    type Query {
        getTodos:[Todo]
    }
    type Mutation {
        addTodo(todo : AddTodoInput) : Todo
        deleteTodo(id : ID!) : Todo
        updateTodo(id : ID!,editTodo : EditTodoInput) : Todo
    }
    input AddTodoInput {
        title:String!,
        description:String!,
        completed:Boolean
    }
    input EditTodoInput {
        title:String,
        description:String,
        completed:Boolean
    }
`

module.exports = typeDefs