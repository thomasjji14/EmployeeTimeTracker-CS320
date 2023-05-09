import './EmployeeSearch.css'

const DaySearch = ({ text, updateText }) => {
  const submit = async (event) => event.preventDefault()
  const handleDayNameChange = (event) => updateText(event.target.value)

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={submit}>
        <input className="employee-search-input" value = {text} placeholder = 'Enter date' onChange={handleDayNameChange}/><br/>
      </form>
    </div>
  )
}

export default DaySearch
