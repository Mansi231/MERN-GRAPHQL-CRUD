const Todo = require('../models/todoModel')

const resolvers = {
    Query: {
        getTodos: async () => {
            try {
              let todos = await Todo.find();
              return todos;
            } catch (error) {
              throw error; // Propagate the error to the GraphQL resolver
            }
          },
    },
    Mutation:{
      addTodo: async (_,args)=>{
        let todo = {...args?.todo}
        let result = await Todo.create(todo)
        return result
      },
      deleteTodo : async (_,args)=>{
        let todos = await Todo.findByIdAndDelete(args?.id)
        return todos
      },
      updateTodo : async (_,args)=>{
        let todo = await Todo.findByIdAndUpdate(args?.id,args?.editTodo, { new: true })
        return todo
      }
    }
}

module.exports = resolvers