import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import AccountInfo from "../../components/Accountinfo/accountInfo";



const UserProfile = () => {

    return (
        <div >
            <Sidebar position='left'/>
            <AccountInfo/>
        </div>
    );
};

export default UserProfile;
