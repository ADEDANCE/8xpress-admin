"use client";
import Button from "./component/ui/Button";
import Input from "./component/ui/input";
import Link from "next/link";
import { ArrowRight, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://eightxpress-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      // Check whether login succeeded
      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Check the user's role
      if (data.user.role !== "admin") {
        throw new Error("Access denied. Admin account required.");
      }

      // Save authentication token
      localStorage.setItem("token", data.access_token);

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans bg-black">
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
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

          <div className="flex justify-center mt-8">
            <Button
              className="w-3/4 bg-red-500"
              text={loading ? "Please wait" : "Sign in"}
              onClick={handleLogin}
              icon={
                loading ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <ArrowRight size={18} />
                )
              }
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
