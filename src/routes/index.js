import { lazy } from "react";

const HomePage = lazy(() => import('../features/User/HomePage/HomePage'))
const AuthPage = lazy(() => import('../features/User/AuthPage/AuthPage'))
const CelebratePage = lazy(() => import('../features/User/CelebratePage/CelebrateComponent'))
const RulePage = lazy(() => import('../features/User/RulePage/RuleComponent'))
const publicRoutes = [
    { id: 0, path: '/', index: true, component: HomePage },
    { id: 1, path: '/auth', index: true, component: AuthPage },
    { id: 2, path: '/celebrate', index: true, component: CelebratePage },
    { id: 3, path: '/rules', index: true, component: RulePage }

]

export { publicRoutes }
