import { memo } from "react"
import './FooterComponent.css'
function FooterComponent() {
    return (
        <div className="py-[20px] bg-[#16191f] absolute bottom-0 left-0 right-0 border-[#353945] border-t-[1px] text-[#777e90]">
            <div className="mx-auto max-w-[1092px] w-[100%] flex justify-between items-center contentFooter">
                <span className="text-[14px] font-light">Copyright © 2023  - <a href="# " className="underline">SownVipro</a> & <a href="# " className="underline">TCODEDAO</a></span>
                <span className="textFooterCenter"><span className="font-light">Sản phẩm thuộc</span> NHÓM HỌC SINH LỚP 9A TRƯỜNG THCS AN SINH</span>
                <span className="flex justify-between socialFooter">
                    <a href="# " className="pr-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/facebook-footer-icon.svg" alt="" /></a>
                    <a href="# " className="px-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/twitter-footer-icon.svg" alt="" /></a>
                    <a href="# " className="px-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/instagram-footer-icon.svg" alt="" /></a>
                    <a href="# " className="px-[8px]"><i className="fa-brands fa-google-plus-g text-[24px]"></i></a>
                    <a href="# " className="pl-[8px]"><i className="fa-brands fa-github text-[24px]"></i></a>
                </span>
            </div>
        </div>
    )
}

export default memo(FooterComponent)