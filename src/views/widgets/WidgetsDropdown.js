import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol
} from '@coreui/react'



let array1;
let appBook,array2;

// eslint-disable-next-line no-unused-vars



const WidgetsDropdown = ({total, totalArrived, paitentWithDoctor, waitingToBeCalled}) => {



 // console.log(props.apiData)
 //array2=countnumber(props);
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={total}
          text="Total Appointment Booked"
          footerSlot={
            <div></div>
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown

          color="gradient-info"
          header={totalArrived}
          text="Total Patient Arrived"
          footerSlot={
            <div></div>
          }
        >

        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={waitingToBeCalled}
          text="Waiting to be Called In"
          footerSlot={
            <div></div>
          }
        >

        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={paitentWithDoctor}
          text="Patient with Doctor"
          footerSlot={
            <div></div>
          }
        >

        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
