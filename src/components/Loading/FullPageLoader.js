import React, { memo } from 'react'
const loadAnimate = require('../../assets/images/gif/noBgLoad.gif')

function FullPageLoader({ showLoader }) {
    return (
        <>
            {showLoader && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-[#f8f8f86f] z-[1000000000000000]">
                    <img
                        src={loadAnimate}
                        alt="loading..."
                        className="left-[45%] top-[32%] z-[10000000000000000] absolute"
                    />
                </div>
            )}
        </>
    )
}

export default memo(FullPageLoader)
