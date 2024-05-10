import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <div className="p-1"><Cards />
      </div>
      <Table />
    </div>
  );
};

export default MainDash;
