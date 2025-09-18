// import { hope } from "./eventsData";
"use client"
import { useState } from "react";

const events = [
    {id: 0, name: "Early DSMP", contents: [
      {id: 1, name: "Unity Era", contents: [
        {id: 2, name: "The First Trial"}, 
        {id: 3, name: "Joffrey Trials"},
        {id: 4, name: "Burning of Ponk's First Lemon Tree"}
      ]}, 
      {id: 5, name: "Growth Era", contents: [
        {id: 6, name: "TommyInnit's Arrest"},
        {id: 7, name: "Dream SMP Civil War"},
        {id: 8, name: "The First Disc War"},
        {id: 9, name: "The Socializing Club Conflict"},
        {id: 10, name: "Diamond Armor Scam"}

      ]}
      ]
    },
    {id: 11, name: "L'manberg Independence Arc"}
]

// to recursively generate events listing
function GenerateEvents(  id, name, eventsTemp  ) {
  const [ tierOpen, setTierOpen ] = useState(false)

  return (
    <li key={id} className={"px-4 font-monospace" } onClick={e => {
      e.stopPropagation();
      setTierOpen(!tierOpen)}}>
      
      {name}
      {eventsTemp && eventsTemp.length > 0 && (
      
        <ul className={(tierOpen ? "hidden" : "")}>
          {eventsTemp.map(({ id, name, contents } ) => (
            GenerateEvents(id, name, contents)

          ))}
        </ul>
      )}
    </li>
  )
}



export default function Navbar() {

  return (
    <nav className="bg-green-700 w-72 h-screen sticky self-start top-0 right-0 overflow-y-auto">
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
          {events.map(({ id, name, contents }) => (
            
            GenerateEvents(id, name, contents)
         
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
       <div className="m-2 font-monospace ">
          Sort By:
            <select className="m-2 my-0">
              <option className="font-monospace">pure chonological</option>
              <option className="font-monospace">content creator (a-z)</option>
              <option className="font-monospace">content creator (chrono)</option>
              <option className="font-monospace">title (a-z)</option>
            </select>
        </div>
        <div className="m-2 font-monospace">
          Include Creators:
            <select className="m-2 my-0">
              <option></option>

            </select>
        </div>
        <div className="m-2 font-monospace">
          Exclude Creators:
            <select className="m-2 my-0">
              <option></option>

            </select>
        </div>



      </div>
        
    </nav>
  );
}
