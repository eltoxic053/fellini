import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import AccountInfo from "../../components/Accountinfo/accountInfo";
import Clock from "../../components/Clock/Clock";



const UserProfile = () => {

    return (
        <div >
            <Sidebar position='left'/>
            <AccountInfo/>
            <Clock position='left'/>
        </div>
    );
};

export default UserProfile;
