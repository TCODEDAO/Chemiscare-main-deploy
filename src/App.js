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
import { Helmet } from 'react-helmet';

function App() {


  return (
    <div className='App'>
<Helmet>
<meta name="robots" content="index, follow" />
<meta name="google-site-verification" content="9Nw_sBwTLSdoMmirzBDSKJElbF3ZwxX67YfpThf-OV0" />
</Helmet>
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
