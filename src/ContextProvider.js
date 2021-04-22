import React, { useState } from 'react'
export const Data = React.createContext()
const ContextProvider = ({ children }) => {
  const [data, setData] = useState([])
  return (
    <Data.Provider value={[data, setData]}>
      {children}
    </Data.Provider>
  )
}

export default ContextProvider
