"use client"
import { useState } from 'react';
import vods from "./media/dsmpVodsMasterSheet";
import ReactPaginate from 'react-paginate';

export default function Home() {
  var vodsInUse = vods;
/**
  const [ viewBy, setViewBy ] = useState("all");
  const [ sortBy, setSortBy ] = useState("pure chronological");
  const [ includeCr, setIncludeCr ] = useState([]);
  const [ excludeCr, setExcludeCr ] = useState([]);

  function sortViewBy( viewBy:String ) {
    
  }
**/
/**const Pagination = ({vodsPerPage, totalVods, setCurrentPage, currentPage}) => {
    const pageNumbers = [];
    for ( var i = 1; i*vodsPerPage <= totalVods ; i++) {
      pageNumbers.push(i);

    }
    const paginate = (pageNumber, e) => {
      e.preventDefault();
      setCurrentPage(pageNumber);
    };
  return (
  )
  }
**/
  const totalVods = vodsInUse.length;
  const [ vodsPerPage, setVodsPerPage ] = useState(50);
  const [ currentPage, setCurrentPage ] = useState(0);

  var totalPages = 61;
/**  function getTotalPages( vodsPerPage ) {
    totalPages = Math.round((totalVods / vodsPerPage)+1);
  }**/
  function makeRow( singleVod ) {
    const [ rowExpand, setRowExpand ] = useState(false);
    return [
      <tr key={singleVod.id} onClick={() => setRowExpand(!rowExpand)}>
        <td>{singleVod.id}</td>
        <td>{singleVod.date}</td>
        <td>{singleVod.creator}</td>
        <td>{singleVod.title}</td>
        <td>{singleVod.isAlt.toString()}</td>
      </tr>,
      rowExpand && (
      <tr key={singleVod.id + 10000}>
        <td colSpan={5} >
          <p>IA: {singleVod.archiveLink}</p>
          <p>IA archiver: {singleVod.archiver}</p>
        </td>
      </tr>
      
      )
    ]
  }
  

  return (
    <div>
      
    
      <div className="bg-slate-900 h-200 font-monospace">
				
        <table className="m-6">
          <thead>

            <tr>{Object.keys(vodsInUse[0]).map((key) => { if (!(key == "cid" || (key.includes("archive")) || (key.includes("youtube")) || (key.includes("notes")) ))  return <th key={key} className="border">{key}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {vodsInUse.map((singleVod) => (
             makeRow(singleVod) 
           ))}
          </tbody>

        </table>
	    </div>
      <p className="bg-red-400 h-screen">hello world </p>
    </div>
  );
}
