// import { hope } from "./eventsData";
import { useState, Dispatch, SetStateAction } from "react";
import SearchableDropdown from './SearchableDropdown';

type eventType = {
  id: number,
  name: string,
  contents: eventType[]
}

const events = {id: -1, name: "DSMP", contents: [
    {id: 0, name: "Early DSMP", contents: [
      {id: 1, name: "Unity Era", contents: [
        {id: 2, name: "The First Trial", contents: []}, 
        {id: 3, name: "Joffrey Trials", contents: []},
        {id: 4, name: "Burning of Ponk's First Lemon Tree", contents: []}
      ]}, 
      {id: 5, name: "Growth Era", contents: [
        {id: 6, name: "TommyInnit's Arrest", contents: []},
        {id: 7, name: "Dream SMP Civil War", contents: []},
        {id: 8, name: "The First Disc War", contents: []},
        {id: 9, name: "The Socializing Club Conflict", contents: []},
        {id: 10, name: "Diamond Armor Scam", contents: []}

      ]}
      ]
    },
    {id: 11, name: "L'manberg Independence Arc", contents: []}
]}



// to recursively generate events listing
function GenerateEvents(eventsTemp: eventType) {
  const [ tierOpen, setTierOpen ] = useState(false)

  return (
    <li key={eventsTemp.id} className={"px-4 font-monospace" } onClick={e => {
      e.stopPropagation();
      setTierOpen(!tierOpen)}}>
      
      {eventsTemp.name}
      {eventsTemp && eventsTemp.contents.length > 0 && (
      
        <ul className={(tierOpen ? "hidden" : "")}>
          {eventsTemp.contents.map(content => (
            GenerateEvents(content)

          ))}
        </ul>
      )}
    </li>
  )
}



export default function Navbar({selected, setSelected, creatorsList} : {selected: string[], setSelected:Dispatch<SetStateAction<string[]>>, creatorsList: string[]}) {

  return (
    <nav className="bg-green-700 h-screen">
      {/* navbar title */}
      <h2 className="font-monospace text-3xl pt-16 pl-8">
          ./Catalog
      </h2>


      {/* tier one ARCS */}
      {/* <div className="pt-8 px-6 font-monospace">
        <ul >
          {events.map(({ id, name, contents }) => (
            <li key={id} className="">
              <p>{name}</p>
            </li>
          ))}
        </ul>

        <ul >
          {events.map(({ id, name, contents }) => (
            <li key={id} className="">
              <p>{name}</p>

              <ul className="px-4">
                {contents.map(({ id, name, contents }) => (
                <li key={id} className="">
                  <a >b {name}</a>

                  <ul className="px-4 ">
                    {contents.map(({ id, name }) => (
                      <li key={id} className="">
                        {name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              </ul>
            </li>
          ))}
        </ul>
          
      </div> */}
      <div>
        <ul>
          {events.contents.map(({ id, name, contents }) => (
            
            GenerateEvents({id, name, contents})
         
         ))}
        </ul>
      </div>
      
      <div>
        <div className="m-2 font-monospace">
          View By: 
          <select className="m-2">
            <option value="viewAll">all</option>
            <option value="viewStory">story only</option>
            <option value="viewChill">chill streams</option>
          </select>
        </div>
        <div className="m-2 font-monospace">
          <p>Include Creators:</p>
          <SearchableDropdown fromList={ creatorsList } selected={selected} setSelected={setSelected}/>
        </div>


      </div>
        
    </nav>
  );
}
