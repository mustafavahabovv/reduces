import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductThunk } from "./redux/reducers/productSlice";

const App = () => {
  const dispatch = useDispatch();

  const db = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  console.log();
  
  useEffect(() => {
    dispatch(getProductThunk());
  }, []);

  if (loading) return <span>Yuklenir</span>;
  if (error) return <span>Yukleme zamani Xeta bas verdi</span>;

  return (
    <div>
      {db &&
        db.map((item) => {
          return (
            <div>
              <span>{item.title}</span>
            </div>
          );
        })}
    </div>
  );
};

export default App;
