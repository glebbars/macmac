import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

const FavoritesIcon = ({productId}) => {
  const dispatch = useDispatch()
  const favorites = useSelector((store) => store.app.favorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorites = (productId) => {
    if (favorites.includes(productId)) {
      dispatch({
        type: 'REMOVE_FROM_FAVOURITES',
        payload: favorites.filter((id) => id !== productId),
      });
    } else {
      dispatch({
        type: 'ADD_TO_FAVOURITES',
        payload: [productId, ...favorites],
      });
    }
  };

  return(
    <div onClick={() => toggleFavorites(productId)} className='product__favorite-icon'>
     <svg
        fill={favorites.includes(productId) ? "#FA530D" : "transparent"}
        stroke={favorites.includes(productId) ? "#FA530D" : "#ADB5BD"}
        xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5px" width="24" height="24" viewBox="-1 0 26 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
      />
      </svg>
    </div>
  )
}

export default FavoritesIcon