import { ProductForm } from "./components/product-form";

import prismadb from "@/lib/prismadb";
import { isValidObjectId } from "@/lib/utils";

const ProductPage = async ({ params }) => {
  let product;

  if (isValidObjectId(params.productId)) {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });
  } else {
    product = {
      name: "",
      isFeatured: false,
      isArchived: false,
      price: 0,
      categoryId: "",
      sizeId: "",
      colorId: "",
      images: [],
    };
  }

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
};

export default ProductPage;
