import React, { useContext } from 'react';
import './Navbar.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { Store } from '../../api/Store';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { WishList } from '../../Wish';

//

//

//
//
export const BottomMenu = ({ toggleSIdebar }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { cartState } = useContext(Store);
  const { cart } = cartState;
  const { wstate } = useContext(WishList);
  const { wishlist } = wstate;
  return (
    <>
      <div className="Botom_menu_container">
        <Link to="/feeds" className="CartBadgeColor">
          {' '}
          <div>
            {userInfo && (
              <>
                <Tippy content="Store Feeds" placement="top">
                  <FeedOutlinedIcon />
                </Tippy>
              </>
            )}
          </div>{' '}
        </Link>

        <Link to="/index" className="CartBadgeColor">
          {' '}
          <div>
            <Tippy content="Home" placement="top">
              <HomeOutlinedIcon />
            </Tippy>
          </div>
        </Link>
        <Link to="/cart" className="CartBadgeColor">
          <div>
            <Tippy content="Cart" placement="top">
              <ShoppingCartOutlinedIcon />
            </Tippy>

            {cart.cartItems.length > 0 && (
              <Badge
                badgeContent={cart.cartItems.length}
                color="primary"
                className="CartBadge"
              ></Badge>
            )}
          </div>
        </Link>
        <Link to="/wishlist" className="CartBadgeColor">
          <div>
            {' '}
            <Tippy content="Wishlist" placement="top">
              <FavoriteBorderOutlinedIcon />
            </Tippy>
            <Badge
              badgeContent={wishlist.wishistItem.length}
              color="primary"
              className="WishListBadge"
            />
          </div>
        </Link>
        <div>
          {' '}
          {userInfo ? (
            <img
              src={userInfo?.image}
              className="side_top_mob_user_img_bottom MenuOutlinedIconScreensFit"
              alt={userInfo?.name}
              onClick={toggleSIdebar}
            />
          ) : (
            <MenuOutlinedIcon
              onClick={toggleSIdebar}
              className="MenuOutlinedIconScreensFit"
            />
          )}
        </div>
      </div>
    </>
  );
};
