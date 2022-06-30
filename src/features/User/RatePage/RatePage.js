import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notifyInfo } from '../../../components/Alert/AlertComponent'

import './RatePage.css'
import Navigation from '../../../components/Navigation/NavigationComponent'
import Footer from '../../../components/Footer/FooterComponent'
import { getAllResultAndSort } from '../../../api/User/apiResult'
import { createAxios } from '../../../utils/axiosJWT'

import 'moment/locale/vi'
import moment from 'moment'

moment.locale('vi')
function RatePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const results = useSelector(state => state?.quiz?.resultAllUser)

    console.log(results);
    const currentUser = useSelector((state) => state?.auth?.login?.currentUser)
    const axiosJWT = createAxios(currentUser, dispatch)
    useEffect(async () => {

        if (!currentUser) {
            navigate('/auth')
            notifyInfo('Bạn cần đăng nhập để vào học!')
            return
        }
        if (!currentUser.detailUserInfomation || !currentUser?.detailUserInfomation?.grade) {
            navigate('/auth/detail')
            notifyInfo('Bạn cần thêm thông tin để vào học!')
            return
        }

        if (currentUser) {
            getAllResultAndSort(axiosJWT, currentUser, dispatch, navigate, 2)
        }

        return () => {

        }
    }, [])
    return (
        <div className="pt-[130px] pb-[90px] bg-[#13161B] relative min-h-[100vh] contentWrapper">
            <Navigation currentUser={currentUser} />
            <div className="max-w-[1092px] w-[100%] mx-auto">
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
            </div>
            <Footer />
        </div>

    )
}

export default RatePage