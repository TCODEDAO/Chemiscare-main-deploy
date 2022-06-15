import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateDetailInfomation } from '../../../api/User/apiAuth'
import { createAxios } from '../../../utils/axiosJWT'

export default function DetailUserInfomation() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [school, setSchool] = useState('')
    const [grade, setGrade] = useState(8)
    const [classSchool, setClassSchool] = useState('')
    const currentUser = useSelector((state) => state?.auth?.login?.currentUser)
    useEffect(() => {
        if (!currentUser) {
            navigate('/auth')
        }
        console.clear()
    }, [])
    const infoUser = {
        location: {
            province: province,
            district: district,
            school: school,
        },
        grade: grade,
        class: classSchool,
    }
    const axiosJWT = createAxios(currentUser, dispatch)
    const handleUpdateInfo = () => {
        updateDetailInfomation(dispatch, navigate, axiosJWT, currentUser, infoUser)
    }
    return (
        <div className='h-screen w-screen bg-[url("https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")] flex justify-center items-center'>
            <div className="h-[534px] w-[552px] bg-[#ff7675] rounded-[20px] p-[14px]">
                <a href="# " className="flex items-center">
                    <div className="p-4">
                        <i className="fa-solid fa-atom text-2xl text-white"></i>
                        <span className="font-bold text-xl  pl-1 text-white">
                            Chemiscare
                        </span>
                    </div>
                </a>
                <div className="flex justify-around flex-col items-center ">
                    <input
                        type="text"
                        className="w-full min-h-[52px] outline-none rounded-[20px] px-4 mb-4"
                        required
                        placeholder="Nhập tên tỉnh... (Ví dụ: Tỉnh Quảng Ninh)"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full min-h-[52px] outline-none rounded-[20px] px-4 mb-4"
                        required
                        placeholder="Nhập tên quận (huyện)... (Ví dụ:Thành phố Cẩm phả )"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full min-h-[52px] outline-none rounded-[20px] px-4 mb-4"
                        required
                        placeholder="Nhập trường... (Ví dụ: Trường THCS An Sinh)"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                    <select
                        name="grade"
                        id=""
                        className="min-w-full min-h-[50px] rounded-[20px] outline-none  mb-4 px-4"
                        required
                        defaultValue={8}
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value={8} className="rounded-md">
                            Khối 8
                        </option>
                        <option value={9} className="rounded-md">
                            Khối 9
                        </option>
                    </select>
                    <input
                        type="text"
                        className="w-full min-h-[52px] outline-none rounded-[20px] px-4"
                        required
                        placeholder="Nhập tên lớp... (Ví dụ: 8C1, 8A)"
                        value={classSchool}
                        onChange={(e) => setClassSchool(e.target.value)}
                    />
                    <div
                        className="min-h-[200px] min-h-[74px] bg-[#ff3f34] text-[#d2dae2] hover:opacity-70 flex justify-center items-center p-4 rounded-[80px] select-none cursor-pointer font-semibold mt-[40px]"
                        onClick={handleUpdateInfo}
                    >
                        Cập nhật thông tin
                    </div>
                </div>
            </div>
        </div>
    )
}
