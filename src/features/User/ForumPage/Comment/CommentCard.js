import { memo, } from 'react'

import moment from 'moment'
import 'moment/locale/vi'
import Avatar from '../../../../components/Avatar/AvatarComponent'

//config language
moment.locale('vi')




function CommentCard({ children, comment }) {


    return (
        <div className="flex my-[20px]" key={comment._id}>
            <div className="mr-[8px]">
                {comment?.userId.avatar ? <img className="w-[36px] h-[36px] object-cover rounded-[50%]"
                    src={comment?.userId.avatar} alt="" /> : <Avatar name={comment?.userId?.fullName}
                        size="36px" />}

            </div>
            <div className="maxWidthClassName">
                <div className="bg-[#353945] px-[12px] py-[10px] max-w-[30.5rem] rounded-[16px] mb-[8px]">
                    <p className="font-medium mb-[4px] text-white ">{comment?.userId?.fullName}</p>
                    <p className="font-light break-words text-white ">{comment?.content}</p>
                </div>
                <div className="flex items-center text-[14px] justify-between mb-[8px]">
                    <p className="opacity-[0.9] font-light text-white">{moment(comment?.createdAt).fromNow()}</p>
                </div>


                {children}

            </div>
        </div>
    )
}

export default CommentCard