import React, { Fragment } from 'react'
import classes from './Avatar.module.css'

const Avatar = ({ name, imageUrl, size, randomPairNumber = 4 }) => {
    const randomColor = () => {
        const pairOfColor = [
            { background: '#e84118', color: '#2f3640' },
            { background: '#4cd137', color: '#f5f6fa' },
            { background: '#f368e0', color: '#c8d6e5' },
            { background: '#48dbfb', color: '#0abde3' },
            { background: '#000000', color: '#F5A6B9' },
        ]
        // const randomPairNumber = Math.floor(Math.random() * 5)
        return pairOfColor[randomPairNumber]
    }

    const { background, color } = randomColor()
    return (
        <Fragment>
            <div className={classes.container}>
                {imageUrl && (
                    <img
                        className={classes.avatarImage}
                        style={{ width: size, height: size }}
                        alt="avatar"
                        src={imageUrl}
                    />
                )}
                {imageUrl === undefined && name !== '' && (
                    <div
                        className={classes.avatatext}
                        style={{
                            width: size,
                            height: size,
                            color: color,
                            background: background,
                        }}
                    >
                        {name?.substring(0, 1)}
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default Avatar
