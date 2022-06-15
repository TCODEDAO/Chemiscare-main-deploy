import React, { useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate, Link } from 'react-router-dom'
import Typed from 'typed.js'
import favicon from '../../../assets/images/icons/logoHomepage.ico'
import './HomePage.css'



import Favicon from 'react-favicon'
// import { notifyInfo } from '../Alert/AlertComponents'
export default function HomePage() {

    const navigate = useNavigate()

    const elSpan = useRef(null)
    useEffect(() => {
        const typed = new Typed(elSpan.current, {
            strings: [
                'Học hóa miễn phí',
                'Học hóa dễ dàng',
                'Tăng trình độ hóa học của bạn',
            ],
            startDelay: 350,
            typeSpeed: 300,
            backSpeed: 200,
            loop: true,
        })
        return () => {
            typed.destroy()
        }
    }, [])

    const handleRedirect = () => {
        navigate(`/learn`)
        return
    }

    return (
        <>
            <Helmet>
                <title>Bắt đầu với Chemiscare</title>
            </Helmet>
            <Favicon url={favicon} />
            <div className="h-[100vh] bg-[#F6EBDC] flex">
                <div className="w-[50%] h-full px-[5px] pt-[20px] flex flex-wrap partFirst">
                    <div className="flex items-center grow h-[30px] justify-between">
                        <Link to="/learn" className="flex items-center px-[20px] logo">
                            <i className="fa-solid fa-atom text-2xl logoIcon"></i>
                            <span className="font-bold text-xl logoName  ">Chemiscare</span>
                        </Link>
                        <ul className="flex justify-between grow nav">
                            <li className="" >
                                <Link className=" hover:text-[#ff4b2b]" to="/learn">
                                    <i className="fa-solid fa-house navItemIcon"></i>
                                    <span className="text-sm navItemName pl-1  ">Trang chủ</span>
                                </Link>
                            </li>
                            <li className="" >
                                <Link className=" hover:text-[#ff4b2b]" to="/forum">
                                    <i className="fa-solid fa-people-group navItemIcon"></i>
                                    <span className="text-sm navItemName pl-1  ">Diễn Đàn</span>
                                </Link>
                            </li>
                            <li className="" >
                                <Link className=" hover:text-[#ff4b2b]" to="/learn/rate">
                                    <i className=" fa-solid fa-ranking-star  navItemIcon"></i>
                                    <span className="text-sm navItemName pl-1  ">Xếp Hạng</span>
                                </Link>
                            </li>
                            <li className="">
                                <Link className="hover:text-[#ff4b2b]" to="/celebrate">
                                    <i className="fa-solid fa-calendar navItemIcon"></i>
                                    <span className="text-sm navItemName pl-1  ">Lịch Thi</span>
                                </Link>
                            </li>
                            <li className="">
                                <Link className=" hover:text-[#ff4b2b]  " to={'/rules'}>
                                    <i className="fa-solid fa-scale-balanced navItemIcon"></i>
                                    <span className="text-sm navItemName pl-1  ">Thể Lệ</span>
                                </Link>
                            </li>

                        </ul>
                        <div className="relative navIcon hidden" >
                            <i className="fa-solid fa-bars text-[30px] p-4 pr-0 hover:text-[#ff4b2b]"></i>
                            <ul className="justify-between grow absolute top-[100%] right-1 flex-col bg-[#f8593d] text-white rounded-[4px] hidden">
                                <li className="w-[200px]">
                                    <Link className="px-6 block py-4 boder-bot" to="/learn" >
                                        <i className="text-[18px] fa-solid fa-house"></i>
                                        <span className="text-sm text-[16px] pl-1  ">Trang Chủ</span>
                                    </Link>
                                </li>
                                <li className="w-[200px]">
                                    <Link className="px-6 block py-4 boder-bot" to="/forum" >
                                        <i className="text-[18px] fa-solid fa-people-group"></i>
                                        <span className="text-sm text-[16px] pl-1  ">Diễn Đàng</span>
                                    </Link>
                                </li>
                                <li className="w-[200px]" >
                                    <Link className="px-6 block py-4 boder-bot" to="/learn/rate" >
                                        <i className="text-[18px] fa-solid fa-ranking-star  "></i>
                                        <span className="text-sm text-[16px] pl-1 ">Xếp Hạng</span>
                                    </Link>
                                </li>
                                <li className="w-[200px]" >
                                    <Link className="px-6 block py-4 boder-bot" to="/celebrate" >
                                        <i className="text-[18px] fa-solid fa-calendar"></i>
                                        <span className="text-sm text-[16px] pl-1  ">Lịch Thi</span>
                                    </Link>
                                </li>
                                <li className="w-[200px]" >
                                    <Link className="px-6 block py-4 boder-bot" to="/rules">
                                        <i className="text-[18px] fa-solid fa-scale-balanced"></i>
                                        <span className="text-sm text-[16px] pl-1  ">Thể Lệ</span>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className="px-[60px] self-center title">
                        <h1 className="text-[60px] font-extrabold leading-[70px] mainTitle" ><span ref={elSpan}> Tăng trình độ hóa học của bạn</span>tại Chemiscare</h1>
                        <span className="my-5 block">Chemiscare là một diễn đàng và nơi tổ chức các cuộc thi về hóa học, là sự lựa chọn tuyệt vời để giải đáp các thắc mắc và luyện trình độ hóa học cho tất cả các cấp học</span>
                        <a href="# "><button className="w-[200px] h-[50px] bg-[#ff4b2b] hover:bg-[#ff5d41] text-white rounded-[30px] font-bold" onClick={handleRedirect}>Bắt Đầu Miễn Phí</button></a>
                    </div>
                    <div className="h-[80px] grow bg-[#ECDDCB] mx-[-5px]  flex flex-col px-[60px] self-end footer">
                        <span className="mt-[6px]">Liên hệ với chúng tôi tại:</span>
                        <span className="listSocial">
                            <a href="# " className="pr-5 inline-flex items-center mt-[4px] font-medium"><i className="fa-brands text-[30px] mr-[4px] fa-facebook"></i>
                                <span className="nameSocial">
                                    Facebook
                                </span>
                            </a>
                            <a href="# " className="px-5 inline-flex items-center mt-[4px] font-medium"><i className="fa-brands text-[30px] mr-[4px] fa-google-plus"></i>
                                <span className="nameSocial">
                                    Email
                                </span>
                            </a>
                            <a href="# " className="pl-5 inline-flex items-center mt-[4px] font-medium"><i className="fa-brands text-[30px] mr-[4px] fa-instagram-square"></i>
                                <span className="nameSocial">
                                    Instagram
                                </span>
                            </a>
                        </span>
                    </div>
                </div>
                <div className="w-[50%] h-full relative bg-[url(https://images.unsplash.com/photo-1499088513455-78ed88b7a5b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80)] bg-no-repeat bg-cover partSecond">
                    <span className="absolute p-4 top-0 right-0">
                        <a href=" #" className=""><button className="w-[200px] h-[50px] bg-[white] hover:bg-[#f9f9f9] text-#ff4b2b rounded-[30px] font-bold" onClick={handleRedirect}>Bắt Đầu Miễn Phí <i className="fa-solid fa-arrow-right"></i></button></a>
                    </span>
                    <div className="flex justify-center items-center h-[100vh] w-full flex-col">
                        <div className="w-[160px] h-[160px] object-cover rounded-[50%] overflow-hidden">
                            <img src="https://scontent.fhan5-11.fna.fbcdn.net/v/t1.6435-9/126059789_128849775694839_7270769653888904489_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=_E2397rmBAEAX-vLf37&_nc_ht=scontent.fhan5-11.fna&oh=00_AT8woUYUQO33m08nX7zrB0hSVVha5Y7a2hyImo4vmzC1Fw&oe=62AB516C" alt="" />
                        </div>
                        <div className="flex items-center flex-col text-white">
                            <p className="text-[40px] font-bold mb-[8px]">Trường THCS An Sinh</p>
                            <p className="">Ba Xã - An Sinh - Đông Triều - Quảng Ninh</p>
                            <p className="text-[16px] font-bold">Copyright © 2022  - <a href=" #" className="underline hover:text-[#fafafa]">Trịnh Văn Sơn</a> & <a href=" #" className="underline hover:text-[#fafafa]">Nguyễn Phúc Thanh</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
