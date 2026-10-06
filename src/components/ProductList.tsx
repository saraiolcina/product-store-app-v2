import { type ReactElement } from "react";

import { type Product } from "../types/types";

type ProductListProps = {
  products: Product[];
};

const eur = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "EUR",
});

export const ProductList = ({ products }: ProductListProps): ReactElement => {
  return (
    <section aria-label="Product List">
      {products.map((product: Product) => {
        return (
          <div className="product-wrapper" key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img
              src={product.images[0] ?? "/placeholder.png"}
              alt={`Photo of ${product.title}`}
              loading={"lazy"}
            />
            <p>Price: {eur.format(product.price)}</p>
          </div>
        );
      })}
    </section>
  );
};
