import React from "react";
import { Input } from "~/components/ui/input";

const LandingPage = () => {
  return (
    <main className="p-4">
      <h1 className="scroll-m-20 mt-20 text-4xl text-center font-extrabold tracking-tight lg:text-5xl">
        Nobel Laurets
      </h1>
      <Input
        placeholder="Search for a Nobel Laurete.."
        className=" m-auto max-w-lg mt-5"
      ></Input>
    </main>
  );
};

export default LandingPage;
