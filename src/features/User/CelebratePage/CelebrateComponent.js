import React, { lazy, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './CelebrateComponent.css'


const Navigation = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
export default function CelebratePage() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.auth && state.auth.login && state.auth.login.currentUser)
    useEffect(() => {
        if (!currentUser) {
            navigate('/auth')
        }
    }, [currentUser, navigate])
    return (

        <div className="pt-[130px] pb-[100px] bg-[#13161B] relative min-h-[100vh]">
            <Navigation currentUser={currentUser}></Navigation>
            <div className="max-w-[1092px] w-[100%] mx-auto">
                <div className="flex justify-between flex-wrap">
                    <div className="boardWrapper w-[100%] boardTest">
                        <p className="text-white font-bold text-2xl leading-5 mb-[20px]">Lịch thi dành cho học sinh lớp  {currentUser?.detailUserInfomation?.grade}</p>
                        <div className="boardMain w-[100%]">
                            <div className="flex text-white mb-[4px] board_header">
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Vòng thi</div>
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Ngày thi</div>
                                <div className="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Vòng thi</div>

                            </div>

                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 1</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 25/5</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 2</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 2/6</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 3</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 9/7</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 4</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 17/7</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 5</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 24/7</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 6</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 31/7</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 7</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 7/8</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 8</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 15/8</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 9</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 22/8</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 10</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 29/8</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] ">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 11</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 6/9</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                            <div>
                                <div className="flex text-[#111827] boardBody">
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 12</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 13/9</div>
                                    <div className="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">8h30 - 9h30</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
