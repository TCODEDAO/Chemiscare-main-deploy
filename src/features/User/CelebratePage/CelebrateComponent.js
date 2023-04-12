import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import './CelebrateComponent.css'


const Header = lazy(() => import('../../../components/Header/HeaderComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
const Nav = lazy(() => import('../../../components/Navigation/NavigationComponent'))

export default function CelebratePage() {
    const currentUser = useSelector((state) => state.auth && state.auth.login && state.auth.login.currentUser)

    return (

        <div >
            <Header currentUser={currentUser} />
            <div className="flex mt-[100px] w-[90%] mb-[8px]">

                <Nav />

                <div className="ml-[40px] w-full pb-[64px]">
                    <div className="mt-[32px]">
                        <p className="mb-[16px] text-[24px] font-bold board_title">Lịch thi khối 8</p>
                        <div className="board flex border-solid border-[1px] border-[#e8e8e8] rounded-[6px] font-bold overflow-hidden">
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">VÒNG THI</li>
                                <li className="h-[60px] flex items-center justify-center">1</li>
                                <li className="h-[60px] flex items-center justify-center">2</li>
                                <li className="h-[60px] flex items-center justify-center">3</li>
                                <li className="h-[60px] flex items-center justify-center">4</li>
                                <li className="h-[60px] flex items-center justify-center">5</li>
                                <li className="h-[60px] flex items-center justify-center">6</li>
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">NGÀY THI</li>
                                <li className="h-[60px] flex items-center justify-center">
                                    1/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    1/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    10/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    21/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    31/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    7/4
                                </li>
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">THỜI GIAN THI</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">ĐÃ MỞ
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#d9534f]">
                                    <i className="fa-solid fa-x"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-[32px]">
                        <p className="mb-[16px] text-[24px] font-bold board_title">Lịch thi khối 9</p>
                        <div className="board flex border-solid border-[1px] border-[#e8e8e8] rounded-[6px] font-bold overflow-hidden">
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">VÒNG THI</li>
                                <li className="h-[60px] flex items-center justify-center">1</li>
                                <li className="h-[60px] flex items-center justify-center">2</li>
                                <li className="h-[60px] flex items-center justify-center">3</li>
                                <li className="h-[60px] flex items-center justify-center">4</li>
                                <li className="h-[60px] flex items-center justify-center">5</li>
                                <li className="h-[60px] flex items-center justify-center">6</li>
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">NGÀY THI</li>
                                <li className="h-[60px] flex items-center justify-center">
                                    1/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    1/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    10/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    21/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    31/3
                                </li>
                                <li className="h-[60px] flex items-center justify-center">
                                    7/4
                                </li>
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">THỜI GIAN THI</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                                <li className="h-[60px] flex items-center justify-center">8h30 - 10h30</li>
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">ĐÃ MỞ
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#5cb85c]">
                                    <i className="fa-solid fa-check"></i>
                                </li>
                                <li className="h-[60px] flex items-center justify-center text-[#d9534f]">
                                    <i className="fa-solid fa-x"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
