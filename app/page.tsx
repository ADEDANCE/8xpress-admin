"use client";
import Button from "./component/ui/Button";
import Input from "./component/ui/input";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter();

   const handleLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto flex">
        <div className=" w-full  md:w-1/2 px-16 py-16 text-gray-300">
          <p className=" text-red-600 mt-">8XPRESS WORKSPACE</p>
          <h1 className=" font-bold text-white text-2xl mt-4">Welcome back.</h1>
          <p className=" mt-2">
            Sign in to keep your restaurant running smoothly.
          </p>

          <Input
            label="Email address"
            placeholder="admin@email.com"
            className=" mt-5"
          />
          <div className="flex justify-end mt-2">
            <Link href="" className="text-red-500">
              Forgot Password
            </Link>
          </div>
          <Input
            label="Password"
            placeholder=" Enter your password"
            className=" mt-3"
          />

          <div className="flex justify-center mt-8">
            <Button
              className="w-3/4"
              text="Sign in"
              onClick={handleLogin}
              icon={<ArrowRight size={18} />}
            />
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/images/jollofR&chicken.jpg"
            alt="8Xpress food"
            width={800}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>
      </main>
    </div>
  );
}
