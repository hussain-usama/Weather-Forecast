import {useState} from 'react'
import './index.css'
function SearchHostory() {

    const [loadResults]=useState(JSON.parse(localStorage.getItem('SearchResults')))
    console.log(loadResults,'loadResults')
    return (
      <div className="allhistoryMain">
          <h2>All Searches</h2>
          {loadResults?.length ?
            loadResults.map((item,index)=>{
              return (
                <p className='whiteText' key={index}>{item}</p>
              )
            })  
            : null
        }
      </div>
    );
  }
  
  export default SearchHostory;
  