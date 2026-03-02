// import React from 'react'
// import { createContext } from 'react'
// export const authDataContext= createContext()
// function AuthContext({children}) {
//     let serverUrl = "http://localhost:8000"

//     let value = {
//        serverUrl
//     }
//   return (

    
//     <div>
//         <authDataContext.Provider value={value}>
//             {children}
//         </authDataContext.Provider>
      
//     </div>
//   )
// }

// export default AuthContext
import React, { createContext } from 'react'

export const authDataContext = createContext()

function AuthContextProvider({children}) {
    // This looks for your Vercel Environment Variable first, then falls back to localhost for your PC
    let serverUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000"

    let value = {
       serverUrl
    }
    
  return (
    <authDataContext.Provider value={value}>
        {children}
    </authDataContext.Provider>
  )
}

export default AuthContextProvider