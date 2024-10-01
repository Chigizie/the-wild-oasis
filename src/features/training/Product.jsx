import { cloneElement, createContext, useState } from "react";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import { useContext } from "react";

const productContext = createContext();

function Product({ children, name }) {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <productContext.Provider value={{ openName, open, close }}>
      {children}
    </productContext.Provider>
  );
}

export function Open({ children, opens }) {
  const { open } = useProduct();
  return cloneElement(children, { onClick: () => open(opens) });
}

export function Window({ children, name }) {
  const { openName } = useProduct();
  if (name !== openName) return null;
  return <div>{children}</div>;
}
export function useProduct() {
  const context = useContext(productContext);
  if (!context) throw new Error("context is used out the context provider");

  return context;
}

Product.ProductPrice = ProductPrice;
Product.ProductDescription = ProductDescription;

export default Product;
