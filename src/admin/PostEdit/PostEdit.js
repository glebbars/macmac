import React, { useEffect, useState } from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  SelectInput,
  NumberInput,
} from "react-admin";
import {
  brandOptions,
  validatePostForm,
  onTransform,
  getCategoryOptions,
  getModelOptions,
  getCapacityOptions,
  getColorOptions,
  getDiagonalOptions,
  getWiFiOptions,
  getMemoryOptions,
} from "../AdditionalFunctions/AdditionalFunctions";
import axios from "axios";

const PostEdit = (props) => {
  const [createdProduct, setCreatedProduct] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DB_API}/posts/${props.id}`)
      // axios.get(`http://localhost:5000/posts/${props.id}`)
      .then((res) => setCreatedProduct(res.data));
  }, []);

  const fullName = createdProduct.description
    ? Object.values(createdProduct.description).join(" ")
    : "";

  return (
    <Edit {...props} transform={onTransform} title="Edit a Product">
      <SimpleForm validate={validatePostForm}>
        <TextInput disabled source="id" />

        <SelectInput
          source="description.brand"
          choices={brandOptions}
          onChange={(e) =>
            setCreatedProduct({
              ...createdProduct,
              description: {
                ...createdProduct.description,
                brand: e.target.value,
              },
            })
          }
        />

        <SelectInput
          source="description.category"
          choices={getCategoryOptions(createdProduct.description?.brand)}
          onChange={(e) =>
            setCreatedProduct({
              ...createdProduct,
              description: {
                ...createdProduct.description,
                category: e.target.value,
              },
            })
          }
        />

        <SelectInput
          source="description.model"
          choices={getModelOptions(createdProduct.description?.category)}
          onChange={(e) =>
            setCreatedProduct({
              ...createdProduct,
              description: {
                ...createdProduct.description,
                model: e.target.value,
              },
            })
          }
        />

        {createdProduct.description?.diagonal && (
          <SelectInput
            source="description.diagonal"
            choices={getDiagonalOptions(
              createdProduct.description?.category,
              createdProduct.description?.model.toLowerCase()
            )}
            onChange={(e) =>
              setCreatedProduct({
                ...createdProduct,
                description: {
                  ...createdProduct.description,
                  diagonal: e.target.value,
                },
              })
            }
          />
        )}

        {createdProduct.description?.wifi && (
          <SelectInput
            source="description.wifi"
            choices={getWiFiOptions(createdProduct.description?.category)}
            onChange={(e) =>
              setCreatedProduct({
                ...createdProduct,
                description: {
                  ...createdProduct.description,
                  wifi: e.target.value,
                },
              })
            }
          />
        )}

        {createdProduct.description?.capacity && (
          <SelectInput
            source="description.capacity"
            choices={getCapacityOptions(
              createdProduct.description?.category,
              createdProduct.description?.model.toLowerCase()
            )}
            onChange={(e) =>
              setCreatedProduct({
                ...createdProduct,
                description: {
                  ...createdProduct.description,
                  capacity: e.target.value,
                },
              })
            }
            helperText="Это SSD"
          />
        )}

        {createdProduct.description?.capacity && (
          <SelectInput
            source="description.memory"
            choices={getMemoryOptions(
              createdProduct.description?.category,
              createdProduct.description?.model.toLowerCase()
            )}
            onChange={(e) =>
              setCreatedProduct({
                ...createdProduct,
                description: {
                  ...createdProduct.description,
                  memory: e.target.value,
                },
              })
            }
            helperText="Это Оперативная память"
          />
        )}

        {createdProduct.description?.color && (
          <SelectInput
            source="description.color"
            choices={getColorOptions(
              createdProduct.description?.category,
              createdProduct.description?.model.toLowerCase()
            )}
            onChange={(e) =>
              setCreatedProduct({
                ...createdProduct,
                description: {
                  ...createdProduct.description,
                  color: e.target.value,
                },
              })
            }
          />
        )}

        <NumberInput
          helperText="Это необязательное поле, цена подтянется из базы данных"
          source="price"
        />

        {createdProduct.description?.brand && (
          <TextInput
            initialValue={fullName}
            onChange={(e) =>
              setCreatedProduct({ ...createdProduct, fullName: e.target.value })
            }
            source="fullName"
          />
        )}

        <ImageInput
          multiple
          source="pictures"
          label=""
          accept="image/*"
          placeholder={<p>Upload or Drop your images here</p>}
        >
          <ImageField source="url" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};

export default PostEdit;
