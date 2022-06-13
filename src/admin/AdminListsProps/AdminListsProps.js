import React from "react";
import { Pagination, TextInput} from 'react-admin'

export const CustomPagination = props => <Pagination rowsPerPageOptions={[5, 10, 25, 50, 100, 200]} {...props} />;

export const customFilters = [
  <TextInput label="Search" source="q" alwaysOn />
];