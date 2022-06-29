import { Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'

//Notify
import 'react-toastify/dist/ReactToastify.css'

// Routes
import { publicRoutes, privateRoutes } from './routes/index'
import './App.css';
import NotFound from './components/NotFound/NotFoundComponent'
import { ToastContainer } from 'react-toastify'
import LoadingComponent from './components/Loading/LoadingComponent';


function App() {


  return (
    <div className='App'>

      <Suspense fallback={<LoadingComponent />} >
        <Routes>
          {publicRoutes.map((route) => {
            const Page = route.component

            return (
              <Route
                path={route.path}
                element={<Page />}
                key={route.id}
                index={route.index}
              />
            )
          })}
          {privateRoutes.map((route) => {
            const Page = route.component

            return (
              <Route
                path={route.path}
                element={<Page />}
                key={route.id}
                index={route.index}
              />
            )
          })}

          <Route path="*" element={<NotFound />}></Route>

        </Routes>

      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </div>
  )
}

export default App
