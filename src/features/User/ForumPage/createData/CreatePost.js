
import { lazy, useEffect, useState, useRef } from 'react'


import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notifyInfo } from '../../../../components/Alert/AlertComponent'

//Editor
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';



// Lazy
const Navigation = lazy(() => import('../../../../components/Navigation/NavigationComponent'))
const Footer = lazy(() => import('../../../../components/Footer/FooterComponent'))

export default function CreatePost() {
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')




    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.auth.login.currentUser)
    useEffect(() => {

        if (!currentUser) {
            navigate('/auth')
            notifyInfo('Bạn cần đăng nhập để đăng bài viết!')
            return
        }
    }, [])


    const editorRef = useRef(null)
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent())
        }
    }


    return (
        <>

            <Navigation currentUser={currentUser} />
            <div className='h-full w-full relative mt-[106px]'>
                <button className='relative left-[80%] mt-[1%] mb-[10px] bg-[#f4742577] text-white rounded-3xl p-2 ' style={{ backgroundColor: ` ${Boolean(title) && Boolean(content) && '#f47425'} ` }}>Xuất bản</button>
                <input value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Tiêu đề' className=' p-2 outline-none border-none w-full placeholder:text-[40px] placeholder:font-semibold text-[40px] ' maxLength={50} />
                <Editor
                    apiKey='r3u127an0pxiu2t96wuv3b8z7fqx3sf9huowyykivlqdew00'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: true,
                        automatic_uploads: true,
                        images_upload_url: 'postAcceptor.php',
                        images_upload_handler: async function (blobInfo, success, failure) {
                            const file = blobInfo.blob()
                            const data = new window.FormData()
                            const reader = new FileReader()
                            reader.onload = async () => {
                                data.append('image', reader.result.split(',')[1])
                                const configAxios = {
                                    method: 'post',
                                    url: 'https://api.imgur.com/3/image',
                                    headers: {
                                        'Authorization': 'Client-ID fa3112521384151',

                                    },
                                    data: data
                                }
                                axios(configAxios)
                                    .then(function (response) {
                                        success(response.data.link)
                                    })
                                    .catch(function (error) {
                                        console.log(error)
                                    })
                            }
                            reader.readAsDataURL(file)

                        },
                        branding: false,
                        language: 'vi',
                        language_url: '/langs/vi.js',
                        skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
                        content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'),
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'image', 'emoticons', 'code'
                        ],
                        toolbar: 'undo redo | blocks |  charmap emoticons | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help'
                    }}
                />
                <button onClick={log}>Log editor content</button>
                <Footer />
            </div>

        </>
    )
}