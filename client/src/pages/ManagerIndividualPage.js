import { useState } from 'react'
import NavigationTab from '../components/NavigationTab'
import BarGraph from '../components/BarGraph'
const ManagerIndividualPage = ({ pageUpdater, employeeData, subordinateData }) => {
  const [graphDisplayOption, setGraphDisplayOption] = useState('D')
  const setDaily = (e) => setGraphDisplayOption('D')
  const setMonthly = (e) => setGraphDisplayOption('M')
  const setYearly = (e) => setGraphDisplayOption('Y')
  return <div className='page-container'>
        {employeeData.isManager && <NavigationTab pageUpdater={pageUpdater}/>}
        <div className='date-info-container'>
          <div className=''>
          </div>
          <div className='payment-history-title'>Payment History</div>
          <div className='time-scale-button-container'>
            <button className='timescale-button' onClick={setDaily}>Weekly</button>
            <button className='timescale-button' onClick={setMonthly}>Monthly</button>
            <button className='timescale-button' onClick={setYearly}>Yearly</button>
          </div>
          <div className='graph-container'>
            <div className='graph'>
              <BarGraph timeOption={graphDisplayOption}/>
            </div>
          </div>
        </div>
      </div>
}
export default ManagerIndividualPage
