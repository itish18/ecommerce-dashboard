import { SizeForm } from "./components/size-form";

import prismadb from "@/lib/prismadb";
import { isValidObjectId } from "@/lib/utils";

const SizePage = async ({ params }) => {
  let size;

  if (isValidObjectId(params.sizeId)) {
    size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
  } else {
    size = {
      name: "",
      value: "",
    };
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
