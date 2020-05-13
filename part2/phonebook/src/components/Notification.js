import React from 'react'


const Notification = ({ message: statusMessage }) => {
    if (statusMessage === null) {
      return null
    }
  
    return (
      <div className={statusMessage.type}>
        {statusMessage.message}
      </div>
    )
  }

  export default Notification;