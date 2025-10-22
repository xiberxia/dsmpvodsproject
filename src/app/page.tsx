"use client"
import { useState } from 'react';
import vods from "./media/dsmpVodsMasterSheet";

var vodsInUse = vods;


 
var paginationDisplay = []
function Pagination(vodsPerPage, totalVods, currentPage) {
  const startPageNumbers = [];
  const middlePageNumbers = [];
  const endPageNumbers = [];
  const totalPages = Math.round((totalVods / vodsPerPage)+1);

  if (currentPage <= 3) {
    startPageNumbers.push(1,2,3,4);

  } else {
    startPageNumbers.push(1);
  }
  
  if (currentPage > 3 && currentPage < (totalPages- 2)) {
    middlePageNumbers.push(currentPage-1, currentPage, currentPage+1);
  }

  if (currentPage > (totalPages - 3)) {
    endPageNumbers.push(totalPages-3, totalPages-2, totalPages-1, totalPages)
  } else {
    endPageNumbers.push(totalPages)
  }
  return(
    [startPageNumbers,middlePageNumbers,endPageNumbers]
  )
}


export default function Home() {
/**
  const [ viewBy, setViewBy ] = useState("all");
  const [ sortBy, setSortBy ] = useState("pure chronological");
  const [ includeCr, setIncludeCr ] = useState([]);
  const [ excludeCr, setExcludeCr ] = useState([]);

  function sortViewBy( viewBy:String ) {
    
  }
**/
  // totalVods=vodsInUse.length
  

  const totalVods = vodsInUse.length;
  const [ vodsPerPage, setVodsPerPage ] = useState(50);
  const [ currentPage, setCurrentPage ] = useState(61);
  const initRowExpandStates = [];
  for (var i = 0; i < vodsPerPage; i++) {
    initRowExpandStates.push(false);
  }
  const [ rowExpand, setRowExpand ] = useState(initRowExpandStates);
  
  function MakeRow( singleVod, index ) {
    

    return [
      <tr key={singleVod.id}  onClick={() => setRowExpand(rowExpand[index])}>
        <td >{singleVod.id}</td>
        <td >{singleVod.date}</td>
        <td >{singleVod.creator}</td>
        <td >{singleVod.title}</td>
        <td >{singleVod.isAlt.toString()}</td>
      </tr>,
      rowExpand && (
      <tr  key={singleVod.id + 10000}>
        <td  colSpan={5} >
          <p className="">IA: {singleVod.archiveLink}</p>
          <p>IA archiver: {singleVod.archiver}</p>
        </td>
      </tr>
      
      )
    ]
  }
 

  var totalPages = 61;
  function getTotalPages( vodsPerPage ) {
    totalPages = Math.round((totalVods / vodsPerPage)+1);
  }
  console.log(totalPages);
  

  function getCurrentVods( vodsPerPage, currentPage, vodsInUse ) {
    const displayedVods = [];
    for (var i=0;i<vodsPerPage;i++) {
      if (((vodsPerPage * (currentPage-1)) + i) <= vodsInUse.length-1) {
        displayedVods.push(vodsInUse[(vodsPerPage * (currentPage-1)) + i]);
      }
    }
    console.log(displayedVods);
    return (
      displayedVods
    )
  }
  const paginationKey = Pagination(vodsPerPage, totalVods, currentPage);
  
  return (
    <div>
    <div className="flex">
      {paginationKey[0].map((pageNumber) => (<button className="border m-2 px-2 font-monospace" onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>) )}
      {paginationKey[1].length >= 1 && <div className="border m-2 px-2 font-monospace" >...</div>}
      {paginationKey[1].map((pageNumber) => (<button className="border m-2 px-2 font-monospace" onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>))}
      <div className="border m-2 px-2 font-monospace">...</div>
      {paginationKey[2].map((pageNumber) => (<button className="border m-2 px-2 font-monospace" onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</button>))}
    </div>  
      <div className="bg-slate-900 h-200 font-monospace">
				
        <table className="m-6">
          <thead >

            <tr >{Object.keys(vodsInUse[0]).map((key) => { if (!(key == "cid" || (key.includes("archive")) || (key.includes("youtube")) || (key.includes("notes")) ))  return <th key={key} className="border">{key}</th>
              })}
            </tr>
          </thead>
          <tbody >
              {getCurrentVods(vodsPerPage, currentPage, vodsInUse).map((singleVod, index) => (MakeRow(singleVod, index)))}
 
          </tbody>
        </table>
	  </div>
    <p className="bg-red-400 h-screen">hello world </p>
    </div>
  );
}
