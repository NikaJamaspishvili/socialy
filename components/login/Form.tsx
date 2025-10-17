"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import {loginWithGoogleAction,loginWithCredentianlsAction} from "@/actions/login.action";
import { useRouter } from "next/navigation";

const Form = () => {
    const [isError,setIsError] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const authResult = await loginWithCredentianlsAction(email,password);
      if(authResult.status) router.push("/");
      setIsError(true);
    }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
    <div className="flex flex-col gap-6">
    <div className="grid gap-2">
      <div className="flex items-center">
        <Label htmlFor="password">Username</Label>
        </div>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input id="password" name="password" type="password" required />
        {isError && <span className="text-red-500 text-sm text-center">Password Was Wrong</span>}
      </div>
    </div>
    <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
        <Button onClick={loginWithGoogleAction} variant="outline" type="button" className="w-full">
          Login with Google
        </Button>
    </CardFooter>
  </form>
  )
}

export default Form