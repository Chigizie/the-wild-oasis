import Button from "./Button";
import Product, { Open, Window } from "./Product";

function ProductBox() {
  return (
    <Product>
      <Open opens="first-child">
        <Button yellow>show Lamboghini</Button>
      </Open>
      <Window name="first-child">
        <Product.ProductDescription name="Lamboghini" />
        <Product.ProductPrice price={115000}>number price</Product.ProductPrice>
      </Window>

      <Open opens="second-child">
        <Button>show benz</Button>
      </Open>
      <Window name="second-child">
        <Product.ProductDescription name="Benz" />
        <Product.ProductPrice price={64000} />
      </Window>

      <Open opens="third-child">
        <Button blue>show BMW</Button>
      </Open>
      <Window name="third-child">
        <Product.ProductDescription name="BMW" />
        <Product.ProductPrice price={40000} />
      </Window>
    </Product>
  );
}

export default ProductBox;
