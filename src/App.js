import './App.css';
import SearchPage from './components/SearchPage/SearchPage';
import { useEffect , useState } from 'react'
import axios from 'axios';
import drugJson from './data/Drug-data.json';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';

function App() {
  const [searchText , setsearchText] = useState("");
  const [drugData , setdrugData] = useState({});
  const [error , seterror] = useState("")
  const [matches , setMatches] = useState([]);

  function handleSubmit(event){
    event.preventDefault();
    let apiCallString = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchText}"`
    axios.get(apiCallString).then(function(response){
      setsearchText("")
      setdrugData({})
      setdrugData(response.data.results[0]);

    }).catch(function (error){
      setdrugData({})
      seterror('drug data not found in our repositery please check what you have typed')
    });

  }

  function handleChange(e){
    setsearchText(e.target.value)

}

useEffect(() => {
  let matched = drugJson.filter(drug => {
    if(searchText === ""){ return }

    const regex =new RegExp(`^${searchText}`,'gi');
    return drug.Name.match(regex) || drug.Composition.match(regex)
  })
  setMatches(matched)
} , [searchText])
console.log(searchText)
console.log(matches)








  return (
    <div className="App">
      <UnderConstruction/>
      
      <SearchPage matches = {matches} handleChange = {handleChange} handleSubmit= {handleSubmit} searchText = {searchText} drugData = {drugData} error = {error}/>
    </div>
  );
}

export default App;
