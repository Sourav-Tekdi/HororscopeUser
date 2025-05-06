import React from 'react'
import RoutesComponent from './admin/routes/Routes'
import { ReactNotifications } from 'react-notifications-component'
function App() {
  return (
    <>
      <ReactNotifications />
      <RoutesComponent />
    </>
  )
}

export default App
