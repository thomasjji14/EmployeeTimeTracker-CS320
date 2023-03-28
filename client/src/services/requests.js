import axios from 'axios'

const baseURL = "http://localhost:5000"

const validateLogin = (username, password) => {
  try{
    return axios.post(`${baseURL}/user/get`, {
      username: username,
      password: password
    })
  } catch(e){
    return e
  }
}

const getManagerViewData = (employeeId, companyName, isManager) => {
  try{
    console.log("WE ARE TRYING OUR BEST, WE ARE DYING OUT HERE")
    // console.log(axios.post(`${baseURL}/user/manage`, {
    //   employeeId, companyName, isManager
    // }))
    return axios.post(`${baseURL}/user/manage`, {
      employeeId, companyName, isManager
    })
  } catch(e){
    console.log("ERRORERROR ERROR ERROR ERROR  ")
    return e
  }
}

const methods = {validateLogin, getManagerViewData} // Recent React needs this to be a separate obj

export default methods;
