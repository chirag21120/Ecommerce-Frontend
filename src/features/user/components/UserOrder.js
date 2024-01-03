import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";

export default function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch, user]);

  return (
    <div className="mx-6 my-6">
      <div className="flex py-4">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          My Orders
        </h2>
      </div>
      {orders &&
        orders.map((order) => (
          <div
            className="mx-auto mt-5 bg-white max-w-7xl px-4 sm:px-6 lg:px-8"
            key={order.id}
          >
            <div className=" py-4">
              <h3 className="text-2xl text-left font-bold tracking-tight text-gray-900">
                Order Id : {order.id}
              </h3>
              <h5 className="text-xl text-left font-bold tracking-tight text-red-900">
                Order Status : {order.status}
              </h5>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.product.id} className="flex py-6">
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
                            <p className="ml-4">${item.product.discountedPrice}</p>
                          </div>
                          <p className="mt-1 text-sm text-left text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty: {item.quantity}
                            </label>
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
                <p>${order.totalAmount}</p>
              </div>
              <div className="flex justify-between text-base my-1 font-medium text-gray-900">
                <p>Toatal Items</p>
                <p>{order.totalItems} items</p>
              </div>
              <p className="mt-0.5 text-base text-gray-900 font-medium text-left">
                Shipping Address:
              </p>
              <div
                className="flex justify-between gap-x-6 px-5  my-2 rounded-lg "
              >
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {order.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.street}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.city}, {order.selectedAddress.postalCode}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {order.selectedAddress.state}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectedAddress.email}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {order.selectedAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
