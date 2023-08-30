import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { isValidObjectId } from "@/lib/utils";
import Navbar from "@/components/navbar";

export default async function DashboardLayout({ children, params }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!isValidObjectId(params.storeId)) {
    notFound();
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
