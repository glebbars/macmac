import * as React from 'react';
import { Layout, AppBar } from 'react-admin';
import { Box, Typography } from '@material-ui/core';
import { ToggleThemeButton } from '@react-admin/ra-preferences';

const CustomAdminBar = props => (
    <AppBar {...props}>
        {/* <Box flex="1">
            <Typography variant="h6" id="react-admin-title"></Typography>
        </Box> */}
        <ToggleThemeButton />
    </AppBar>
);

export default CustomLayout = props => <Layout {...props} appBar={CustomAdminBar} />;