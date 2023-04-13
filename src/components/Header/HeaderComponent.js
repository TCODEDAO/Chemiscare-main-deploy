import React, { memo } from "react"
import Avatar from "../Avatar/AvatarComponent"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { createAxios } from "../../utils/axiosJWT"
import { logOutUser } from "../../api/User/apiAuth"
import { notifyErorr, notifySuccess } from "../Alert/AlertComponent"
// import { notifyErorr, notifyInfo, notifySuccess } from '../Alert/AlertComponents'
import logoChemiscare from "../../assets/images/icons/chemiscare_logo-1.png"
import "./HeaderComponent.css"
import { useEffect } from "react"
function HeaderComponent({ currentUser }) {
    const accessToken = currentUser?.accessToken
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosJWT = createAxios(currentUser, dispatch)
    const id = currentUser?._id

    const isAdmin = useSelector((state) => state?.permission?.isAdmin)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") {
            handleDarkMode()
            return
        }
        handleLightMode()
    }, [])
    const handleLogOut = async () => {
        try {
            logOutUser(dispatch, navigate, accessToken, axiosJWT, id)
            notifySuccess("Đăng xuất thành công!")
        } catch {
            notifyErorr("Đăng xuất không thành công!")
        }
        return
    }

    const $ = document.querySelector.bind(document)

    const handleChangeThemeMode = () => {
        if ($("body").classList.contains("darkmode")) {
            handleLightMode()
            return
        }
        handleDarkMode()
    }
    const handleDarkMode = () => {
        localStorage.setItem("theme", "dark")

        $("body").classList.add("darkmode")
        $(".theme_mode_dark").style.color = "#fde047"
        $(".change_theme_mode_btn").style.borderColor = "#e8e8e8"
        // $(".search_bar").onfocus = () => {
        //     $(".search_bar_wrapper").style.borderColor = "#e8e8e8"
        // }
        // $(".search_bar").onblur = () => {
        //     $(".search_bar_wrapper").style.borderColor = "#ccc"
        // }
    }
    const handleLightMode = () => {
        localStorage.setItem("theme", "light")
        $("body").classList.remove("darkmode")
        $(".theme_mode_dark").style.color = "#1a1a1a"
        $(".change_theme_mode_btn").style.borderColor = "#333"
        // $(".search_bar").onfocus = () => {
        //     $(".search_bar_wrapper").style.borderColor = "#333"
        // }
        // $(".search_bar").onblur = () => {
        //     $(".search_bar_wrapper").style.borderColor = "#e8e8e8"
        // }
    }

    const handeShowHideMenu = () => {
        if ($(".user_menu").classList.contains("hidden")) {
            handleOpen($(".user_menu"), "block")
            return
        }

        handleClose($(".user_menu"), "block")
    }

    const handleOpen = (e, status) => {
        e.classList.remove("hidden")
        e.classList.add(status)
    }
    const handleClose = (e, status) => {
        e.classList.remove(status)
        e.classList.add("hidden")
    }
    return (

        <header className='header-react-tour header flex fixed top-0 left-0 right-0 py-[8px] border-solid border-[1px] border-[#e8ebed] items-center px-[20px] justify-between bg-[#fff] z-[100] box-'>

            {" "}
            <div className='flex items-center'>
                <Link to='/learn'>
                    <img
                        src={logoChemiscare}
                        alt=''
                        className='logo_img w-[44px] h-[44px] mr-[8px] rounded-[8px] inline-block'
                    />
                    <p className='font-bold text-[24px] logo_text logo_text_onHeader inline-block'>
                        {" "}
                        Chemiscare{" "}
                    </p>
                </Link>
                <i className="p-2 z-50 fa-solid fa-bars text-[24px] hidden nav_open_btn cursor-pointer"

                    onClick={() => {
                        handleOpen($('.nav_onTablet'), 'block');
                    }}></i>
            </div>


            {/* <div className='w-[400px] flex items-center border-[#e8e8e8] border-[2px] border-solid rounded-[20px] pl-[8px] pr-[16px] overflow-hidden search_bar_wrapper'>
                <i className='fa-solid fa-magnifying-glass search_icon mr-[8px] text-[#777]'></i>
                <input
                    className='grow h-[34px] outline-none search_bar bg-[transparent]'
                    type='text'
                    placeholder='Tìm kiếm trên trang web...'
                />
            </div> */}
            <div>
                <div className='flex items-center'>
                    <div
                        className='border-solid border-[2px] h-[20px] w-[20px] rounded-[50%] change_theme_mode_btn cursor-pointer flex items-center justify-center'
                        onClick={handleChangeThemeMode}
                    >
                        <i className='fa-solid fa-moon theme_mode_dark'></i>
                    </div>
                    <p className={`font-semibold mx-[16px] header_myRank_btn text-[#1a1a1a] cursor-pointer bg-[#E0F2FE] px-[16px] py-[6px] rounded-[20px] viewMyRank_btn ${currentUser ? '' : 'hidden'}`} >
                        <Link to='/learn/rate'>Xếp hạng của tôi</Link>
                    </p>

                    {currentUser ? (
                        <div
                            className='relative user_menu_wrapper'
                            onClick={handeShowHideMenu}
                        >
                            <div className=' cursor-pointer hover:opacity-80 duration-200'>
                                <Avatar
                                    size='44px'
                                    round='50%'
                                    textSizeRatio={1.75}
                                    name={currentUser?.fullName}
                                ></Avatar>
                            </div>
                            <ul className='hidden absolute user_menu rounded-[16px] py-[8px] px-[16px] right-0 w-[240px] bg-[#fff]'>
                                <li className='flex cursor-pointer user_menu_item hover:text-[#000] items-center px-[20px] py-[8px]'>
                                    <Avatar
                                        size='44px'
                                        round='50%'
                                        textSizeRatio={1.75}
                                        name={currentUser?.fullName}
                                    ></Avatar>
                                    <div className='pl-2'>
                                        <p className='font-bold text-[16px] user_menu_userName'>
                                            {currentUser?.fullName}
                                        </p>
                                        <p className='text-[14px] font-light user_menu_userSchool'>
                                            {
                                                currentUser
                                                    ?.detailUserInfomation
                                                    ?.location?.school
                                            }
                                        </p>
                                    </div>
                                </li>
                                <li className='flex cursor-pointer user_menu_item hover:text-[#000] items-center px-[20px] py-[12px] border_top'>
                                    <p className='text-[16px]'>
                                        {" "}
                                        <Link to='/user/userPage'>
                                            Trang cá nhân
                                        </Link>
                                    </p>
                                </li>
                                <li className='flex cursor-pointer user_menu_item hover:text-[#000] items-center px-[20px] py-[12px] border_top'>
                                    <p className='text-[16px]'>
                                        {" "}
                                        <Link to='/learn/rate'>Xếp hạng</Link>
                                    </p>
                                </li>
                                <Link to='/forum/'>
                                    <li className='flex cursor-pointer user_menu_item hover:text-[#000] items-center px-[20px] py-[12px]'>
                                        <p className='text-[16px]'>
                                            {" "}
                                            Viết blog
                                        </p>
                                    </li>
                                </Link>
                                {isAdmin && (
                                    <li className='flex cursor-pointer user_menu_item hover:text-[#000] items-center px-[20px] py-[12px]'>
                                        <Link to='/admin/question'>
                                            Quản lí câu hỏi
                                        </Link>
                                    </li>
                                )}
                                {isAdmin && (
                                    <li className='flex cursor-pointer user_menu_item hover:text-[#000] items-center px-[20px] py-[12px]'>
                                        <Link to='/admin/forum/posts'>
                                            Quản lí bài viết
                                        </Link>
                                    </li>
                                )}
                                <li
                                    className='flex cursor-pointer user_menu_item hover:text-[#000] items-center px-[20px] py-[12px] border_top'
                                    onClick={() => {
                                        handleLogOut()
                                        handleLightMode()
                                    }}
                                >
                                    <p className='text-[16px]'> Đăng xuất</p>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => { navigate('/auth') }} className="font-semibold mx-[16px] header_signUp_btn">Đăng kí</button>
                            <button
                                className="font-semibold text-[#1a1a1a] cursor-pointer bg-[#E0F2FE] px-[16px] py-[6px] rounded-[20px]" onClick={() => { navigate('/auth') }}>Đăng nhập</button>
                        </div>
                    )}
                </div>
            </div>
        </header >
    )
}

export default memo(HeaderComponent)
