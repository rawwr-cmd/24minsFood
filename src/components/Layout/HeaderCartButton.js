import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cartContext";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  // the easiest-to-understand case for reduce() is to return the sum of all the elements in an array:
  const initialValue = 0;

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, initialValue);

  //if ? true this:(otherwise) this
  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    //removing the class after animation is finished
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    //cleanup function to remove the class after the animation is finished
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
