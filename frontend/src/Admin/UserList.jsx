import React from 'react';
import { List, Datagrid, TextField, DateField, EmailField, UrlField, NumberField, Filter, TextInput } from 'react-admin';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="name" alwaysOn />
    </Filter>
);

const UserList = props => (
    <List {...props} filters={<UserFilter />}>
        <Datagrid rowClick="edit">
            <TextField source="username" label="登录名" />
            <TextField source="password" label="姓名" />
            <EmailField source="email" label="电子邮件" />
            <TextField source="isAdmin" label="角色" />
            <TextField source="walletBalance" label="电话" />
            <MyUrlField source="isVendor" label="网站" />
        </Datagrid>
    </List>
)

export default UserList