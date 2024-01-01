import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  selectCartLoaded,
  selectCartStatus,
  updateCartAsync,
} from "./cartSlice";
import { BallTriangle } from "react-loader-spinner";
import Modal from "../common/Modal";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const items = useSelector(selectCartItems);
  const [openModal, setOpenModal] = useState(-1)
  const dispatch = useDispatch();
  const cartLoaded = useSelector(selectCartLoaded);
  const totalAmount = items.reduce(
    (amount, item) => item.Product.discountedPrice * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  const status = useSelector(selectCartStatus);
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
    {/* {!items.length && cartLoaded &&<Navigate to='/' replace={true}></Navigate>} */}
      <div className="mx-auto mt-10 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex py-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h2>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            {status === "loading" ? (
              <div className="flex flex-center ">
                {" "}
                <BallTriangle
                  height={100}
                  width={100}
                  radius={5}
                  color="#4fa94d"
                  ariaLabel="ball-triangle-loading"
                  wrapperClass={{}}
                  wrapperStyle=""
                  visible={true}
                />
              </div>
            ) : null}
            <ul className="-my-6 divide-y divide-gray-200">
              {status === "idle" &&
                items.map((item) => (
                  <li key={item.Product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.Product.thumbnail}
                        alt={item.Product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.Product.href}>{item.Product.title}</a>
                          </h3>
                          <p className="ml-4">${item.Product.discountedPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-left text-gray-500">
                          {item.Product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item.Product.title}`}
                            message="Are you sure you want to delete this cart item"
                            dangerOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e)=>handleRemove(e,item.Product.id)}
                            cancelAction={()=>setOpenModal(-1)}
                            showModal={openModal===item.Product.id}
                          ></Modal>
                          <button
                            onClick={e =>{setOpenModal(item.Product.id)}}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between text-base my-1 font-medium text-gray-900">
            <p>Toatal Items</p>
            <p>{totalItems} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
