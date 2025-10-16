"use client";

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { CardAction, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import {login} from "@/actions/login.action";

const Form = () => {
    const [page,setPage] = useState<"login" | "signup">("login");

  return (
    <form>
    <div className="flex flex-col gap-6">
    {page === "signup" && <div className="grid gap-2">
      <div className="flex items-center">
          <Label htmlFor="password">Username</Label>
        </div>
        <Input id="password" type="password" required />
      </div>}
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input id="password" type="password" required />
      </div>
    </div>
    <CardAction>
          <Button onClick={()=>setPage((prev)=> prev === "login" ? "signup" : "login")} variant="link" type="button">{page === "login" ? "signup" : "login"}</Button>
    </CardAction>
    <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
        <Button onClick={login} variant="outline" type="button" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
  </form>
  )
}

export default Form