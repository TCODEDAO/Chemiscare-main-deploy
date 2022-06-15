import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect, Suspense } from 'react'

//Notify
import 'react-toastify/dist/ReactToastify.css'

// Routes
import { publicRoutes } from './routes/index'
import './App.css';
import { ToastContainer } from 'react-toastify'
import NotFound from './components/NotFound/NotFoundComponent';

function App() {

  return (
    <div className='App'>

      <Suspense fallback={<></>}>
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
