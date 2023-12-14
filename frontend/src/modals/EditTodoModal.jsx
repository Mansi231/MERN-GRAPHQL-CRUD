import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { UPDATE_TODO } from '../graphql/Muations';
import { GET_ALL_TODOS } from '../graphql/queries';

const EditTodoModal = ({ isOpen, onClose, editTodo }) => {
    const modalStyles = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';
    const [todo, setTodo] = useState({ title: editTodo?.title, description: editTodo?.description, completed: editTodo?.completed })

    const [updateTodo] = useMutation(UPDATE_TODO, { refetchQueries: [GET_ALL_TODOS, 'getTodos'] })

    const handleUpdateTodo = async () => {
        if (editTodo?.title == todo?.title && editTodo?.completed == todo?.completed && editTodo?.description == todo?.description) {
            onClose()
        }
        else {
            try {
                await updateTodo({ variables: { updateTodoId: editTodo?.id, editTodo: todo } })
                onClose()
            } catch (error) {
                onClose()
                console.log('error while updating : ', error)
            }
        }
    }

    return (
        <div className={`z-50 modal ${modalStyles}`}>
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
            <div className="modal-content bg-white p-7 rounded shadow-lg z-50 w-96 text-center relative">
                <i className="fa-solid fa-xmark text-black absolute right-2 top-1 text-lg cursor-pointer" onClick={onClose}></i>

                <input type="text" className='mt-2 bg-transparent text-gray-500 w-full border p-2 rounded-xl focus:outline-cyan-600 focus:border-none outline-none placeholder:text-gray-300  placeholder:text-sm font-light text-sm' placeholder='Enter title' value={todo?.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />

                <input type="text" className='bg-transparent text-gray-500 w-full border p-2 rounded-xl focus:outline-cyan-600 focus:border-none outline-none placeholder:text-gray-300 text-sm placeholder:text-sm my-3' value={todo?.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} placeholder='Enter description' />

                <div className="w-full flex gap-3 justify-between items-center">
                    <label htmlFor="mySelect" className=" text-sm font-medium text-gray-700">
                        Completed :
                    </label>
                    <select
                        onChange={(e) => setTodo({ ...todo,completed: e.target?.value === 'true' })}
                        defaultValue={todo?.completed}
                        id="mySelect"
                        name="mySelect"
                        className=" p-2 bg-cyan-700 flex-grow mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200 transition ease-in-out duration-150"
                    >
                        <option value={true} >true</option>
                        <option value={false}>false</option>
                    </select>
                </div>

                <button className='self-end w-full py-2 bg-cyan-900' disabled={!todo?.title || !todo?.description ? true : false} onClick={handleUpdateTodo}>Update</button>
            </div>
        </div >
    )
}

export default EditTodoModal
