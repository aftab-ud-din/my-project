// in src/App.tsx
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";

const AdminDashboard = () => {
    return(
        <Admin dataProvider={dataProvider}>
          {console.log("admin dashboard")}
        </Admin>
      );
}

export default AdminDashboard;