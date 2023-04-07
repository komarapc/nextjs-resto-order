import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";

function AppBar({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full h-20 px-5 flex flex-row items-center justify-between bg-white shadow-md z-20">
      {/* nav brand */}
      <div>
        <Link href={"/"}>
          <span className="text-2xl text-orange-600 font-semibold">
            Fast&Food Delicious
          </span>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <FiPhoneCall className="text-2xl text-orange-600" />
        <span className="text-2xl text-orange-600">(+62)820-1122-3344</span>
      </div>
    </div>
  );
}

export default AppBar;
