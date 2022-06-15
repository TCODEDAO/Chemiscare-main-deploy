

import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import './RuleComponent.css'


const Navigation = lazy(() => import('../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../components/Footer/FooterComponent'))
export default function Celebrate() {
    const currentUser = useSelector((state) => state.auth.login.currentUser)

    return (
        <>
            <div className="pt-[130px] pb-[90px] bg-[#13161B] relative min-h-[100vh] contentWrapper">
                <Navigation currentUser={currentUser} />

                <div className="max-w-[1092px] w-[100%] mx-auto content">
                    <div className="text-[#fafafa]">
                        <div className="mb-[20px]">
                            <p>Bạn đang dự thi khối {currentUser?.detailUserInfomation?.grade}</p>
                            <p>
                                <span className="font-bold opacity-[0.8]">Lưu ý:</span>
                                Bạn sẽ hoàn thành bài thi thử khi trả lời tất cả các câu hỏi trong đề thi
                            </p>
                        </div>
                        <div className="mb-[20px]">
                            <p className="font-bold opacity-[0.8]">Thể lệ các vòng thi chính thức:</p>
                            <ol className="list-disc">
                                <li>Học sinh bị mất tài khoản thi cấp trước đó có thể tạo tài khoản mới để thi cấp
                                    tiếp theo nhưng phải thông báo với Hội đồng thi của cấp đó và được Hội đồng thi cấp
                                    trước (nếu có) xác nhận</li>
                                <li>Tại các vòng thi chính thức, học sinh chỉ được dùng một tài khoản để đăng
                                    nhập</li>
                                <li>Học sinh không được sử dụng bất kỳ tài liệu tham khảo nào trong các vòng thi
                                    chính thức của cuộc thi.
                                </li>
                                <li>Học sinh có thể ra khỏi phòng thi nhưng vẫn ở trong khu vực tổ chức thi nếu
                                    hoàn thành bài thi sớm hơn thời gian quy định của vòng thi chính thức</li>
                            </ol>
                        </div>
                        <div className="">
                            <p className="font-bold opacity-[0.8]">Các trường hợp phạm luật:</p>
                            <ol className="list-disc">
                                <li>Đăng nhập một tài khoản trên hai máy hoặc hai trình duyệt khác nhau và thi cùng một thời điểm</li>
                                <li>Đang làm bài thi mà tải lại trang đề thi hoặc thoát ra không nộp bài</li>
                                <li>Mở nhiều cửa sổ vào thi một lúc</li>
                                <li>Các trường hợp vi phạm sẽ bị hệ thống tự động thoát ra ngoài và tính một lần trượt vòng thi</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>

    )
}
