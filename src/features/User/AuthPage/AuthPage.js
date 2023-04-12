import React, { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import favicon from '../../../assets/images/icons/logoAuth.ico'
import './AuthPage.css'

import { loginUser, registerUser } from '../../../api/User/apiAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notifyInfo, notifySuccess, notifyWarn } from '../../../components/Alert/AlertComponent'
import { Link } from 'react-router-dom'
import Favicon from 'react-favicon'
//component
// import AlertAuthStatus from './AlertAuthStatus'

export default function AuthPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //Animation toggle

    const redirectToLoginRef = useRef(null)
    const divContainerRef = useRef(null)
    const handleShowSignIn = () => {
        divContainerRef.current.classList.remove('right-panel-active')

        document.title = 'Sign In'
    }
    const handleShowSignUp = () => {
        divContainerRef.current.classList.add('right-panel-active')
        document
            .querySelector('.resSignUp')
            .classList.add('right-panel-active2')

        document.title = 'Sign Up'
    }

    const [usernameSignIn, setUsernameSignIn] = useState('')
    const [passwordSignIn, setPasswordSignIn] = useState('')

    const handleLogin = async () => {
        if (!usernameSignIn) {
            notifyWarn('Thiếu tên đăng nhập!')
            return
        }
        if (!passwordSignIn) {
            notifyWarn('Thiếu mật khẩu!')
            return
        }
        if (usernameSignIn && passwordSignIn) {
            const user = {
                username: usernameSignIn,
                password: passwordSignIn,
            }
            // setTimeout(,2000)
            await loginUser(user, dispatch, navigate)

            return
        }
    }
    //Fix


    const [usernameSignUp, setUsernameSignUp] = useState('')
    const [userFullNameSignUp, setUserFullNameSignUp] = useState('')
    const [passwordSignUp, setPasswordSignUp] = useState('')

    const handleSignUp = async () => {
        if (!usernameSignUp) {
            notifyWarn('Thiếu tên đăng nhập!')
            return
        }
        if (!passwordSignUp) {
            notifyWarn('Thiếu mật khẩu!')
            return
        }
        if (usernameSignUp && passwordSignUp) {
            const nawUser = {
                fullName: userFullNameSignUp,
                username: usernameSignUp,
                password: passwordSignUp,
            }
            await registerUser(nawUser, dispatch)
            setUsernameSignUp('')
            setPasswordSignUp('')
            redirectToLoginRef.current.click()
            return
        }
    }



    return (
        <>

            <Helmet>
                <title>Login</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <Favicon url={favicon} />


            <div className="bodyAuth">

                <div
                    ref={divContainerRef}
                    className="resContainer container-auth bg-white rounded-[10px] shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22) relative overflow-hidden w-[768px] max-w-full min-h-[480px] "
                >
                    <div className="sign-up-container absolute top-0 h-full transition-all duration-[600ms] ease-in-out z-[1] left-0 opacity-0 w-1/2">
                        <form
                            className="resSignUp bg-white flex items-center justify-center flex-col py-0 px-[50px] h-full text-center"
                            action="#"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <h1 className="font-bold m-0">Đăng Kí</h1>
                            {/* <div className="social-container">
                            <a href="#" className="social social--facebook"><i className="social__icon fab fa-facebook-f"></i></a>
                            <a href="#" className="social social--google"><i className="social__icon fab fa-google-plus-g"></i></a>
                            <a href="#" className="social social--github"><i className="social__icon fa-brands fa-github"></i></a>
                        </div>
                        <span>hoặc sử dụng email của bạn để đăng kí</span> */}
                            <input
                                className="bg-[#eee] border-none px-[12px] py-[15px] mx-[0px] my-[8px] w-full"
                                type="text"
                                placeholder="Họ & tên"
                                value={userFullNameSignUp}
                                onChange={(e) =>
                                    setUserFullNameSignUp(e.target.value)
                                }
                                required
                            />
                            <input
                                className="bg-[#eee] border-none px-[12px] py-[15px] mx-[0px] my-[8px] w-full"
                                type="text"
                                placeholder="Tên đăng nhập"
                                value={usernameSignUp}
                                onChange={(e) =>
                                    setUsernameSignUp(e.target.value)
                                }
                                required
                            />
                            {/* <input type="Tên đăng nhập" placeholder="Email" required /> */}
                            <input
                                className="bg-[#eee] border-none px-[12px] py-[15px] mx-[0px] my-[8px] w-full"
                                type="password"
                                placeholder="Mật khẩu"
                                value={passwordSignUp}
                                id="passwordSignUp"
                                onChange={(e) =>
                                    setPasswordSignUp(e.target.value)
                                }
                                required
                            />
                            <i
                                className="fa-solid fa-eye"
                                id="togglePasswordSignUp"
                                style={{
                                    marginLeft: '250px',
                                    marginTop: '-38px',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    const password =
                                        document.querySelector(
                                            '#passwordSignUp',
                                        )
                                    const type =
                                        password.getAttribute('type') ===
                                            'password'
                                            ? 'text'
                                            : 'password'
                                    password.setAttribute('type', type)
                                    if (password.getAttribute('type') ===
                                        'text') {
                                        e.target.classList.remove('fa-solid', 'fa-eye')
                                        e.target.classList.add('fa-solid', 'fa-eye-slash')

                                    } else {
                                        e.target.classList.remove('fa-solid', 'fa-eye-slash')
                                        e.target.classList.add('fa-solid', 'fa-eye')

                                    }
                                }}
                            ></i>

                            <button
                                style={{ marginTop: '20px' }}
                                className="rounded-[20px] border-[1px] border-solid border-[#ff4b2b] bg-[#ff4b2b] text-white font-bold py-[12px] px-[45px]  tracking-[1px] uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95] focus:outline-none "
                                onClick={handleSignUp}
                            >
                                ĐĂNG KÍ
                            </button>
                            <p>
                                Bạn đã có tài khoản?{' '}
                                <span onClick={handleShowSignIn} className="cursor-pointer hover:text-[#ff4b2b]">
                                    {' '}
                                    Đăng nhập
                                </span>
                            </p>
                        </form>
                    </div>
                    <div className="sign-in-container  absolute top-0 h-full transition-all duration-[600ms] ease-in-out left-0 w-1/2 z-[2] ">
                        <form
                            className="bg-white flex items-center justify-center flex-col py-0 px-[50px] h-full text-center"
                            action="#"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <h1 className="font-bold m-0">Đăng nhập</h1>
                            {/* <div className="social-container">
                            <a href="#" className="social social--facebook"><i className="social__icon fab fa-facebook-f"></i></a>
                            <a href="#" className="social social--google"><i className="social__icon fab fa-google-plus-g"></i></a>
                            <a href="#" className="social social--github"><i className="social__icon fa-brands fa-github"></i></a>
                        </div>
                        <span>hoặc sử dụng email của bạn</span> */}

                            <input
                                className="bg-[#eee] border-none px-[12px] py-[15px] mx-[0px] my-[8px] w-full"
                                type="text"
                                placeholder="Tên đăng nhập"
                                required
                                value={usernameSignIn}
                                onChange={(e) =>
                                    setUsernameSignIn(e.target.value)
                                }
                            />
                            <input
                                className="bg-[#eee] border-none px-[12px] py-[15px] mx-[0px] my-[8px] w-full"
                                type="password"
                                placeholder="Mật khẩu"
                                id="passwordSignIn"
                                required
                                value={passwordSignIn}
                                onChange={(e) =>
                                    setPasswordSignIn(e.target.value)
                                }
                            />
                            <i
                                className="fa-solid fa-eye"
                                id="togglePasswordSignIn"
                                style={{
                                    marginLeft: '250px',
                                    marginTop: '-38px',
                                    cursor: 'pointer',
                                }}
                                onClick={(e) => {
                                    const password =
                                        document.querySelector(
                                            '#passwordSignIn',
                                        )
                                    const type =
                                        password.getAttribute('type') ===
                                            'password'
                                            ? 'text'
                                            : 'password'
                                    password.setAttribute('type', type)
                                    if (password.getAttribute('type') ===
                                        'text') {
                                        e.target.classList.remove('fa-solid', 'fa-eye')
                                        e.target.classList.add('fa-solid', 'fa-eye-slash')

                                    } else {
                                        e.target.classList.remove('fa-solid', 'fa-eye-slash')
                                        e.target.classList.add('fa-solid', 'fa-eye')

                                    }
                                }}
                            ></i>
                            {/* <a href="#" className=" hover:text-[#ff4b2b] hover:text-decoration-line">Quên tài khoản của bạn?</a> */}
                            <button
                                style={{ marginTop: '20px' }}
                                onClick={handleLogin}
                                className="rounded-[20px] border-[1px] border-solid border-[#ff4b2b] bg-[#ff4b2b] text-white font-bold py-[12px] px-[45px]  tracking-[1px] uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95] focus:outline-none "
                            >
                                Đăng nhập
                            </button>
                            <p className="text-black z-10">
                                Bạn chưa có tài khoản?{' '}
                                <span onClick={handleShowSignUp} className="cursor-pointer hover:text-[#ff4b2b]">Đăng ký</span>
                            </p>
                        </form>
                    </div>
                    <div className="overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-[600ms] ease-in-out z-50">
                        <div className=" overlay bg-[#ff416c] bg-gradient-to-tr from-[#ff4b2b] to-[#ff416c] bg-no-repeat bg-cover bg-left-top text-white relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-[600ms] ease-in-out ">
                            <div className="overlay-left absolute flex items-center justify-center flex-col text-center top-0 h-full w-1/2 translate-x-0 transition-transform duration-[600ms] ease-in-out  translate-x-1/5">
                                <h1 className="font-bold m-0">
                                    Chào mừng bạn trở lại!
                                </h1>
                                <p className="text-[14px] font-thin leading-[20px] tracking-[0.5px] mt-[20px] mx-0 mb-[30px]">
                                    Để giữ kết nối với chúng tôi, vui lòng đăng
                                    nhập bằng tài khoản cá nhân của bạn
                                </p>
                                <button
                                    className="rounded-[20px] border-[1px] border-solid border-white bg-transparent text-white font-bold py-[12px] px-[45px]  tracking-[1px] uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95] focus:outline-none "
                                    id="signIn"
                                    onClick={handleShowSignIn}
                                    ref={redirectToLoginRef}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                            <div className="overlay-right absolute flex items-center justify-center flex-col text-center top-0 h-full w-1/2 translate-x-0 transition-transform duration-[600ms] ease-in-out translate-x-0 right-0 ">
                                <h1 className="font-bold m-0">Xin chào!</h1>
                                <p className="text-[14px] font-thin leading-[20px] tracking-[0.5px] mt-[20px] mx-0 mb-[30px]">
                                    Đăng kí tài khoản của bạn và bắt đầu hành
                                    trình cùng với chúng tôi
                                </p>
                                <button
                                    className="rounded-[20px] border-[1px] border-solid border-white bg-transparent text-white font-bold py-[12px] px-[45px]  tracking-[1px] uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95] focus:outline-none "
                                    id="signUp"
                                    onClick={handleShowSignUp}
                                >
                                    Đăng kí
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
// {/* <div classNameName={styles.container} id="containerFix">
// <div classNameName={clsx(styles.formContainer, clsx.signUpContainer)}>
//     <form action="#">
//         <h1>Tạo tài khoản</h1>
//         {/* <div classNameName="social-container">
//             <a href="#" classNameName="social social--facebook"><i classNameName="social__icon fab fa-facebook-f"></i></a>
//             <a href="#" classNameName="social social--google"><i classNameName="social__icon fab fa-google-plus-g"></i></a>
//             <a href="#" classNameName="social social--github"><i classNameName="social__icon fa-brands fa-github"></i></a>
//         </div>
//         <span>hoặc sử dụng email của bạn để đăng kí</span> */}
//         <input type="text" placeholder="Tên đăng nhập" required value={username} onChange={(e) => setUsername(e.target.value)} />
//         {/* <input type="email" placeholder="Email" required /> */}
//         <input type="password" placeholder="Mật khẩu" required value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button>ĐĂNG KÍ</button>
//     </form>
// </div>
// <div classNameName={clsx(styles.formContainer, clsx.signInContainer)}>
//     <form action="#">
//         <h1>Đăng nhập</h1>
//         {/* <div classNameName="social-container">
//             <a href="#" classNameName="social social--facebook"><i classNameName="social__icon fab fa-facebook-f"></i></a>
//             <a href="#" classNameName="social social--google"><i classNameName="social__icon fab fa-google-plus-g"></i></a>
//             <a href="#" classNameName="social social--github"><i classNameName="social__icon fa-brands fa-github"></i></a>
//         </div>
//         <span>hoặc sử dụng email của bạn</span> */}
//         <input type="email" placeholder="Tên đăng nhập" required />
//         <input type="password" placeholder="Mật khẩu" required />
//         <a href="#" classNameName={styles.fgpass}>Quên tài khoản của bạn?</a>
//         <button >Đăng nhập</button>
//     </form>
// </div>
// <div classNameName={styles.overlayContainer}>
//     <div classNameName={styles.overlay}>
//         <div classNameName={clsx(styles.overlayPanel, styles.overlayLeft)}>
//             <h1>Chào mừng bạn trở lại!</h1>
//             <p>Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng tài khoản cá nhân của bạn</p>
//             <button classNameName={styles.ghost} id="signIn">Đăng nhập</button>
//         </div>
//         <div classNameName={clsx(styles.overlayPanel, styles.overlayRight)}>
//             <h1>Xin chào!</h1>
//             <p>Đăng kí tài khoản của bạn và bắt đầu hành trình cùng với chúng tôi</p>
//             <button classNameName={styles.ghost} id="signUp">Đăng kí</button>
//         </div>
//     </div>
// </div>
// </div> */}
