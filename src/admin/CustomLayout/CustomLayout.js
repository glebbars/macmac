import * as React from 'react';
import { Layout, AppBar } from 'react-admin';
import UploadPrices from '../UploadPrices/UploadPrices'

const CustomAdminBar = props => (
    <AppBar {...props}>
        <UploadPrices/>
    </AppBar>
);

const CustomLayout = props => <Layout {...props} appBar={CustomAdminBar} />;

export default CustomLayout