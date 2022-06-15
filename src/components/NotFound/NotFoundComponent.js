import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() {
    return (
        <div className="h-[100vh] flex items-center justify-center bg-[#08080A]">
            <div className="w-full h-full flex justify-center box--content relative items-center">
                <div className="flex absolute top-0 left-0 right-0 justify-between items-center px-[20px] headerContent">
                    <span className="relative flex items-center">
                        <span className="text404">
                            <p className="text-[60px] self-center text-[#fff] select-none mr-[20px]">
                                404
                            </p>
                            <p className="absolute top-[50%] text-[36px] left-0 text-[#fff] select-none bg-[#08080A] leading-[36px] px-[11px]">
                                PAGE
                            </p>
                        </span>
                        <a href="# " className="flex items-center">
                            <i className="fa-solid fa-atom text-[40px] text-white mr-1"></i>
                            <span className="font-bold text-[36px] text-white">
                                Chemiscare
                            </span>
                        </a>
                    </span>
                    <span className="nav">
                        <ul className="flex justify-center grow">
                            <li className="">
                                <a
                                    className="p-4 text-[18px] text-[#fff] hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="fa-solid fa-file-lines"></i>
                                    <span className="">Diễn Đàn</span>
                                </a>
                            </li>
                            <li className="">
                                <a
                                    className="p-4 text-[18px] text-[#fff] hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="fa-solid fa-calendar"></i>
                                    <span className="">Lịch Thi</span>
                                </a>
                            </li>
                            <li className="">
                                <a
                                    className="p-4 text-[18px] text-[#fff] hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="fa-solid fa-scale-balanced"></i>
                                    <span className="">Thể Lệ</span>
                                </a>
                            </li>
                            <li className="">
                                <a
                                    className="p-4 text-[18px] text-[#fff] hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="fa-solid fa-ranking-star"></i>
                                    <span className="">Xếp Hạng</span>
                                </a>
                            </li>
                            <li className="">
                                <a
                                    className="p-4 pr-0 text-[18px] text-[#fff] hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="fa-solid fa-circle-question"></i>
                                    <span className="">Hỏi Đáp</span>
                                </a>
                            </li>
                        </ul>
                    </span>
                    <div className="relative navIcon hidden">
                        <i className="fa-solid fa-bars text-[30px]  hover:text-[#d54253] text-[#fff]"></i>
                        <ul className="justify-between grow absolute top-[100%] right-1 flex-col bg-[#3d4048] text-white rounded-[4px] hidden">
                            <li className="w-[200px]">
                                <a
                                    className="px-6 block py-4 boder-bot hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="text-[18px] fa-solid fa-house"></i>
                                    <span className="text-sm text-[16px]">
                                        Diễn Đàng
                                    </span>
                                </a>
                            </li>
                            <li className="w-[200px]">
                                <a
                                    className="px-6 block py-4 boder-bot hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="text-[18px] fa-solid fa-calendar"></i>
                                    <span className="text-sm text-[16px]">
                                        Lịch Thi
                                    </span>
                                </a>
                            </li>
                            <li className="w-[200px]">
                                <a
                                    className="px-6 block py-4 boder-bot hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="text-[18px] fa-solid fa-scale-balanced"></i>
                                    <span className="text-sm text-[16px]">
                                        Thể Lệ
                                    </span>
                                </a>
                            </li>
                            <li className="w-[200px]">
                                <a
                                    className="px-6 block py-4 hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="text-[18px] fa-solid fa-circle-question"></i>
                                    <span className="text-sm text-[16px]">
                                        Hỏi Đáp
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <span className="text-white">
                        <span className="mb-[60px] block">
                            <h1 className="font-bold text-[100px] textMain">
                                Đừng lo lắng!
                            </h1>
                            <p className="textSub">
                                Đôi khi chúng tôi sẽ gặp trục trặc, nhưng lỗi sẽ
                                được sửa sớm thôi!!
                                <a
                                    href="# "
                                    className="underline hover:text-[#d54253]"
                                >
                                    Bạn cần trợ giúp?
                                </a>
                            </p>
                        </span>

                        <Link
                            to="/learn"
                            className="px-5 py-4 bg-[#d54253] font-semibold rounded-[8px] hover:bg-[#d54a5b]"
                        >
                            Quay lại trang chủ
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}
