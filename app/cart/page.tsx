"use client";

import Navbar from "@/components/layout/Navbar";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  const increaseQty = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  const decreaseQty = (item: any) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      removeFromCart(item.id);
      for (let i = 1; i < item.quantity; i++) {
        addToCart(item);
      }
    }
  };

  return (
    <main className="bg-[#F4F3EE] min-h-screen">
      <Navbar />

      <div className="pt-40 max-w-5xl mx-auto px-10">
        <h1 className="text-4xl font-bold mb-10 text-[#4E482E]">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-xl text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-6 mb-6 gap-6 md:gap-0"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <Image
                    src={item.image || ""}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-[#4E482E]">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">
                      ₹ {item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls (UI SAME STYLE) */}
                <div className="flex flex-row md:flex-col items-center bg-[#A6B11E] rounded-2xl md:px-3 text-white self-end md:self-auto py-1 md:py-0 px-2 mt-4 md:mt-0">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="text-2xl px-4"
                  >
                    −
                  </button>

                  <span className="text-xl px-6">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item)}
                    className="text-2xl px-4"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-10">
              <Link href="/payment">
                <Button bgColor="#4E482E" title="Proceed to Checkout" />
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}