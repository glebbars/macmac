import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import axios from 'axios'

const Home = ({ 
  cardsArr,
  setClothId 
}) => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedImgUrl, setUploadedImgUrl] = useState([])

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, []);

  const toggleFavorites = (cardId) => {
    if (favorites.includes(cardId)) {
      setFavorites(favorites.filter((id) => id !== cardId));
    } else {
      setFavorites([...favorites, cardId]);
    }
  };

  const uploadImages = async () => {
    const attachments = await Promise.all(
      Array.from(uploadedImages).map( file => {
        const data = new FormData();
        data.append('file', file);
        console.log(file)
        // data.append('upload_preset', "njebqo0r")
        // return axios.post("https://api.cloudinary.com/v1_1/dlt6mfxib/image/upload", data)
        // .then(res => {
        //   return {
        //     url: res.data.secure_url,
        //     id: res.data.asset_id
        //   }
        // })
      })
    )
    setUploadedImgUrl(attachments)
  }

  return (
    <div className="cards-container">
      <input type="file" multiple onChange={(e) => setUploadedImages(e.target.files)}/>
      <button onClick={uploadImages}>Upload Image</button>
      {uploadedImgUrl.map(img => <img key={img.id} src={img.url} alt=""/>)}
      {/* {cardsArr.map((cloth) => (
        <div className="card" key={cloth.id}>
          <Card
            toggleFavorites={toggleFavorites}
            cloth={cloth}
            filledStar={favorites.includes(cloth.id)}
            cardCross={false}
          />
          <Button
            text="Add to cart"
            clothId={cloth.id}
            bg="black"
          />
        </div>
      ))} */}
    </div>
  );
};

Home.propTypes = {
  cardsArr: PropTypes.array.isRequired,
  // setClothId: PropTypes.func.isRequired,
};

export default Home;
