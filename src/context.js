import React, { useState } from 'react'
export const Data = React.createContext()
const Context = ({ children }) => {
  const [data, setData] = useState([])
  return (
    <Data.Provider value={[data, setData]}>
      {children}
    </Data.Provider>
  )
}

export default Context
