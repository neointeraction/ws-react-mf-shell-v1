import React from 'react'
import { HostProvider } from '../store/store'


const AppLayout = ({children}) => {
  return (
    <HostProvider>
      {children}
    </HostProvider>
  )
}

export default AppLayout
