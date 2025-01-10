"use client";

import { deleteProduct } from "@/app/action";
import { useActionState, useEffect } from "react";
import Spinner from "./Spinner";

export default function DeleteIcon({ id }: { id: string }) {
  const action = deleteProduct.bind(null, id);

  const [state, formAction, isPending] = useActionState(action, undefined);

  useEffect(() => {
    if (state?.message) {
      console.log(state?.message);
    }
  }, [state?.message]);

  return (
    <form action={formAction}>
      {isPending ? (
        <div className="w-10 h-full flex justify-center items-center">
          <Spinner size="24px" borderThickness="3px" color="white" />
        </div>
      ) : (
        <button
          className="disabled:opacity-50 group p-2 hover:bg-purple-600 rounded-full"
          aria-label="Delete product">
          <svg
            className="stroke-purple-500 group-hover:stroke-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          </svg>
        </button>
      )}
    </form>
  );
}
