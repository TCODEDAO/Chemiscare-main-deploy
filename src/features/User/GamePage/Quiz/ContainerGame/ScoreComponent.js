import React, { memo } from 'react'
import { useSelector } from 'react-redux'

function ScoreComponent({ min, sec, level }) {
    const currentScore = useSelector((state) => state.quiz?.score?.currentScore)
    const currentUser = useSelector((state) => state.auth?.login?.currentUser)



    return (
        <div className="z-[2] absolute hideInMoblie text-white w-[100px] h-[100px] bg-[#2A3132] top-[2%] right-[1%] w-[206px] h-[192px] flex flex-col justify-around items-center rounded-3xl">
            <div className="bg-[#b2bec3] p-2 rounded-[20px]">
                Thời gian:{' '}
                <span className="Time">
                    {min}:{sec}
                </span>
            </div>
            <div className="bg-[#fdcb6e] min-w-[10px] p-3 rounded-[20px] text-black ">
                Điểm: {currentScore}
            </div>
            <div className="border-b border-solid border-[#fff] pb-1">
                {currentUser.fullName}
            </div>

            <div className="pb-1">Cấp độ: {level}</div>
        </div>
    )
}

export default memo(ScoreComponent)
