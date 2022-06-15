import React from 'react'
const loadAnimate = require('../../assets/images/gif/noBgLoad.gif')
function LoadingComponent() {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white">
            <img src={loadAnimate} alt="loading..." />
        </div>
    )
}
export default LoadingComponent
