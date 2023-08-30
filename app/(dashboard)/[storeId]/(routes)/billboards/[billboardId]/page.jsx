import { BillboardForm } from "./components/billboard-form";

import prismadb from "@/lib/prismadb";
import { isValidObjectId } from "@/lib/utils";

const BillboardPage = async ({ params }) => {
  let billboard;

  if (isValidObjectId(params.billboardId)) {
    billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
  } else {
    billboard = {
      label: "",
      imageUrl: "",
    };
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
