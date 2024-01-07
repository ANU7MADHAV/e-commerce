import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  cartItems: number;
}

export default function CartIcon({ cartItems }: Props) {
  return (
    <Link
      className="relative flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 p-2 lg:h-8 lg:w-8"
      href="/cart"
    >
      <ShoppingCartIcon className="h-4 w-4" />
      <div className="absolute -right-1 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 text-[9px] text-white lg:h-6 lg:w-6 lg:text-xs">
        {cartItems}
      </div>
    </Link>
  );
}
