"use client"
import { useState } from 'react';
import vods from "./media/dsmpVodsMasterSheet";
import ReactPaginate from 'react-paginate';

var vodsInUse = vods;

function MakeRow( singleVod ) {
    const [ rowExpand, setRowExpand ] = useState(false);
    return [
      <div key={singleVod.id} className="table-row" onClick={() => setRowExpand(!rowExpand)}>
        <div className="table-cell">{singleVod.id}</div>
        <div className="table-cell">{singleVod.date}</div>
        <div className="table-cell">{singleVod.creator}</div>
        <div className="table-cell">{singleVod.title}</div>
        <div className="table-cell">{singleVod.isAlt.toString()}</div>
      </div>,
      rowExpand && (
      <div className="table-row" key={singleVod.id + 10000}>
        <div className="table-cell colspan-5" colSpan={5} >
          <p className="">IA: {singleVod.archiveLink}</p>
          <p>IA archiver: {singleVod.archiver}</p>
        </div>
      </div>
      
      )
    ]
  }
  

function Items({ currentVods }) {
  return (
    <>
      {currentVods.map((singleVod) => (
        MakeRow(singleVod) 
      ))}
    </>
  );
}

function PaginatedItems({ vodsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + vodsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentVods = vodsInUse.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(vodsInUse.length / vodsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * vodsPerPage) % vodsInUse.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentVods={currentVods} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
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
  

  return (
    <div>
      
    
      <div className="bg-slate-900 h-200 font-monospace">
				
        <div className="table m-6">
          <div className="table-header-group">

            <div className="table-row">{Object.keys(vodsInUse[0]).map((key) => { if (!(key == "cid" || (key.includes("archive")) || (key.includes("youtube")) || (key.includes("notes")) ))  return <div key={key} className="table-cell border">{key}</div>
              })}
            </div>
          </div>
          <div className="table-row-group">
            <PaginatedItems vodsPerPage={40} />
          </div>
        </div>
	  </div>
    <p className="bg-red-400 h-screen">hello world </p>
    </div>
  );
}
