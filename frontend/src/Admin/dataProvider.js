import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider("http://localhost:4000/api/v1");