"use client"
import { useState } from "react";
import VodsRow from "./components/renderTable"
import vods from "./media/miniSheet";

function CreateRows( singleVod ) {
  const [ vodOpen, setVodOpen ] = useState(false);
  return (
             
      [ <div className="table-row" onClick={e => setVodOpen(!vodOpen)}>
            <div className="table-cell">{singleVod.id}</div>
            <div className="table-cell">{singleVod.date}</div>
            <div className="table-cell">{singleVod.creator}</div>
            <div className="table-cell">{singleVod.title}</div>
            <div className="table-cell">{singleVod.isAlt.toString()}</div>
          </div>,
        <div>
        <div className={ vodOpen ? "hidden" : "" }>
          <p>hllo world</p>
        </div>


      </div>
      ]
   )
}

export default function Home() {
	console.log(vods);

  return (

    <div>
			<div className="bg-red-700 h-200 font-monospace">
				<p> hello world </p>
				
        <div className="table">
          <div className="table-header-group">
            <div className="table-row">{Object.keys(vods[0]).map((key) => { if (!(key == "cid" || (key.includes("archive")) || (key.includes("youtube")) || (key.includes("notes")) ))  return <div className="table-cell border">{key}</div>
              })}
            </div>
          </div>
          
          <div className="table-row-group">
            {vods.map(( singleVod ) => (
              CreateRows(singleVod)
            ))}
          </div>
        </div>

        


			</div>
      <p className="bg-red-400 h-screen">hello world </p>
    </div>
  );
}
