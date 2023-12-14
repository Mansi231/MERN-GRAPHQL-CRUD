import { useEffect, useState } from 'react'
import './App.css'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_TODOS } from './graphql/queries'
import AddTodoModal from './modals/AddTodoModal'
import { DELETE_TODO } from './graphql/Muations'
import EditTodoModal from './modals/EditTodoModal'


function App() {

  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [todoData, setTodoData] = useState([])
  const [editTodo,setEditTodo] = useState(null)

  const { loading, error, data } = useQuery(GET_ALL_TODOS); // Move useQuery here
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [GET_ALL_TODOS, 'getTodos']
  })

  useEffect(() => {
    if (data) {setTodoData(data?.getTodos)}
  }, [data?.getTodos, openModal]);

  const handleUpdate = (todoObj) => {
    setEditTodo(todoObj)
    setEditModal(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo({ variables: { id } });
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  }

  return (
    <>
      {openModal && <AddTodoModal isOpen={openModal} onClose={() => setOpenModal(!openModal)} />}
      {editModal && <EditTodoModal editTodo={editTodo} isOpen={editModal} onClose={() => {setEditModal(false);setEditTodo(null)}} />}
      <div className='z-0 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
        <div className='flex justify-center gap-3'>
          <button className='h-fit w-fit py-3 px-6 text-sm rounded-xl hover:border-slate-100 border-[1px]' onClick={() => setOpenModal(true)}>Add Todo</button>
          <div className='flex justify-center self-center overflow-hidden rounded-xl border-slate-300 border-[1px]'>
            <table className="border-collapse text-start table-auto w-full text-sm p-4">
              <thead className='p-4 bg-slate-700'>
                <tr className=''>
                  <th className='border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left'>Title</th>
                  <th className='border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left'>Description</th>
                  <th className='border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left'>Completed</th>
                  <th className='border-b dark:border-slate-600 font-medium p-4 text-slate-400 dark:text-slate-200 text-left'>Action</th>
                </tr>
              </thead>
              {
                loading ?
                  <tbody >
                    <tr>
                      <td colSpan={3} className='py-3 text-center'>Loading....</td>
                    </tr>
                  </tbody> :
                  <tbody className='bg-white dark:bg-slate-800'>
                    {
                      todoData?.map((t) => <tr key={t?.id}>
                        <td className='border-b border-slate-100 dark:border-slate-700 p-4  text-slate-500 dark:text-slate-400'>{t?.title}</td>
                        <td className='border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400'>{t?.description}</td>
                        <td className='border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400'>{`${t?.completed}`}</td>
                        <td className='border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400 flex justify-between gap-2'>
                          <button className='text-sky-800 hover:border-sky-800 hover:border-[1px] ' onClick={() => handleUpdate(t)}>Edit</button>
                          <button
                            onClick={() => handleDelete(t?.id)}
                            className='text-red-500 hover:border-red-500 hover:border-[1px]'>Delete</button>
                        </td>
                      </tr>)
                    }
                  </tbody>
              }

            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
