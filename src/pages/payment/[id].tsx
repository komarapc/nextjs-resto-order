"use client";

import { BsCash, BsCreditCard2Back, BsQrCode } from "react-icons/bs";
import { Fragment, useEffect } from "react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import Jumbotron, {
  JumbotronSubtitle,
  JumbotronTitle,
} from "@/components/jumbotron";
import QRCode, { QRCodeSVG } from "qrcode.react";

import AppBar from "@/components/app-bar/app-bar";
import { BodyWrapper } from "@/components/wrapper/wrapper";
import Head from "next/head";
import Image from "next/image";
import { ItemProps } from "@/interface/item";
import { Modal } from "@/components/modal/modal";
import { NotFound } from "@/components/pages/404";
import { OrderProps } from "@/interface/order";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Payment({
  order,
}: {
  order: OrderProps;
}): InferGetServerSidePropsType<typeof getServerSideProps> {
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "cash" | "mobile banking" | "qris" | ""
  >("");
  const router = useRouter();
  if (!Boolean(Object.keys(order).length)) return <NotFound />;
  const cancelPayment = () => {
    axios.delete(`http://localhost:8000/orders/${order.id}`).then((res) => {
      router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      <BodyWrapper>
        <AppBar></AppBar>
        <Jumbotron>
          <JumbotronTitle>Payment</JumbotronTitle>
          <JumbotronSubtitle>
            Please complete your payment to complete your order
          </JumbotronSubtitle>
        </Jumbotron>
        <div className="w-full px-5 md:p-0 ">
          <div className="container w-full md:w-6/12 lg:w-4/12  mx-auto flex flex-col bg-white rounded-lg p-5 relative -top-20 shadow-xl">
            <div className="flex flex-col w-full items-center py-10">
              <QRCodeSVG
                value={`https://www.instagram.com/izmi.komar/`}
                size={250}
              />
              {/* instruction */}
              <div className="flex flex-col gap-2 mt-5">
                <h1 className="text-xl font-semibold text-center">
                  Scan this QR Code
                </h1>
                <p className="text-sm text-center">
                  Please show this QR Code to Cashier for complete your payment
                </p>
              </div>
              {/* cancel payment */}
              <div className="flex flex-row gap-2 mt-5">
                <button
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white text-sm"
                  onClick={() => setShowModalConfirm(true)}
                >
                  Cancel Payment
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="my-5 w-full px-5 md:p-0">
          <div className="container mx-auto w-full md:w-4/12 flex flex-col p-5 bg-white rounded-lg">
            <h1 className="text-xl font-semibold">Your Purchase</h1>
            <div className="w-full p-5 bg-neutral-100 mt-5">
              <table className="w-full">
                <thead>
                  <tr className="border-b-4 border-neutral-300">
                    <td>#</td>
                    <td>Item</td>
                    <td>Qty</td>
                    <td>Price</td>
                    <td>Total</td>
                  </tr>
                </thead>
                <tbody>
                  {order.order_items?.map((item, index: number) => (
                    <tr
                      key={index}
                      className={`${
                        (index + 1) % 2 === 0
                          ? "bg-neutral-100"
                          : "bg-neutral-200"
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>{item.item?.name}</td>
                      <td>{item.order_quantity}</td>
                      <td>{item.item?.price}</td>
                      <td>
                        $
                        {(
                          Number(item.order_quantity) * Number(item.item?.price)
                        ).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="text-right px-5 font-semibold">
                      Total
                    </td>
                    <td className="text-green-600 font-semibold text-lg">
                      ${order.order_total?.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* modal confirm */}
        <Modal
          isOpen={showModalConfirm}
          onClose={() => setShowModalConfirm(false)}
          onSave={() => cancelPayment()}
          showSaveButton
        >
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="text-6xl">😭</div>
            <h1 className="text-2xl font-semibold text-red-500">
              Cancel Payment
            </h1>
            <p className="text-xl">
              Are you sure you want to cancel your payment?
            </p>
          </div>
        </Modal>
      </BodyWrapper>
    </>
  );
}

function PaymentCard({
  onClick,
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div className=" flex items-center justify-center">
      <div
        className={`${
          active
            ? "bg-emerald-500 text-white hover:bg-emerald-600"
            : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
        } rounded flex flex-row items-center justify-center py-2 px-4 gap-4 cursor-pointer transition duration-300 ease-in-out`}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const order =
    (await axios
      .get(`http://localhost:8000/orders/${context.params?.id}`)
      .then((res) => res.data)
      .catch((err) => console.log(err))) || ({} as OrderProps);
  return {
    props: {
      order,
    },
  };
};
