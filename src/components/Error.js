import React from "react";
import {useNavigate, Link} from "react-router-dom";
import { HiEmojiSad } from "react-icons/hi";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  return (
    <div className="registrationWrapper">
      <Link to={'/products'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>      
      <div className="errorWrapper">
        <p className="errorMsg">Something went wrong(((</p>
        <div className="errorInfoMsgWrapper">
          <p className="errorInfoMsg">Occurred error :</p>
          <p className="errorInfoMsg">{error.message}</p>
        </div>
      </div>
      <HiEmojiSad className="errorImg" size={200}/>
    </div>
  );
};

export default ErrorFallback;