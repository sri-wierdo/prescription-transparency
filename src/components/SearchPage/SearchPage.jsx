import React from 'react'
const SearchPage = ({matches , handleChange , handleSubmit , searchText , drugData , error}) => {
    
  return (
    <>
    SearchPage
    <form action="Search_Drug_Data" onSubmit={event => handleSubmit(event)}>
    <input type="text" onChange={e => handleChange(e) } value = {searchText} placeholder = 'enter a drug name'/>
    <button onClick={event => handleSubmit(event)}>Search</button>
    </form>
{JSON.stringify(drugData) !== "{}" ? 
      <> 
        <p>Generic Name:{drugData.openfda.generic_name[0]}
          <br />and it is a {drugData.openfda.product_type[0]}
          <br />{drugData.indications_and_usage}
        </p>
      </> 
      : 
      <>
        <p>enter the brand name of any drug registered in USA</p>
      </>}
    {error !== "" ? <><p>{error}</p></> : <></>} 
    </>
  )
}

export default SearchPage