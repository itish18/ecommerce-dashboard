"use client";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { column } from "./columns";

import { Plus } from "lucide-react";

export const OrderClient = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={column} data={data} searchKey="products" />
    </>
  );
};
