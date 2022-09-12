import React, { useState } from "react";
import {
  Create,
  SimpleForm,
  ImageInput,
  ImageField,
  SelectInput,
  TextInput,
  NumberInput,
} from "react-admin";
import {
  validatePostForm,
  onTransform,
  brandOptions,
  getCategoryOptions,
  getModelOptions,
  getCapacityOptions,
  getColorOptions,
  productsWithCapacity,
  productsWithDiagonal,
  getDiagonalOptions,
  productsWithWiFi,
  getWiFiOptions,
  productsWithMemory,
  getMemoryOptions,
} from "../AdditionalFunctions/AdditionalFunctions";

const PostCreate = (props) => {
  const [createdProduct, setCreatedProduct] = useState({});

  const fullName = Object.values(createdProduct).join(" ");

  return (
    <Create {...props} transform={onTransform} title="Create a Product">
      <SimpleForm validate={validatePostForm}>
        <SelectInput
          onChange={(e) => setCreatedProduct({ brand: e.target.value })}
          source="description.brand"
          choices={brandOptions}
        />

        {createdProduct.brand && (
          <SelectInput
            onChange={(e) =>
              setCreatedProduct({ ...createdProduct, category: e.target.value })
            }
            source="description.category"
            choices={getCategoryOptions(createdProduct.brand)}
          />
        )}

        {createdProduct.category && (
          <SelectInput
            onChange={(e) =>
              setCreatedProduct({ ...createdProduct, model: e.target.value })
            }
            source="description.model"
            choices={getModelOptions(createdProduct.category)}
          />
        )}

        {productsWithDiagonal.includes(createdProduct.category) &&
          createdProduct.model && (
            <SelectInput
              choices={getDiagonalOptions(
                createdProduct.category,
                createdProduct.model.toLowerCase()
              )}
              onChange={(e) =>
                setCreatedProduct({
                  ...createdProduct,
                  diagonal: e.target.value,
                })
              }
              source="description.diagonal"
            />
          )}

        {productsWithWiFi.includes(createdProduct.category) &&
          createdProduct.model && (
            <SelectInput
              choices={getWiFiOptions(createdProduct.category)}
              onChange={(e) =>
                setCreatedProduct({
                  ...createdProduct,
                  wifi: e.target.value,
                })
              }
              source="description.wifi"
            />
          )}

        {productsWithCapacity.includes(createdProduct.category) &&
          createdProduct.model && (
            <SelectInput
              choices={getCapacityOptions(
                createdProduct.category,
                createdProduct.model.toLowerCase()
              )}
              onChange={(e) =>
                setCreatedProduct({
                  ...createdProduct,
                  capacity: e.target.value,
                })
              }
              source="description.capacity"
              helperText="Это SSD"
            />
          )}

        {productsWithMemory.includes(createdProduct.category) &&
          createdProduct.model && (
            <SelectInput
              choices={getMemoryOptions(
                createdProduct.category,
                createdProduct.model.toLowerCase()
              )}
              onChange={(e) =>
                setCreatedProduct({
                  ...createdProduct,
                  memory: e.target.value,
                })
              }
              source="description.memory"
              helperText="Это Оперативная память"
            />
          )}

        {productsWithCapacity.includes(createdProduct.category) &&
          createdProduct.model && (
            <SelectInput
              choices={getColorOptions(
                createdProduct.category,
                createdProduct.model.toLowerCase()
              )}
              onChange={(e) =>
                setCreatedProduct({ ...createdProduct, color: e.target.value })
              }
              source="description.color"
            />
          )}

        {createdProduct.model && (
          <NumberInput
            helperText="Это необязательное поле, цена подтянется из базы данных"
            source="price"
          />
        )}

        {createdProduct.brand && (
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
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};

export default PostCreate;
