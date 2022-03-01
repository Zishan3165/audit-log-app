import React from 'react';
import { Image, OverlayTrigger, Popover, PopoverBody } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../utils/hooks/useAuth';

function UserMenuActions() {
  const navigate = useNavigate();
  function handleLogout() {
    removeAuth();
    navigate('/login');
  }

  const { auth, removeAuth } = useAuth();

  return (
    <>
      <div className="popover-title">{auth?.username}</div>
      <div className="popover-subtitle">{auth?.email}</div>
      <hr className="my-1" />
      <div onClick={handleLogout} className="popover-logout">
        Logout
      </div>
    </>
  );
}

export function UserAvatar() {
  return (
    <>
      <div className="user-profile  d-lg-block">
        <OverlayTrigger
          rootClose={true}
          trigger="click"
          placement="bottom"
          overlay={
            <Popover id="user-profile-popover">
              <PopoverBody style={{ background: 'primary' }}>
                <UserMenuActions />
              </PopoverBody>
            </Popover>
          }>
          <Image roundedCircle height="32px" src={'/user.webp'} alt="profile-photo" />
        </OverlayTrigger>
      </div>
      <div className="user-profile d-lg-none">
        <hr className="my-1" />
      </div>
    </>
  );
}
