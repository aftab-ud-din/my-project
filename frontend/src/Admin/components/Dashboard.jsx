import React from 'react'
import Sidebar from './Sidebar'
import MainDash from './MainDash/MainDash';
import RightSide from './RigtSide/RightSide';


const Dashboard = () => {
return (
    <div className="App">
        <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        <RightSide/>
        </div>
    </div>
    );
}

export default Dashboard