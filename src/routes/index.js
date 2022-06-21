import { lazy } from "react"


const HomePage = lazy(() => import('../features/User/HomePage/HomePage'))
const AuthPage = lazy(() => import('../features/User/AuthPage/AuthPage'))
const CelebratePage = lazy(() => import('../features/User/CelebratePage/CelebrateComponent'))
const RulePage = lazy(() => import('../features/User/RulePage/RuleComponent'))
const LearnPage = lazy(() => import('../features/User/LearnPage/LearnPage'))
const DetailUserInfomation = lazy(() => import('../features/User/AuthPage/DetailUserInfomation'))

//Game
const StartGameComponent = lazy(() => import('../features/User/GamePage/Quiz/StartGame/StartGameComponent'))

const ContainerGameComponent = lazy(() => import('../features/User/GamePage/Quiz/ContainerGame/ContainerComponent'))
//Forum
const ForumComponent = lazy(() => import('../features/User/ForumPage/ForumPage'))
//Posts
const CreatePost = lazy(() => import('../features/User/ForumPage/createData/CreatePost'))

//Admin
const QuestionComponentManagement = lazy(() => import('../features/Admin/QuestionManagementPage/QuestionComponentManagement'))
const publicRoutes = [
    { id: 0, path: '/', index: true, component: HomePage },
    { id: 1, path: '/auth', index: true, component: AuthPage },
    { id: 2, path: '/celebrate', index: true, component: CelebratePage },
    { id: 3, path: '/rules', index: true, component: RulePage },
    { id: 4, path: '/learn', index: true, component: LearnPage },
    { id: 5, path: '/auth/detail', index: true, component: DetailUserInfomation },
    { id: 6, path: '/learn/game/start', index: true, component: StartGameComponent },
    { id: 7, path: '/learn/game/content', index: true, component: ContainerGameComponent },
    { id: 8, path: '/forum', index: true, component: ForumComponent },
    { id: 9, path: '/forum/user/create', index: true, component: CreatePost }



]
const privateRoutes = [
    { id: 0, path: '/admin/question', index: true, component: QuestionComponentManagement }
]
export { publicRoutes, privateRoutes }
