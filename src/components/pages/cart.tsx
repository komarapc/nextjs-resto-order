import { Fragment, useEffect } from "react";
import { clearAll, remove } from "@/redux/reducer/cart";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlineCheck } from "react-icons/ai";
import { CartProps } from "@/interface/cart";
import { FaRegSadCry } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { Modal } from "../modal/modal";
import { OrderProps } from "@/interface/order";
import { RootState } from "@/redux/store";
import axios from "axios";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useState } from "react";

export function CartInfo() {
  const cartItems: CartProps[] = useSelector((state: RootState) => state.cart);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [showModalSuccess, setShowModalSuccess] = useState<boolean>(false);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [dataOrder, setDataOrder] = useState<OrderProps>({} as OrderProps);
  const [countDownRedirectPayment, setCountDownRedirectPayment] =
    useState<number>(3);

  const dispatch = useDispatch();
  const router = useRouter();
  const countTotalCart = () => {
    let total = 0;
    cartItems.forEach((cart) => {
      total += Number(cart.order_quantity) * Number(cart.item?.price);
    });
    return total;
  };

  useEffect(() => {
    if (Boolean(Object.keys(dataOrder).length)) {
      setTimeout(() => {
        router.push(`/payment/${dataOrder.id}`);
      }, 3000);
      setInterval(() => {
        setCountDownRedirectPayment(countDownRedirectPayment - 1);
      }, 1000);
    }
  }, [dataOrder, router, countDownRedirectPayment]);

  // method
  const actions = {
    handleClickCheckout: () => {
      // check if customer name and phone number is empty
      if (customerName === "" || customerPhone === "") {
        setErrorMessage("Please fill your name and phone number");
        setShowModalError(true);
        return;
      }
      // check if customer phone number is valid
      if (customerPhone.length < 10) {
        setErrorMessage("Please fill your phone number correctly");
        setShowModalError(true);
        return;
      }
      // check if cart is empty
      if (cartItems.length === 0) {
        setErrorMessage("Your cart is empty");
        setShowModalError(true);
        return;
      }

      setShowModalConfirm(true);
    },

    saveCheckout: async () => {
      // create order
      const order: OrderProps = {
        id: nanoid(10),
        customer: {
          name: customerName,
          phone: customerPhone,
        },
        order_date: new Date().toISOString(),
        order_status: "waiting payment",
        order_items: cartItems,
        order_total: countTotalCart(),
      };

      // send order to server
      let success = false;
      let successMessage = "";
      let error = false;
      let errorMessage = "";
      let dataOrder = {} as OrderProps;
      await axios
        .post("http://localhost:8000/orders", order)
        .then((res) => {
          success = true;
          successMessage = "Your order has been created";
          dataOrder = res.data;
        })
        .catch((err) => {
          console.log(err);
          error = true;
          errorMessage = "Oops, something went wrong";
        });
      if (success) {
        // alert cart
        dispatch(clearAll());
        setShowModalSuccess(true);
        setSuccessMessage(successMessage);
        setDataOrder(dataOrder);
      } else {
        setShowModalError(true);
        setErrorMessage(errorMessage);
      }
    },
  };

  return (
    <Fragment>
      {cartItems.length > 0 ? (
        <>
          <div className="w-full min-h-screen py-20 bg-neutral-50">
            <div className="container mx-auto p-5 md:p-0">
              <div className="flex flex-col items-center">
                <h1 className="text-4xl font-semibold text-orange-500 border-b-2 border-t-2 border-orange-500 px-10 py-4">
                  Cart
                </h1>
                <div className="w-full flex flex-col md:flex-row gap-4 my-20">
                  {/* checkout information */}
                  <div className="w-full md:w-4/12 h-96 flex flex-col gap-6 bg-orange-400 border  border-orange-500 p-10 rounded-xl">
                    <div className="flex flex-col gap-4">
                      <label
                        htmlFor="customerName"
                        className="text-neutral-700 font-semibold"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="customerName"
                        className="w-full px-4 py-3 focus:shadow-lg rounded outline-none"
                        autoComplete="off"
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-col gap-4">
                      <label
                        htmlFor="phoneNumber"
                        className="text-neutral-700 font-semibold"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phoneNumber"
                        className="w-full px-4 py-3 focus:shadow-lg rounded outline-none"
                        autoComplete="off"
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>

                    <button
                      className="bg-orange-700 py-4 text-white hover:bg-orange-800 transition duration-300 ease-in-out"
                      onClick={() => actions.handleClickCheckout()}
                    >
                      Checkout
                    </button>
                  </div>
                  {/* end checkout information */}

                  {/* cart list */}
                  <div className="w-full flex flex-col md:px-10 gap-6">
                    {cartItems.map((cart: CartProps, i: number) => (
                      <div
                        key={cart.id}
                        className="w-full flex flex-row gap-4 bg-white  border border-orange-500 p-5 hover:shadow-lg transition duration-300 ease-in-out"
                      >
                        <div>
                          <Image
                            src={`/img/menu/${cart.item?.image}`}
                            alt={`img-${cart.item?.name}`}
                            width={100}
                            height={100}
                            quality={80}
                            className="w-32 h-32 object-cover rounded"
                          />
                        </div>
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-2">
                          <div className="w-full">
                            <h1 className="text-xl font-semibold text-neutral-800">
                              {cart.item?.name} (x{cart.order_quantity})
                            </h1>
                            <p className="text-lg text-orange-500">
                              ${cart.item?.price}
                            </p>
                            <p>
                              <span className="text-xl font-bold text-neutral-800">
                                Total{" "}
                              </span>
                              <span className="text-xl font-bold text-green-600">
                                $
                                {(
                                  Number(cart.order_quantity) *
                                  Number(cart.item?.price)
                                ).toFixed(2)}
                              </span>
                            </p>
                          </div>
                          <div className="w-full md:mr-10 flex justify-end">
                            {/* remove button */}
                            <button
                              className="self-end bg-orange-500 py-3 px-6 text-white hover:bg-orange-600 transition duration-300 ease-in-out"
                              onClick={() => dispatch(remove(`${cart.id}`))}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="my-10 text-4xl font-light flex justify-between items-center">
                      <span>Total Checkout</span>
                      <span className="text-green-600 font-bold">
                        ${countTotalCart().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* end cart list */}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* modal confirm */}
      <Modal
        isOpen={showModalConfirm}
        onClose={() => setShowModalConfirm(false)}
        onSave={() => actions.saveCheckout()}
        showSaveButton
      >
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold text-neutral-800">
            Are you sure?
          </h1>
          <p className="text-lg text-neutral-700">
            You will not be able to change your order
          </p>
        </div>
      </Modal>
      {/* end modal confirm */}

      {/* modal success */}
      <Modal
        isOpen={showModalSuccess}
        onClose={() => setShowModalSuccess(false)}
      >
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 flex items-center justify-center  rounded-full text-8xl">
            😊
          </div>
          <h1 className="text-lg text-neutral-800 mt-10">{successMessage}</h1>
          <h1 className="text-md text-neutral-600 mt-5">
            Your will redirect to payment page in{" "}
            <span className="font-bold">
              {countDownRedirectPayment} seconds
            </span>
          </h1>
        </div>
      </Modal>
      {/* end of modal success */}

      {/* modal error */}
      <Modal isOpen={showModalError} onClose={() => setShowModalError(false)}>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-20 h-20 flex items-center justify-center text-8xl ">
            😭
          </div>
          <h1 className="text-lg text-neutral-800 mt-10">{errorMessage}</h1>
        </div>
      </Modal>
      {/* end modal error */}
    </Fragment>
  );
}
