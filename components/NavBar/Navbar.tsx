import CartIcon from "./Cart";
import { ButtonAsChild } from "./Button";

interface Prop {
  cartItemNumber: number;
}

const Navbar = ({ cartItemNumber }: Prop) => {
  return (
    <div className="mt-2 flex min-h-[100px] justify-center">
      <div className="flex h-full  min-h-[50px] min-w-[800px] items-center justify-between overflow-hidden rounded-md bg-slate-400">
        <div className="px-6">
          <h1>Next E-com</h1>
        </div>
        <div className="flex items-center gap-5 px-6">
          <section>
            <CartIcon cartItems={cartItemNumber} />
          </section>
          <section>sign</section>
          <ButtonAsChild>Sign up</ButtonAsChild>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
