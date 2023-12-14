import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { ADD_TODO } from '../graphql/Muations';
import { GET_ALL_TODOS } from '../graphql/queries';

const AddTodoModal = ({ isOpen, onClose }) => {

    const modalStyles = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';
    const [todo, setTodo] = useState({ title: '', description: '', completed: false })

    const [addTodo] = useMutation(ADD_TODO, {refetchQueries: [GET_ALL_TODOS,'getTodos']});

    const handleAddTodo = async () => {
        try {
            await addTodo({variables: {todo: todo}});
            setTodo({ title: '', description: '', completed: false })
            onClose()
        } catch (error) {
            console.error('Error adding todo:', error);
            onClose()
        }
    }

    return (
        <div className={`z-50 modal ${modalStyles}`}>
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
            <div className="modal-content bg-white p-7 rounded shadow-lg z-50 w-96 text-center relative">

                <i className="fa-solid fa-xmark text-black absolute right-2 top-1 text-lg cursor-pointer" onClick={onClose}></i>

                <input type="text" className='mt-2 bg-transparent text-gray-500 w-full border p-2 rounded-xl focus:outline-cyan-600 focus:border-none outline-none placeholder:text-gray-300  placeholder:text-sm font-light text-sm' placeholder='Enter title' value={todo?.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />

                <input type="text" className='bg-transparent text-gray-500 w-full border p-2 rounded-xl focus:outline-cyan-600 focus:border-none outline-none placeholder:text-gray-300 text-sm placeholder:text-sm my-3' value={todo?.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} placeholder='Enter description' />

                <button className='self-end w-full py-2 bg-cyan-900' disabled={!todo?.title || !todo?.description ? true : false} onClick={handleAddTodo}>Add</button>

            </div>
        </div >
    );
}

export default AddTodoModal
