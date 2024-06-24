import React from 'react'
import { useNavigate } from "react-router-dom";
import { HiUserCircle, HiShoppingCart,HiAdjustments, HiLogout } from "react-icons/hi";

const Header = ({isLoggedIn, logoutHandler}) => {
  const navigate = useNavigate();
  const onProfileBtnClick = () => {
    navigate('/login');
  };

  return (
    <header className='header'>
      <HiAdjustments onClick={onProfileBtnClick} className='profileBtn' size={60}/>
      <div>
        <HiShoppingCart onClick={onProfileBtnClick} className='profileBtn' size={60}/>
        {isLoggedIn 
          ?<HiLogout onClick={() => logoutHandler()} className='profileBtn' size={60}/>
          :<HiUserCircle onClick={onProfileBtnClick} className='profileBtn' size={60}/>
        }
      </div>
    </header>
  )
}

export default Header