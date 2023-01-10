import React from "react"

const Error = ({children}) => {
  return (
    <div className="bg-danger text-light p-3 fs-6 rounded text-uppercase mb-4 text-center">
      {children}
    </div>
  )
}

export default Error