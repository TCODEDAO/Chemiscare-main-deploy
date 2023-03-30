import { lazy } from "react"
import CreatePost from '../features/User/ForumPage/CreateData/CreatePost'




const HomePage = lazy(() => import('../features/User/HomePage/HomePage'))
const AuthPage = lazy(() => import('../features/User/AuthPage/AuthPage'))
const CelebratePage = lazy(() => import('../features/User/CelebratePage/CelebrateComponent'))
const RulePage = lazy(() => import('../features/User/RulePage/RuleComponent'))
const LearnPage = lazy(() => import('../features/User/LearnPage/LearnPage'))
const DetailUserInfomation = lazy(() => import('../features/User/AuthPage/DetailUserInfomation'))
const RatePage = lazy(() => import("../features/User/RatePage/RatePage"))
const UserPage = lazy(() => import('../features/User/UserPage/UserPage'))
const AnotherPage = lazy(() => import('../features/User/UserPage/AnotherPage'))
//Game
const StartGameComponent = lazy(() => import('../features/User/GamePage/Quiz/StartGame/StartGameComponent'))

const ContainerGameComponent = lazy(() => import('../features/User/GamePage/Quiz/ContainerGame/ContainerComponent'))
//Forum
const ForumComponent = lazy(() => import('../features/User/ForumPage/ForumPage'))
//Posts
const SinglePostComponent = lazy(() => import("../features/User/ForumPage/SinglePost/SinglePostComponent"))
const EditPostComponent = lazy(()=>import("../features/User/ForumPage/EditData/EditPostComponent"))

//Admin
const QuestionComponentManagement = lazy(() => import('../features/Admin/QuestionManagementPage/QuestionComponentManagement'))
const PostsCensor = lazy(() => import('../features/Admin/ForumManagementPage/CensorPost'))
const publicRoutes = [
    { id: 0, path: '/', index: true, component: HomePage },
    { id: 1, path: '/auth', index: true, component: AuthPage },
    { id: 2, path: '/celebrate', index: true, component: CelebratePage },
    { id: 3, path: '/rules', index: true, component: RulePage },
    { id: 4, path: '/learn', index: true, component: LearnPage },
    { id: 5, path: '/learn/rate', index: true, component: RatePage },
    { id: 5, path: '/auth/detail', index: true, component: DetailUserInfomation },
    { id: 6, path: '/learn/game/start', index: true, component: StartGameComponent },
    { id: 7, path: '/learn/game/content', index: true, component: ContainerGameComponent },
    { id: 8, path: '/forum', index: true, component: ForumComponent },
    { id: 9, path: '/forum/user/create', index: true, component: CreatePost },
    { id: 9, path: '/forum/user/posts/edit/:postSlug', index: true, component: EditPostComponent },
    { id: 10, path: '/forum/post/:postSlug', index: true, component: SinglePostComponent },
    { id: 11, path: '/user/userPage', index: true, component: UserPage },
    { id: 12, path: '/user/userPage/:userId', index: true, component: AnotherPage },



]
const privateRoutes = [
    { id: 0, path: '/admin/question', index: true, component: QuestionComponentManagement },
    { id: 1, path: '/admin/forum/posts', index: true, component: PostsCensor }
]
export { publicRoutes, privateRoutes }
