import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../CSS/SellerJoin.css';
import { Helmet } from 'react-helmet-async';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/LoadingBox/MessageBox';
import { SellerRegister } from '../../actions/userActions';
import Navbar from '../../components/Navbar/Navbar';
import Announcement from '../../components/Announcement/Announcement';
import Footer from '../../components/Footer/Footer';
import StoreMallDirectoryOutlinedIcon from '@mui/icons-material/StoreMallDirectoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import styled from 'styled-components';
import { mobile } from '../../ResponsiveDesign/responsive';
import OnlyLoading from '../../components/LoadingBox/OnlyLoading';
import { toast, ToastContainer } from 'react-toastify';

//

//

//

//
const Logo = styled.h1`
  text-decoration: none;
  font-weight: bold;
  font-size: 40px;
  color: #000;
  font-family: 'Urbanist', sans-serif;
  cursor: pointer;
  ${mobile({ fontSize: '30px' })}
  & a {
    text-decoration: none;
    color: #000;
  }
  &:hover {
    filter: brightness(1.2);
  }
`;

export default function SellerJoin() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [isSeller, setisSeller] = useState(false);
  const [username, setUserame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warn(
        'A jelszavak nem egyeznek. Próbáld újra —— Passwords does not match. Try again',
        {
          theme: 'dark',
        }
      );
    } else {
      dispatch(SellerRegister(name, isSeller, username, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate('/store/verification');
    }
  }, [navigate, redirect, userInfo]);
  const lang = localStorage.getItem('lang' || 'HU');
  // {lang === 'EN' ? 'English' : 'HUN'}

  let Go2SellerForm = useRef();
  const onClickSellerBTN = async (e) => {
    e.preventDefault();
    window.scrollTo({
      behavior: 'smooth',
      top: Go2SellerForm.current.offsetTop,
    });
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <ToastContainer position="bottom-center" limit={1} />
      <div className="Main-Container">
        <Helmet>
          <title>
            {lang === 'EN' ? 'Open a Store' : 'Nyisson meg egy boltot'}
          </title>
        </Helmet>
        {/* {loading && <LoadingBox></LoadingBox>} */}

        <div className="WebDiv">
          <div className="seller_main_container_join">
            <div className="Seller_top_msg">
              {' '}
              {/* <Logo>
                <Link to="/index">Zalazon.</Link>
              </Logo> */}
              <div className="seller_join_divs_container">
                <div className="seller_join_div_left">
                  <h1>
                    {lang === 'EN' ? 'Sell Your Products' : 'Adja el termékeit'}
                  </h1>
                  <h1>
                    <span className="Online4free">
                      {' '}
                      {lang === 'EN' ? ' Online For Free!' : 'Online ingyen!'}
                    </span>
                  </h1>
                  <button
                    className="seller_join_now_btn"
                    type="submit"
                    onClick={onClickSellerBTN}
                  >
                    {lang === 'EN'
                      ? ' Open a Store Now'
                      : 'Nyisson meg egy online áruházat'}
                    <i className="bx bx-right-arrow-alt"></i>
                  </button>
                  <p>
                    {lang === 'EN'
                      ? ' Zalazon is an online marketplace with an aim to promote online selling and buying, for artisans, artists and manufacturers with a focus on e-commerce. Zalazon aims to empower the sellers, satisfy the customer and make online business professional, easy and fast.'
                      : 'A Zalazon egy online piactér, amelynek célja az online értékesítés és vásárlás népszerűsítése kézművesek, művészek és gyártók számára, az e-kereskedelemre fókuszálva. A Zalazon célja, hogy felhatalmazza az eladókat, kielégítse az ügyfeleket, és professzionálissá, egyszerűvé és gyorssá tegye az online üzletet.'}
                  </p>
                </div>
                <div className="seller_join_div_right">
                  <img
                    src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660687716/avatars/pexels-photo-7857499_dj8leb.webp"
                    alt=""
                  />
                </div>
              </div>
              <div className="expand_with_zalazon_DIV">
                <div className="expand_with_zalazon">
                  {lang === 'EN' ? (
                    <>Expand your Business</>
                  ) : (
                    'Bővítse vállalkozását'
                  )}
                </div>
                <div className="expand_with_zalazon_line2">
                  {lang === 'EN' ? <>with Zalazon.</> : 'Zalazonnal.'}
                </div>
                <div className="expand_with_zalazon_img_div">
                  <img
                    src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660687716/avatars/pexels-photo-7857491_p9mvkw.jpg"
                    alt=""
                    className="expand_with_zalazon_img"
                  />
                  <div className="expand_with_zalazon_img_right_div">
                    {lang === 'EN' ? (
                      <>
                        ✔ Get a free and easy-to-manage online store account.
                        with advanced features.
                        <br /> ✔ Store Analytics.
                        <br /> ✔ Easy and secure payment.
                        <br /> ✔ Sell in whole Hungary.
                        <br /> ✔ Deliver on your own or by us (No restriction).
                        <br /> ✔ Easy and efficient services.
                        <br /> ✔ No hidden fees.
                        <br /> ✔ We bring trust and commitment.
                        <br /> ✔ Follow a store, unfollow a store, Store-Feeds
                        and more features.
                      </>
                    ) : (
                      <>
                        ✔ Szerezzen ingyenes és könnyen kezelhető online áruházi
                        fiókot speciális funkciókkal.
                        <br /> ✔ Store Analytics.
                        <br /> ✔ Könnyű és biztonságos fizetés.
                        <br /> ✔ Magyarország egész területén eladó.
                        <br /> ✔ Szállítás saját kezűleg vagy nálunk (korlátozás
                        nélkül).
                        <br /> ✔ Egyszerű és hatékony szolgáltatások.
                        <br /> ✔ Nincsenek rejtett díjak.
                        <br /> ✔ Bizalmat és elkötelezettséget hozunk.
                        <br /> ✔ Kövessen egy üzletet, ne kövessen egy üzletet,
                        áruházi hírcsatornákat és egyebeket
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="how_this_works_zalazon">
                {lang === 'EN' ? (
                  <>How this all Works?</>
                ) : (
                  'Hogyan működik ez az egész?'
                )}
                <div className="step_join_cont_align">
                  <div className="step_join_1">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660717406/Zalazon_Icons/step-1_dnyxo8.png"
                        alt=""
                        className="step_join_img"
                      />
                      <div className="step_join_num">01</div>
                      <div className="step_join_title">
                        {lang === 'EN' ? <>Registration</> : <>Regisztráció</>}
                      </div>
                      <div className="step_join_para">
                        {lang === 'EN' ? (
                          <>
                            Fill in all required details and register your
                            online store.
                          </>
                        ) : (
                          <>
                            Töltse ki az összes szükséges adatot, és
                            regisztrálja online áruházát.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="step_join_2">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660717406/Zalazon_Icons/step-2_iuak00.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">02</div>
                      <div className="step_join_title">
                        {lang === 'EN' ? <>Verification</> : <>Igazolás</>}
                      </div>
                      <div className="step_join_para">
                        {lang === 'EN' ? (
                          <>
                            {' '}
                            Zalazon. will check portfolio and reach out to you
                            with a <i>Seller Contract</i>.
                          </>
                        ) : (
                          <>
                            Zalazon. ellenőrzi a portfóliót, és megkeresi Önt
                            egy <i>eladói szerződéssel</i>.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="step_join_3">
                    <div className="step_join_content_cont">
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660717406/Zalazon_Icons/step-3_lvuvyo.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">03</div>
                      <div className="step_join_title">
                        {lang === 'EN' ? (
                          <> Start selling</>
                        ) : (
                          <>Kezdje el az értékesítést</>
                        )}
                      </div>
                      <div className="step_join_para">
                        {lang === 'EN' ? (
                          <>
                            {' '}
                            After your portfolio verification, you can start
                            uploading your products and start selling them.
                          </>
                        ) : (
                          <>
                            A portfólió ellenőrzése után megkezdheti termékeinek
                            feltöltését és értékesítését.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="step_join_cont_align">
                  <div className="step_join_1">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660719676/Zalazon_Icons/step-4_ndzgql.png"
                        alt=""
                        className="step_join_img"
                      />
                      <div className="step_join_num">04</div>
                      <div className="step_join_title">
                        {lang === 'EN' ? (
                          <> Quality Check</>
                        ) : (
                          <>Minőség ellenőrzés</>
                        )}
                      </div>
                      <div className="step_join_para">
                        {lang === 'EN' ? (
                          <>
                            {' '}
                            All products uploaded by any store or seller which
                            be checked periodically will time and it meets our{' '}
                            <i>Standards</i>.
                          </>
                        ) : (
                          <>
                            Bármely üzlet vagy eladó által feltöltött összes
                            termék, amelyet rendszeresen ellenőrizni kell,
                            időnként megfelel, és megfelel a{' '}
                            <i>szabványainknak</i>.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="step_join_2">
                    <div className="step_join_content_cont">
                      {' '}
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660719676/Zalazon_Icons/step-5_r73vma.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">05</div>
                      <div className="step_join_title">
                        {lang === 'EN' ? (
                          <>Features & Settings</>
                        ) : (
                          <>Funkciók és beállítások</>
                        )}
                      </div>
                      <div className="step_join_para">
                        {lang === 'EN' ? (
                          <>
                            With time, we are adding more advanced features for
                            both our sellers and customers.
                          </>
                        ) : (
                          <>
                            Idővel fejlettebb funkciókat adunk hozzá eladóink és
                            vásárlóink számára.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="step_join_3">
                    <div className="step_join_content_cont">
                      <img
                        src="https://res.cloudinary.com/kkn-cloudinary/image/upload/v1660719953/Zalazon_Icons/step-7_ezqmyr.png"
                        alt=""
                        className="step_join_img"
                      />{' '}
                      <div className="step_join_num">06</div>
                      <div className="step_join_title">
                        {lang === 'EN' ? (
                          <>Have fun selling online</>
                        ) : (
                          <>Jó szórakozást az online értékesítéshez</>
                        )}
                      </div>
                      <div className="step_join_para">
                        {lang === 'EN' ? (
                          <>
                            {' '}
                            Have your own business and stay connected with your
                            clients and have fun together.
                          </>
                        ) : (
                          <>
                            Legyen saját vállalkozása, maradjon kapcsolatban
                            ügyfeleivel, és érezze jól magát együtt.
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="msg_top_zalazon">
                {/* {lang === 'EN' ? (
                  <>
                    Start your online business at <b>Zalazon</b>
                  </>
                ) : (
                  <>
                    Indítsa el online vállalkozását a <b>Zalazonnál</b>
                  </>
                )} */}
                {lang === 'EN' ? 'Why Zalazon?' : 'Miért Zalazon?'}
              </h1>
              {/* <h5 className="why_zalazon_">
                {lang === 'EN' ? 'Why Zalazon. ?' : 'Miért Zalazon. ?'}
              </h5> */}
              <div className="msg_itemsDIV">
                <div
                  className="item_list_seller_store anim-bg-gradient"
                  // style={{ backgroundColor: '#00ed5f' }}
                >
                  <StoreMallDirectoryOutlinedIcon />

                  {lang === 'EN'
                    ? 'Free Store Setup'
                    : 'Ingyenes boltbeállítás'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient1"
                  // style={{ backgroundColor: '#00edd7' }}
                >
                  <MonetizationOnOutlinedIcon />
                  {lang === 'EN'
                    ? 'Sell at 0% Commission'
                    : 'Eladás 0% jutalékkal'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient2"
                  // style={{ backgroundColor: '#deed00' }}
                >
                  <CheckCircleOutlineOutlinedIcon />
                  {lang === 'EN'
                    ? 'Trust & Commitment'
                    : 'Bizalom és elkötelezettség'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient3"
                  // style={{ backgroundColor: '#ea19ed' }}
                >
                  <FmdGoodOutlinedIcon />
                  {lang === 'EN'
                    ? '  Sell in Whole Hungary'
                    : 'Eladó egész Magyarországon'}
                </div>
                <div
                  className="item_list_seller_store anim-bg-gradient4"
                  // style={{ backgroundColor: '#71f7a7' }}
                >
                  <ElectricBoltOutlinedIcon />
                  {lang === 'EN'
                    ? 'Fast, Easy, & Efficient Services'
                    : 'Gyors, egyszerű és hatékony szolgáltatások'}
                </div>
              </div>
            </div>

            <div className="seller_inside_info_cont">
              {/* <div className="left_seller">
               
              </div> */}

              <div className="center_seller" ref={Go2SellerForm}>
                <div className="container_seller_reg">
                  <h1>
                    {lang === 'EN'
                      ? 'STORE REGISTRATION'
                      : 'ONLINE ÁRUHÁZ REGISZTRÁCIÓ'}
                  </h1>{' '}
                  {/* {error && <MessageBox variant="danger">{error}</MessageBox>} */}
                  <div className="form_outer_seller">
                    <form onSubmit={submitHandler}>
                      {/* <i
                        onClick={toggleOrderDIV}
                        className={
                          join_div_1
                            ? 'fa-solid fa-circle-chevron-up down_arrow_order_color'
                            : 'fa-solid fa-circle-chevron-down down_arrow_order_color'
                        }
                      ></i> */}

                      {/* <div
                        className={
                          join_div_1
                            ? 'Signinpage_seller slide-page join_div_1_content_hide'
                            : 'Signinpage_seller slide-page join_div_1_content'
                        }
                      > */}
                      <div className="Signinpage_seller slide-page join_div_1_content">
                        <br />
                        <div className="field_input_container">
                          <fieldset className="zalazon_agree_check">
                            <legend>
                              {' '}
                              {lang === 'EN'
                                ? 'Open a store at Zalazon. ?'
                                : 'Nyiss üzletet Zalazon. ?'}
                            </legend>

                            <div>
                              <input
                                type="radio"
                                id="yes"
                                name="yes"
                                value={true}
                                onChange={(e) => setisSeller(e.target.value)}
                              />

                              <label for="yes">
                                {' '}
                                {lang === 'EN' ? 'Yes' : 'Igen'}
                              </label>
                            </div>
                          </fieldset>
                          <div className="without_field_input_container">
                            <div className="field">
                              <div className="Signinlabel">
                                {lang === 'EN'
                                  ? ' Your Full Name'
                                  : 'A teljes neved'}
                              </div>
                              <input
                                type="text"
                                id="name"
                                placeholder={
                                  lang === 'EN'
                                    ? ' Your Full Name'
                                    : 'A teljes neved'
                                }
                                required
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>

                            <div className="field">
                              <div className="Signinlabel">
                                {' '}
                                {lang === 'EN' ? 'username' : 'felhasználónév'}
                              </div>
                              <input
                                type="username"
                                id="username"
                                placeholder={
                                  lang === 'EN'
                                    ? 'Enter username'
                                    : 'Adja meg felhasználónevét'
                                }
                                required
                                onChange={(e) => setUserame(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="field">
                          <div className="Signinlabel">Email</div>
                          <input
                            type="email"
                            id="email"
                            placeholder={
                              lang === 'EN'
                                ? 'Enter Email'
                                : 'Írja be az e-mail címet'
                            }
                            required
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="pass_field_input_container">
                          <div className="field">
                            <div className="Signinlabel">
                              {lang === 'EN' ? 'Password' : 'Jelszó'}
                            </div>
                            <input
                              type="password"
                              placeholder={
                                lang === 'EN'
                                  ? 'Enter Password'
                                  : 'Írd be a jelszót'
                              }
                              required
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="field">
                            <div className="Signinlabel">
                              {lang === 'EN'
                                ? ' Confirm Password'
                                : 'Jelszó megerősítése'}
                            </div>
                            <input
                              type="password"
                              id="confirmPassword"
                              placeholder={
                                lang === 'EN'
                                  ? 'Enter Confirm Password'
                                  : 'Írja be a Jelszó megerősítését'
                              }
                              required
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <center>
                          {error ? (
                            <div className="error_reg_mgs_div_seller">
                              <div>{error}</div>
                            </div>
                          ) : (
                            ''
                          )}
                          <br />
                        </center>
                        <div className="field_seller">
                          {/* <button
                            className="firstNext next"
                            onClick={toggleOrderDIV}
                          >
                            {lang === 'EN' ? 'Next' : 'Következő'}
                          </button> */}
                          <button
                            className="firstNext next"
                            type="submit"
                            disabled={loading ? true : false}
                          >
                            {loading ? (
                              <>
                                <OnlyLoading />
                              </>
                            ) : (
                              <> {lang === 'EN' ? ' Confirm' : ' Megerősít'}</>
                            )}
                          </button>
                        </div>
                        <div className="mb-3">
                          {lang === 'EN'
                            ? 'Already have an account? '
                            : 'Már van fiókja? '}
                          <Link to={`/signin?redirect=${redirect}`}>
                            {lang === 'EN' ? ' Sign-In' : ' Bejelentkezés'}
                          </Link>
                        </div>
                      </div>
                      {/* {join_div_1 && (
                        <div className="">
                          <button
                            className="join_previos_next_btn"
                            onClick={toggleOrderDIV}
                          >
                            {lang === 'EN'
                              ? 'Show Previous'
                              : 'Előző megjelenítése'}
                          </button>
                          <div className="Signinpage_seller slide-page">
                            <div className="field">
                              <div className="Signinlabel">
                                {lang === 'EN'
                                  ? ' Phone Number'
                                  : 'Telefonszám'}
                              </div>
                              <input
                                type="password"
                                id="confirmPassword"
                                placeholder={
                                  lang === 'EN'
                                    ? 'Enter Your Phone Number'
                                    : 'Írja be a telefonszámát'
                                }
                                required
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )} */}
                    </form>
                  </div>
                </div>
              </div>

              {/* <div className="right_seller">left</div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
