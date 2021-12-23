import React, { useState, useEffect } from "react";
import AppRoutes from "../../routes/AppRoutes";
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput } from 'react-admin';
import BookIcon from '@material-ui/icons/Book';

export const PostIcon = BookIcon;

const PostList = (props) => (
  <List {...props}>
      <Datagrid>
          <TextField source="id" />
          <TextField source="title" />
          <DateField source="published_at" />
          <TextField source="average_note" />
          <TextField source="views" />
          <EditButton basePath="/posts" />
      </Datagrid>
  </List>
);

const PostTitle = ({ record }) => {
  return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

 const PostEdit = (props) => (
  <Edit title={<PostTitle />} {...props}>
      <SimpleForm>
          <TextInput disabled source="id" />
          <TextInput source="title" />
          <TextInput source="teaser" options={{ multiline: true }} />
          <TextInput multiline source="body" />
          <DateInput label="Publication date" source="published_at" />
          <TextInput source="average_note" />
          <TextInput disabled label="Nb views" source="views" />
      </SimpleForm>
  </Edit>
);

const PostCreate = (props) => (
  <Create title="Create a Post" {...props}>
      <SimpleForm>
          <TextInput source="title" />
          <TextInput source="teaser" options={{ multiline: true }} />
          <TextInput multiline source="body" />
          <TextInput label="Publication date" source="published_at" />
          <TextInput source="average_note" />
      </SimpleForm>
  </Create>
);

const GetData = () => {
  const [clothesList, setClothesList] = useState([]);

  useEffect(() => {
    fetch("/clothesArr.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setClothesList(data);
      });
  }, []);

  return (
    <>
      <Admin dataProvider={simpleRestProvider('http://localhost:3000')}>
        <Resource name="posts" list={PostList}/>
      </Admin>

      <AppRoutes cardsArr={clothesList} />
    </>
  );
};

export default GetData;
