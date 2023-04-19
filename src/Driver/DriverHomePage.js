import React, { useState, useEffect } from 'react'
import { Button } from '../Components/StaticComponents'

//props.onActivationStateChange = funciton called when activate state is toggled. Gives the NEW state as a param
export default function DriverHomePage(props) {
  const token = props.token
  const [isActivated, setIsActivated] = useState(false)

  const handleToggle = () => {
    setIsActivated(!isActivated)
    props.onActivationStateChange(!isActivated)
  }

  return (
    <div>
      <div
        className="status"
        style={{
          marginTop: '80px',
          marginBottom: '280px',
          marginLeft: '200px',
          marginRight: '180px',
          display: 'flex',
          alignItems: 'space-around'
        }}
      >
        <input
          type="text"
          placeholder="Current Status:"
          value={`Current Status: ${isActivated ? 'Active' : 'Inactive'}`}
          readOnly
          style={{ marginRight: '10px', border: 0, fontSize: '20px', }}
        />

        <Button 
            onClick={handleToggle}
        >
            {isActivated ? 'Deactivate' : 'Activate'}
        </Button>
      </div>
    </div>
  )
}
