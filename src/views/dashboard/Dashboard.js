import React, { lazy, useEffect, useState } from 'react'
import { link, Link } from 'react-router-dom';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSwitch,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { checkPropTypes } from 'prop-types';

const callPatient = (number, name) => {
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  var targetUrl = 'https://q1fjzbeq8l.execute-api.us-east-1.amazonaws.com/non-prod/make-outbound-call';
  fetch(proxyUrl + targetUrl, {
    method: "POST",
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type/JSON',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
      "X-API-Key": "4ej79ShQA8JeqVFOKV366OnjC4ZMUKk9kUWnOat2",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "callbackNumber": number.toString(),
      "name": name
    }),

  })
}

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {


  const [data, setData] = useState([])
  const [buttonStatus, setButtonStatus] = useState(0);
  const [checkedStatus, setcheckedStatus] = useState(true);
  const [totalArrived, setTotalArrived] = useState(0)
  const [waitingToBeCalled, setWaitingToBeCalled] = useState(0)
  const [paitentWithDoctor, setPatientWithDoctor] = useState(0)


  useEffect(() => {
    setInterval(async () => {
      try {
        const response = await fetch(
          "https://v12qe1f1jf.execute-api.us-east-1.amazonaws.com/Dev/get-all-data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseJson = await response.json();
        //  console.log(responseJson);
        const newData = [];
        for (let index = 0; index < responseJson?.responseData.length; index++) {
          const element = responseJson?.responseData[index];
          newData.push(element);
        }
        setData(newData)
        console.log("newData", newData)
        setTotalArrived(newData.filter(eachData => eachData.arrived === "Yes" || eachData.arrived === "With Doctor").length)
        setPatientWithDoctor(newData.filter(eachData => eachData.arrived === "With Doctor").length)
        setWaitingToBeCalled(newData.filter(eachData => eachData.arrived === "Yes").length)
      } catch (error) {
        console.log(error);
      }
    }, 100)
  }, [])

  const changeStatusToWithDoctor = async (data) => {
    const response = await fetch("https://v12qe1f1jf.execute-api.us-east-1.amazonaws.com/Dev/get-patient-data", {
      method: "POST",
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "DOB": data.DOB,
        "PhoneNo": data.PhoneNo,
        "arrived": "With Doctor",
        "dateTime": data.dateTime
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const jsonResponse = response.json();
    console.log("respone", jsonResponse)
  }

  const changeStatusToYes = async (data) => {
    const response = await fetch("https://v12qe1f1jf.execute-api.us-east-1.amazonaws.com/Dev/get-patient-data", {
      method: "POST",
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "DOB": data.DOB,
        "PhoneNo": data.PhoneNo,
        "arrived": "Yes",
        "dateTime": data.dateTime
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const jsonResponse = response.json();
    console.log("respone", jsonResponse)
  }


  return (
    <>
      <WidgetsDropdown total={data.length} totalArrived={totalArrived} paitentWithDoctor={paitentWithDoctor} waitingToBeCalled={waitingToBeCalled} />
      <CCard>

      </CCard>

      {/* <WidgetsBrand withCharts/> */}

      <CRow>
        <CCol>
          <CCard>

            <CCardBody>


              {/* edit here */}
              <table className="table table-hover table-outline mb-0 d-none d-sm-table ">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Patient Name</th>
                    <th className="text-center">Appointment Time</th>
                    <th>Arrived Status</th>
                    <th className="text-center">With Doctor Status</th>
                    <th className="text-center">Checking In</th>
                    <th>Appointed Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((eachData, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <div className="c-avatar">
                              <img src={'avatars/1.jpg'} className="c-avatar-img" />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{eachData.name}</div>
                            <div className="small text-muted">
                              <span>Contact-</span> {eachData.PhoneNo}
                            </div>
                          </td>
                          {/* <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td> */}
                          <td>
                            <div className="text-center">
                              <h6 className="bold">{eachData.dateTime}</h6>
                            </div>

                          </td>
                          <td className="text-center">
                          <CBadge className="mr-1" color="primary">
                          { eachData.arrived == "Yes" ? "Yes":false  }
                          </CBadge>
                          <CBadge className="mr-1" color="secondary">
                          { eachData.arrived == "No" ? "No":false  }
                          </CBadge>
                          <CBadge className="mr-1" color="success">
                          { eachData.arrived == "With Doctor" ? "with Doctor":false  }
                          </CBadge>
                          </td>

                            <td className={"text-center"}>
                              <CSwitch
                                color={'primary'}
                                labelOn={'\u2713'}
                                labelOff={'\u2715'}
                                defaultValue={checkedStatus}
                                checked={eachData.arrived === "With Doctor" ? true : false}
                                disabled={eachData.arrived === "No" && true}
                                onChange={(event) => {
                                  changeStatusToWithDoctor(eachData)
                                  changeStatusToYes(eachData)
                                }} />
                            </td>

                          <td>
                            <div className="small text-muted">
                            <CBadge className="mr-1" color="danger">
                            { eachData.arrived == "Yes" ? "waiting to be called" : false }
                            </CBadge>
                            <CBadge className="mr-1" color="secondary">
                            { eachData.arrived == "No" ? "not arrived" : false }
                            </CBadge>
                            <CBadge className="mr-1" color="info">
                            { eachData.arrived == "With Doctor" ? "with doctor" : false }
                            </CBadge>
                            </div>
                              <button
                              disabled={(eachData.arrived === "Yes" ? false : true)}
                              className="btn btn-success" onClick={() => {

                                callPatient(eachData.PhoneNo, eachData.name)
                              }}>
                                <CIcon height={20} name="cil-phone" title="phone" id="phone" />
                              </button>


                          </td>
                          <td>with Casey</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
