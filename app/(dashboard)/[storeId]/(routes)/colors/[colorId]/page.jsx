import { ColorForm } from "./components/color-form";

import prismadb from "@/lib/prismadb";
import { isValidObjectId } from "@/lib/utils";

const ColorPage = async ({ params }) => {
  let color;

  if (isValidObjectId(params.colorId)) {
    color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
  } else {
    color = {
      name: "",
      value: "",
    };
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
