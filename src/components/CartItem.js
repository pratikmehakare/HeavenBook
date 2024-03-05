import React from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { remove } from '../redux/Slices/CartSlice';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const removeFromCart = () => {
        dispatch(remove(item.id));
        toast.error("Item removed successfully");
    };

    return (
        <div className="flex flex-col gap-1 p-4 rounded-lg border bg-slate-300 border-gray-200 shadow-md">
            <div className='flex flex-col md:flex-row md:justify-between'>
                <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <img src={item.image} alt={item.title} className="w-24 h-24 object-cover" />
                </div>
                <div className='flex gap-2'>
                    <p className='text-sm'>Author:</p>
                    <p className="text-sm text-gray-600">{item.publisher}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <p className="text-lg font-semibold text-green-700">₹ {item.price}</p>
                <button
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300 mt-2 md:mt-0"
                    onClick={removeFromCart}
                >
                    <RiDeleteBin6Fill />
                </button>
            </div>
        </div>
    );
};

export default CartItem;