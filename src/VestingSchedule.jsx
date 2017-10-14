import React from 'react'
import VestingChart from './VestingChart'
import Emoji from './Emoji'


function VestingSchedule({ details }) {
  return  (
    <div>
      <h4>Vesting schedule</h4>
      { ! details.revoked
          ? <VestingChart details={ details } />
          : <Revoked />
      }
    </div>
  )
}

function Revoked() {
  return <div className="revoked">
    <span className="revoked-message">
      <Emoji e="⚠️" /> Revoked
    </span>
    <VestingChart details={ {} } />
  </div>
}

export default VestingSchedule