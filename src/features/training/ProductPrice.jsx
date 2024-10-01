function ProductPrice({ children, price }) {
  return (
    <div>
      {console.log(`The price is${price}`)}
      <span>Price: ${price}</span>
    </div>
  );
}

export default ProductPrice;
