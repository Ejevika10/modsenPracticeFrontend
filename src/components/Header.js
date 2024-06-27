import React from 'react'
import { useNavigate } from "react-router-dom";
import { HiUserCircle, HiShoppingCart, HiLogout } from "react-icons/hi";

const Header = ({isLoggedIn, logoutHandler}) => {
  const navigate = useNavigate();
  const onProfileBtnClick = () => {
    navigate('/login');
  };
  const onOrdersBtnClick = () => {
    navigate('/orders');
  };

  return (
  <>
    <header className='header'>
      <div>
        {isLoggedIn 
          ?<HiShoppingCart onClick={onOrdersBtnClick} className='profileBtn' size={60}/>
          :<></>
        }
        {isLoggedIn 
          ?<HiLogout onClick={() => logoutHandler()} className='profileBtn' size={60}/>
          :<HiUserCircle onClick={onProfileBtnClick} className='profileBtn' size={60}/>
        }
      </div>
    </header>
    </>
  )
}

export default Header