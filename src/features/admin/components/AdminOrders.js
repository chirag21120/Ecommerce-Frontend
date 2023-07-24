import React, { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selecteTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { Pagination } from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selecteTotalOrders);
  const user = useSelector(selectLoggedInUser);
  const [editableItemId, setEditableItemId] = useState(-1);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return `bg-purple-200 text-purple-600`;
        break;
      case "dispatched":
        return `bg-yellow-200 text-yellow-600`;
        break;
      case "delivered":
        return `bg-green-200 text-green-600`;
        break;
      case "cancelled":
        return `bg-red-200 text-red-600`;
        break;
      default:
        break;
    }
  };

  const handlePage = (page) => {
    setPage(page);
    // dispatch(fetchProductsByFiltersAsync(newfilter));
  };

  const handleEdit = (order) => {
    setEditableItemId(order.id);
  };

  const handleSort = (field) => {
    const sort = { _sort: field.sort, _order: field.order };
    setSort(sort);
  };

  const handleShow = (order) => {
    console.log(order.id);
  };
  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableItemId(-1);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ pagination, sort }));
  }, [dispatch, page, sort]);
  return (
    <>
      <>
        {/* component */}
        <div className="overflow-x-auto">
          <div className="  bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
            <div className="w-full ">
              <div className="bg-white shadow-md rounded my-6">
                <table className="min-w-max w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th
                        className="py-3 px-6 text-left cursor-pointer"
                        onClick={(e) =>
                          handleSort({
                            sort: "id",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Order Number{" "}
                        {sort._sort === "id" &&
                          (sort._order === "asc" ? (
                            <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                          ))}
                      </th>
                      <th className="py-3 px-6 text-center">Items</th>
                      <th className="py-3 px-6 text-left cursor-pointer" onClick={(e) =>
                          handleSort({
                            sort: "totalAmount",
                            order: sort?._order === "asc" ? "desc" : "asc",
                          })
                        }
                      >
                        Total Amount{" "}
                        {sort._sort === "totalAmount" &&
                          (sort._order === "asc" ? (
                            <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                          ) : (
                            <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                          ))}</th>
                      
                      <th className="py-3 px-6 text-center">
                        Shipping Address
                      </th>
                      <th className="py-3 px-6 text-center">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {orders &&
                      orders.map((order) => (
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2"></div>
                              <span className="font-medium">{order.id}</span>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex flex-col items-start">
                              {order.items.map((item) => (
                                <div className="flex flex-row my-1">
                                  <div className="mr-2">
                                    <img
                                      className="w-6 h-6 rounded-full"
                                      src={item.thumbnail}
                                      alt={item.title}
                                    />
                                  </div>
                                  <span>
                                    {item.title} - {item.quantity} - $
                                    {item.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                              ${order.totalAmount}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex flex-col items-center justify-center">
                              <strong>{order.selectedAddress.name} ,</strong>
                              <div> {order.selectedAddress.city} ,</div>
                              <div> {order.selectedAddress.postalCode}</div>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            {editableItemId === order.id ? (
                              <select onChange={(e) => handleUpdate(e, order)}>
                                <option value="pending">Pending</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            ) : (
                              <span
                                className={`${chooseColor(
                                  order.status
                                )} py-1 px-3 rounded-full text-xs`}
                              >
                                {order.status}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <EyeIcon
                                  className="w-6 h-6"
                                  onClick={(e) => handleShow(order)}
                                ></EyeIcon>
                              </div>
                              <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <PencilIcon
                                  className="w-6 h-6"
                                  onClick={(e) => handleEdit(order)}
                                ></PencilIcon>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalOrders}
          ></Pagination>
        </div>
      </>
    </>
  );
}

export default AdminOrders;
