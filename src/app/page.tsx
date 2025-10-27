"use client"
import { useState, useEffect } from 'react';
import vods from "./media/dsmpVodsMasterSheet";

var vodsInUse = vods;


var paginationDisplay = []
function Pagination(vodsPerPage: number, totalVods: number, currentPage: number) {
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

const totalVods = vodsInUse.length;

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


    {/* default number vods per page */}
    const [ vodsPerPage, setVodsPerPage ] = useState(50);
    {/* pages starts counting from 1*/}
    const [ currentPage, setCurrentPage ] = useState(1);

    const initRowExpandStates : boolean[] = [];
    for (var i = 0; i < vodsPerPage; i++) {
        initRowExpandStates.push(false);
    }
    const [ rowExpand, setRowExpand ] = useState(initRowExpandStates);

    function changeRowStates(index: number) {
        var curRowExpandStates = rowExpand.slice(0);
        curRowExpandStates[index] = !rowExpand[index];

        setRowExpand(curRowExpandStates);

    }


    function MakeRow( singleVod, index: number ) {


        return [
            <tr key={singleVod.id}  onClick={() => {changeRowStates(index)}}>
                <td >{singleVod.id}</td>
                <td >{singleVod.date}</td>
                <td >{singleVod.creator}</td>
                <td >{singleVod.title}</td>
                <td >{singleVod.isAlt.toString()}</td>
            </tr>,
            rowExpand[index] && (
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
    function getTotalPages( vodsPerPage: number ) {
        totalPages = Math.round((totalVods / vodsPerPage)+1);
    }


    function getCurrentVods( vodsPerPage: number, currentPage: number, vodsInUse ) {
        const displayedVods = [];
        for (var i=0;i<vodsPerPage;i++) {
            if (((vodsPerPage * (currentPage-1)) + i) <= vodsInUse.length-1) {
                displayedVods.push(vodsInUse[(vodsPerPage * (currentPage-1)) + i]);
            }
        }
        return (
            displayedVods
        )
    }
    const paginationKey = Pagination(vodsPerPage, totalVods, currentPage);

    return (
        <div className="">
        {/* pagination */}
        <div className="flex">
            {/* front few numbers */}
            {paginationKey[0].map((pageNumber) => 
                (<button key={pageNumber} className="border m-2 px-2 font-monospace" 
                    onClick={() => {setCurrentPage(pageNumber); 
                    setRowExpand(initRowExpandStates)}}>{pageNumber}</button>) )}

            {/* ... */}

            {paginationKey[1].length >= 1 && 
                <div className="border m-2 px-2 font-monospace" >...</div>}
            {/* middle numbers */}
            {paginationKey[1].map((pageNumber) => 
                (<button key={pageNumber} className="border m-2 px-2 font-monospace" 
                    onClick={() => {setCurrentPage(pageNumber); 
                    setRowExpand(initRowExpandStates)}}>{pageNumber}</button>) )}

            {/* ... */}

            <div className="border m-2 px-2 font-monospace">...</div>
            {/* last few numbers */}
            {paginationKey[2].map((pageNumber) => 
                (<button key={pageNumber} className="border m-2 px-2 font-monospace" 
                    onClick={() => {setCurrentPage(pageNumber); 
                    setRowExpand(initRowExpandStates)}}>{pageNumber}</button>) )}

        </div> 

        <div className="bg-slate-900 h-full p-6 flex font-monospace">
    
            <table className="table-fixed flex-grow">
                <thead className="">
    
                <tr className="">
                    <th className="border ">id</th>
                    <th className="border ">date</th>
                    <th className="border ">creator</th>
                    <th className="border ">title</th>
                    <th className="border ">isAlt</th>

                </tr>
                </thead>
                <tbody >
                    {getCurrentVods(vodsPerPage, currentPage, vodsInUse).map((singleVod, index) => 
                        (MakeRow(singleVod, index)))}
    
                </tbody>
            </table>
    
        </div>
    
            {/* pagination */}
            <div className="flex">
                {/* front few numbers */}
                {paginationKey[0].map((pageNumber) => 
                    (<button key={pageNumber} className="border m-2 px-2 font-monospace" 
                     onClick={() => {setCurrentPage(pageNumber); 
                     setRowExpand(initRowExpandStates)}}>{pageNumber}</button>) )}

                {/* ... */}
    
                {paginationKey[1].length >= 1 && 
                    <div className="border m-2 px-2 font-monospace" >...</div>}
                {/* middle numbers */}
                {paginationKey[1].map((pageNumber) => 
                    (<button key={pageNumber} className="border m-2 px-2 font-monospace" 
                     onClick={() => {setCurrentPage(pageNumber); 
                     setRowExpand(initRowExpandStates)}}>{pageNumber}</button>) )}

                {/* ... */}
    
                <div className="border m-2 px-2 font-monospace">...</div>
                {/* last few numbers */}
                {paginationKey[2].map((pageNumber) => 
                    (<button key={pageNumber} className="border m-2 px-2 font-monospace" 
                     onClick={() => {setCurrentPage(pageNumber); 
                     setRowExpand(initRowExpandStates)}}>{pageNumber}</button>) )}

            </div> 

    
        </div>
    );
}
