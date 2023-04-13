import React, { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notifyInfo } from '../../../components/Alert/AlertComponent'

import './RatePage.css'


import { getAllResultAndSort } from '../../../api/User/apiResult'
import { createAxios } from '../../../utils/axiosJWT'

import 'moment/locale/vi'
import moment from 'moment'
import { useState } from 'react'
const Header = lazy(() => import('../../../components/Header/HeaderComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
const Nav = lazy(() => import('../../../components/Navigation/NavigationComponent'))
moment.locale('vi')
function RatePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const results = useSelector(state => state?.quiz?.resultAllUser)


    const [resultRender, setResultRender] = useState({
        name: [],
        class: [],
        school: [],
        scores: [],
        times: [],
    })
    useEffect(() => {
        results.forEach((item, index) => {
            setResultRender((prev) => {
                return {
                    name: [...prev.name, item?.userId?.fullName],
                    times: [...prev.times, item.currentTime],
                    scores: [...prev.scores, item.currentPoint],
                    school: [...prev.school, item?.userId?.detailUserInfomation?.location?.school],
                    class: [...prev.class, item?.userId?.detailUserInfomation?.class],

                }
            })


        })
        return () => {
            setResultRender(() => {
                return {
                    name: [],
                    times: [],
                    scores: [],
                    school: [],
                    class: [],

                }
            })
        }
    }, [results])




    const currentUser = useSelector((state) => state?.auth?.login?.currentUser)
    const axiosJWT = createAxios(currentUser, dispatch)
    useEffect(async () => {

        if (!currentUser) {
            notifyInfo('Bạn cần đăng nhập để xem được kết quả của mình tại trang này!')
            return
        }
        // if (!currentUser.detailUserInfomation || !currentUser?.detailUserInfomation?.grade) {
        //     navigate('/auth/detail')
        //     notifyInfo('Bạn cần đăng nhập để xem trang này!')
        //     return
        // }

        if (currentUser) {
            getAllResultAndSort(axiosJWT, dispatch, navigate, 2)
        }

        return () => {

        }
    }, [])
    return (
        <div className="">
            <Header currentUser={currentUser} />
            {/* <div className="max-w-[1092px] w-[100%] mx-auto">
                <div className="flex justify-between flex-wrap">
                    <div className="boardWrapper w-[100%] boardTest">
                        <p className="text-white font-bold text-2xl leading-5 mb-[20px]">Xếp hạng cá nhân qua các vòng thi</p>
                        <div className="boardMain w-[100%]">
                            <div className="flex text-white mb-[4px] board_header">
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Số thứ tự</div>
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Họ & Tên</div>
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Thời gian</div>
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Điểm</div>
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Tên lớp</div>
                            </div>
                            <div>
                                {results.map((result, index) => (
                                    <div className="flex text-[#111827] boardBody" key={result?._id}>
                                        <div className='flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem'>{index + 1}</div>
                                        <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem cursor-pointer hover:underline" onClick={() => {
                                            navigate(`/user/userPage/${result?.userId?._id}`)
                                        }}>{result?.userId?.fullName}</div>
                                        <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{result?.currentTime}</div>
                                        <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{result?.currentPoint}</div>
                                        <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{result?.userId?.detailUserInfomation?.class}</div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="flex mt-[100px] w-[90%] mb-[8px]">
                <Nav />
                <div className="ml-[40px] w-full pb-[64px]">
                    <div className="mt-[32px]">
                        <p className="text-[24px] mb-[16px] font-bold board_title mr-[4px]">
                            Bảng xếp hạng khối: {currentUser?.detailUserInfomation?.grade}
                        </p>
                        <div className="board board_rank flex border-solid border-[1px] border-[#e8e8e8] rounded-[6px] font-bold overflow-hidden w-full">
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">TÊN</li>

                                {resultRender.name.map((name, index) => {
                                    return <li key={index} className="h-[60px] flex items-center justify-center p-[2px] board_col_item">{name}</li>
                                })}
                            </ul>
                            {/* <ul className="grow">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">LỚP</li>
                                {resultRender.class.map((item, index) => {
                                    return <li key={index} className="h-[60px] flex items-center justify-center p-[2px] board_col_item">{item}</li>
                                })}
                            </ul> */}
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">TRƯỜNG</li>
                                {resultRender.school.map((item, index) => {
                                    return <li key={index} className="h-[60px] flex items-center justify-center p-[2px] board_col_item">{item}</li>
                                })}
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">ĐIỂM</li>
                                {resultRender.scores.map((item, index) => {
                                    return <li key={index} className="h-[60px] flex items-center justify-center p-[2px] board_col_item">{item}</li>
                                })}
                            </ul>
                            <ul className="w-[25%]">
                                <li className="h-[60px] flex items-center justify-center bg-[#E0F2FE] board_col_header">THỜI GIAN</li>
                                {resultRender.times.map((item, index) => {
                                    return <li key={index} className="h-[60px] flex items-center justify-center p-[2px] board_col_item">{item} giây</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default RatePage