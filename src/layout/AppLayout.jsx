import React from 'react'
import { HostProvider } from '../host.context/host.context'


const AppLayout = ({children}) => {
  return (
    <HostProvider>
      {children}
    </HostProvider>
  )
}

export default AppLayout
