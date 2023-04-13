import React from 'react'
import "./NavigationComponent.css"
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function NavigationComponent() {

    const $ = document.querySelector.bind(document)
    useEffect(() => {

        let OffsetTop
        if ($('.nav_item.active') === null) {
            $('.nav_item_wrapper').style.top = `358px`;
            return
        }
        if (window.location.pathname.includes('/rate')) {
            $('.nav_item_wrapper').style.top = `286px`;
            return
        }
        if (window.location.pathname.includes('/rules')) {
            $('.nav_item_wrapper').style.top = `214px`;
            return
        }
        if (window.location.pathname.includes('/learn')) {
            $('.nav_item_wrapper').style.top = `70px`;
            return
        }
        if (window.location.pathname.includes('/forum')) {
            $('.nav_item_wrapper').style.top = `358px`;
            return
        }

        if (window.location.pathname.includes('/celebrate')) {
            $('.nav_item_wrapper').style.top = `142px`;
            return
        }
        if ($('.nav_item.active').offsetTop == false) {
            if (window.location.pathname.includes('/learn')) {
                OffsetTop = 70
                return
            }
            if (window.location.pathname.includes('/forum')) {
                OffsetTop = 358
                return
            }
            if (window.location.pathname.includes('/forum/post')) {
                OffsetTop = 358
                return
            }

        } else {
            OffsetTop = $('.nav_item.active').offsetTop
        }
        console.log(OffsetTop)
        $('.nav_item_wrapper').style.top = `${OffsetTop}px`;

    }, [])
    const getNavLinkClass = (path) => {
        return window.location.pathname === path ? 'active' : '';
    }

    function handleClose(elm, status) {
        elm.classList.remove(status);
        elm.classList.add('hidden');
    }
    // useEffect(() => {
    //     window.addEventListener("resize", () => {
    //         if (window.screen.width <= 1000) {
    //             $('.nav_main').style.display = "none";
    //         } else {
    //             $('.nav_main').style.display = "block";
    //         }
    //     })

    //     return () => {
    //         window.removeEventListener("resize", () => {
    //             if (window.screen.width <= 1000) {
    //                 $('.nav_main').style.display = "none";
    //             } else {
    //                 $('.nav_main').style.display = "block";
    //             }
    //         })
    //     }
    // }, [])

    const navigate = useNavigate()
    return (
        <div>
            <nav className="nav_main">
                <ul className="p-[16px] flex flex-col items-center sticky left-0 top-[100px] navigation-react-tour">
                    <Link to='/forum/user/create'>
                        <li className="w-[44px] h-[44px] flex items-center justify-center mb-[8px] bg-[#1473e6] rounded-[50%] border-[#1473e6] border-solid border-[1px] text-[#fff] cursor-pointer">
                            <i className="fa-solid fa-plus"></i>
                        </li>
                    </Link>


                    <li
                        className={` ${getNavLinkClass("/learn")} flex z-10 items-center justify-center flex-col text-[#404040] w-[68px] h-[68px] rounded-[16px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] my-[2px] cursor-pointer nav_item`}
                        onClick={() => navigate('/learn')}
                    >
                        <i className="fa-solid fa-house text-[18px] mb-[4px]"></i>
                        <p className="text-[12px] nav_title font-bold">Home</p>
                    </li>
                    <li
                        className={` ${getNavLinkClass("/celebrate")} flex z-10 items-center justify-center flex-col text-[#404040] w-[68px] h-[68px] rounded-[16px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] my-[2px] cursor-pointer nav_item`}
                        onClick={() => navigate('/celebrate')}
                    >

                        <i className="fa-solid fa-calendar text-[18px] mb-[4px]"></i>
                        <p className="text-[12px] nav_title font-bold">Lịch</p>

                    </li>
                    <li
                        className={` ${getNavLinkClass("/rules")} flex z-10 items-center justify-center flex-col text-[#404040] w-[68px] h-[68px] rounded-[16px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] my-[2px] cursor-pointer nav_item`}
                        onClick={() => navigate('/rules')}
                    >
                        <i className="fa-solid fa-scale-balanced text-[18px] mb-[4px]"></i>
                        <p className="text-[12px] nav_title font-bold">Thể lệ</p>
                    </li>
                    <li
                        className={` ${getNavLinkClass("/learn/rate")} flex z-10 items-center justify-center flex-col text-[#404040] w-[68px] h-[68px] rounded-[16px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] my-[2px] cursor-pointer nav_item`}
                        onClick={() => navigate('/learn/rate')}
                    >
                        <i className="fa-solid fa-ranking-star text-[18px] mb-[4px]"></i>
                        <p className="text-[12px] nav_title font-bold">Hạng</p>
                    </li>
                    <li
                        className={` ${getNavLinkClass("/forum")} flex z-10 items-center justify-center flex-col text-[#404040] w-[68px] h-[68px] rounded-[16px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] my-[2px] cursor-pointer nav_item`}
                        onClick={() => navigate('/forum')}
                    >
                        <i className="fa-solid fa-circle-question text-[18px] mb-[4px]"></i>
                        <p className="text-[12px] nav_title font-bold">Bài viết</p>
                    </li>
                    <span className={`      nav_item_wrapper w-[68px] h-[68px] bg-[#E0F2FE] rounded-[16px] absolute`}></span>
                </ul>
            </nav >



            <nav className="fixed top-0 bottom-0 left-0 right-0 z-[100] nav_onTablet hidden">
                <ul className="w-[70%] bg-[#E0F2FE] h-full p-[32px] cursor-pointer">
                    <li onClick={() => {
                        handleClose($('.nav_onTablet'), 'block');
                    }}>
                        <i className="nav_close_btn fa-solid fa-xmark text-[24px] cursor-pointer py-[10px] pl-[10px]"></i>
                    </li>
                    <li className={`cursor-pointer flex py-[16px] px-[8px] rounded-[6px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] ${getNavLinkClass("/learn")}`}

                        onClick={() => navigate('/learn')}>
                        <i className="fa-solid fa-house text-[24px] mr-[6px]"></i>
                        <p className="text-[18px] nav_title font-bold">Bài thi</p>
                    </li>
                    <li className={`cursor-pointer flex py-[16px] px-[8px] rounded-[6px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a]  ${getNavLinkClass("/celebrate")}`}

                        onClick={() => navigate('/celebrate')}
                    >
                        <i className="fa-solid fa-calendar text-[24px] mr-[6px]"></i>
                        <p className="text-[18px] nav_title font-bold">Lịch</p>
                    </li>
                    <li className={`cursor-pointer flex py-[16px] px-[8px] rounded-[6px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a]  ${getNavLinkClass("/rules")}`}

                        onClick={() => navigate('/rules')}>
                        <i className="fa-solid fa-scale-balanced text-[24px] mr-[6px]"></i>
                        <p className="text-[18px] nav_title font-bold">Thể lệ</p>
                    </li>
                    <li className={` cursor-pointer flex py-[16px] px-[8px] rounded-[6px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] ${getNavLinkClass("/learn/rate")}`}

                        onClick={() => navigate('/learn/rate')}>
                        <i className="fa-solid fa-ranking-star text-[24px] mr-[6px]"></i>
                        <p className="text-[18px] nav_title font-bold">Hạng</p>
                    </li>
                    <li
                        onClick={() => navigate('/forum')}
                        className={`cursor-pointer flex text-[40px] py-[16px] px-[8px] rounded-[6px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] border_top  ${getNavLinkClass("/forum")}`}>
                        <i className="fa-solid fa-blog text-[24px] mr-[6px]"></i>
                        <p className="text-[18px] nav_title font-bold">Bài viết</p>
                    </li>
                    <li
                        onClick={() => navigate('/forum/user/create')}

                        className={`cursor-pointer flex text-[40px] py-[16px] px-[8px] rounded-[6px] hover:bg-[#e8f6ff] hover:text-[#1a1a1a] border_top  ${getNavLinkClass("/forum/user/create")}`}>
                        <i className="fa-solid fa-plus text-[24px] mr-[6px]"></i>
                        <p className="text-[18px] nav_title font-bold">Viết bài</p>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default NavigationComponent