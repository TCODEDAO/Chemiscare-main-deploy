import { memo } from "react"
import './FooterComponent.css'
import logoChemiscare from '../../assets/images/icons/chemiscare_logo-1.png'
function FooterComponent() {
    return (
        <footer className="px-[80px] py-[60px] bg-[#181821] w-full text-[#a9b3bb] footer">
            <ul className="mb-[64px] flex">
                <li className="w-[30%]">
                    <div className="flex items-center mb-[16px]">
                        <img src={logoChemiscare} alt="" className="w-[44px] h-[44px] mr-[8px] rounded-[8px]" />
                        <p className="font-bold text-[24px] logo_text text-[#fff]">Chemiscare</p>
                    </div>
                    <div>
                        <p>
                            Điện thoại:
                            <span className="hover:opacity-[0.8] cursor-pointer">0388128994</span>
                        </p>
                        <p>
                            Email:
                            <span className="hover:opacity-[0.8] cursor-pointer">trinhvanson0807@gmail.com</span>
                        </p>
                        <p className="whitespace-nowrap">
                            Facebook:
                            <span>
                                <span className="hover:opacity-[0.8] cursor-pointer underline">Trịnh Văn Sơn</span>
                                &
                                <span className="hover:opacity-[0.8] cursor-pointer underline">Nguyễn Phúc Thanh</span>
                            </span>
                        </p>
                        <p className="whitespace-nowrap">
                            Github:
                            <span>
                                <span className="hover:opacity-[0.8] cursor-pointer underline">SownVP</span>
                                &
                                <span className="hover:opacity-[0.8] cursor-pointer underline">TCODEDAO</span>
                            </span>
                        </p>
                    </div>
                </li>
                <li className="mx-[32px] w-[50%]">
                    <p className="font-semibold text-[20px] text-[#fff] mb-[8px]">VỀ CHEMISCARE</p>
                    <div>
                        <p>Chemiscare là một trang web về Hóa Học, ở đây bạn có thể trao đổi thông tin, giải đáp thắc mắc,
                            học hỏi, giải trí và đặc biệt là rèn luyện được kinh nghiệm, kĩ năng làm bài thi và kiến thức về
                            môn Hóa. Với giao diện thân thiện người dùng, bộ câu hỏi đa dạng cho các khối lớp 8, 9 và sau
                            này còn có thể mở rộng thêm thì Chemiscare là một lựa chọn tuyệt vời để giáo viên, học sinh ôn
                            luyện môn Hóa</p>
                    </div>
                </li>
                <li className="w-[20%]">
                    <p className="font-semibold text-[20px] text-[#fff] mb-[8px]">SOCIAL</p>
                    <div className="flex items-center text-[24px] mx-[-8px]">
                        <span
                            className="mx-[8px] cursor-pointer hover:bg-[#f1f1f1] footer_social text-[#3B5999] bg-[#fff] w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                            <i className="fa-brands fa-facebook"></i>
                        </span>
                        <span
                            className="mx-[8px] cursor-pointer hover:bg-[#f1f1f1] footer_social text-[#333] bg-[#fff] w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                            <i className="fa-brands fa-github"></i>
                        </span>
                        <span
                            className="mx-[8px] cursor-pointer hover:bg-[#f1f1f1] footer_social text-[#333] bg-[#fff] w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                            <i className="fa-solid fa-envelope"></i>
                        </span>
                        <span
                            className="mx-[8px] cursor-pointer hover:bg-[#f1f1f1] footer_social text-[#e1306c] bg-[#fff] w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                            <i className="fa-brands fa-instagram"></i>
                        </span>
                        <span
                            className="mx-[8px] cursor-pointer hover:bg-[#f1f1f1] footer_social text-[#200120] bg-[#fff] w-[30px] h-[30px] rounded-[50%] flex items-center justify-center">
                            <i className="fa-brands fa-tiktok"></i>
                        </span>
                    </div>
                </li>
            </ul>
            <p>Copyright © 2022 - Trịnh Văn Sơn & Nguyễn Phúc Thanh - Học sinh lớp 9A trường THCS An Sinh</p>
        </footer>
    )
}

export default memo(FooterComponent)