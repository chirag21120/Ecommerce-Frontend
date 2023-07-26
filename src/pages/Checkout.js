import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteItemFromCartAsync, selectCartItems, updateCartAsync } from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { addOrderAsync, currentOrder} from "../features/order/orderSlice";
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice";
import { discountedPrice } from "../app/constants";

function Checkout() {
  const items = useSelector(selectCartItems);
  const user = useSelector(selectUserInfo);
  const orderPlace = useSelector(currentOrder);
  const dispatch = useDispatch()
  const totalAmount = items.reduce((amount,item)=>discountedPrice(item.product)*item.quantity+amount,0)
  const totalItems = items.reduce((total,item)=>item.quantity +total,0);
  const { register, handleSubmit,reset } = useForm();

  const [selectedAddress,setSelectedAddress] = useState(null);
  const [paymentMethod,setPaymentMethod] = useState('cash');


  const handleQuantity = (e,item)=>{
    dispatch(updateCartAsync({id:item.id,quantity:+e.target.value}));
  }
  const handleRemove = (e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }
  const handleAddress = (e)=>{
    setSelectedAddress(user.addresses[e.target.value]);
  }
  const handlePayment = (e)=>{
    setPaymentMethod(e.target.value);
  }
  const handleOrder = ()=>{
    if(selectedAddress){const order ={items, totalAmount, totalItems,user:user.id,paymentMethod, selectedAddress, status:'pending'}
    dispatch(addOrderAsync(order));
  }
    else{
      alert('Add a new Address or Select an existing one')
    }
  }

  return (
    <>
    {!items.length && <Navigate to='/' replace={true}></Navigate>}
    {orderPlace && <Navigate to={`/order-success/${orderPlace.id}` }replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form className="bg-white px-5 mt-10 " noValidate onSubmit={handleSubmit((data)=>{
              dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
              reset();
            })}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 pt-5">
                  <div className="flex flex-col  justify-start">
                    <h2 className="text-2xl  font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm text-left px-2 font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name',{required:'name is required'})}
                          id="name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm text-left px-2 font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email',{required:'email is required'})}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-left px-2 leading-6 text-gray-900"
                      >
                        Phone no.
                      </label>
                      <div className="mt-2">
                      <input
                          id="phone"
                          {...register('phone',{required:'email is required'})}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm text-left px-2 font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street',{required:'street address is required'})}
                          id="street-address"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm text-left px-2 font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city',{required:'city is required'})}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm text-left px-2 font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('region',{required:'state is required'})}
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postalCode"
                        className="block text-sm text-left px-2 font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('postalCode',{required:'postal code is required'})}
                          id="postalCode"
                          autoComplete="postalCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      class="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base text-left font-semibold leading-7 text-gray-900 px-2">
                    Address
                  </h2>
                  <p className="mt-1 text-left text-sm leading-6 text-gray-600 px-2">
                    Choose from existing address
                  </p>
                  <ul >
                    {user.addresses && user.addresses.map((address,index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 px-5 py-5 my-2 rounded-lg border-solid border-2 border-gray-300"
                      >
                        <div className="flex gap-x-4">
                          <input
                          onChange={handleAddress}
                            id="address"
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.city}, {address.zip}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.state}
                            </p>
                          </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            {address.email}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {address.phone}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 space-y-10 flex justify-start">
                    <fieldset>
                      <legend className="text-sm px-2 font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p className="mt-1  text-sm leading-4 text-gray-600">
                        Choose One
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            onChange={e=>handlePayment(e)}
                            id="cash"
                            name="payments"
                            type="radio"
                            value='cash'
                            checked={paymentMethod==='cash'}
                            className="h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-everything"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                          onChange={e=>handlePayment(e)}
                            id="card"
                            name="payments"
                            type="radio"
                            value= 'card'
                            checked={paymentMethod==='card'}
                            className="h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
          <div className="mx-auto mt-10 bg-white max-w-7xl px-2 sm:px-2 lg:px-2">
        <div className="flex py-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h2>
        </div>
        <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
          <div className="flow-root">
            <ul  className="-my-6 divide-y divide-gray-200">
              {items && items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountedPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 text-left">
                        {item.product.brand}
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
                        <select onChange={e=>handleQuantity(e,item)} value={item.quantity} >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>

                      </div>

                      <div className="flex">
                        <button
                        onClick={e=>handleRemove(e,item.product.id)}
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

        <div className="border-t border-gray-200 px-2 py-4 sm:px-2">
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
            <div
            onClick={handleOrder}
              className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Order Now
            </div>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
                </Link>
            </p>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
