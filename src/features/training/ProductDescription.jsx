import { useProduct } from "./Product";

function ProductDescription({ children, name }) {
  const { details } = useProduct();
  const brandInfo = `${name} is the best brand you can get in the market`;
  return (
    <div>
      {console.log(details)}
      {brandInfo}
    </div>
  );
}

export default ProductDescription;
