"use client"
import { useState, useEffect } from 'react';
import vods from "./media/dsmpVodsMasterSheet";

var vodsInUse = vods;
type VodsType = {
    id: number;    date: string;    cid: number;    creator: string;    title: string;
    archiver: string;    archiveLink: string;    youtubeRestorer: string;
    youtubeLink: string;    notesOne: string;    notesOneLink: string;
    notesTwo: string;    notesTwoLink: string;    isAlt: boolean;
}[]

type SingleVodType = {
    id: number;    date: string;    cid: number;    creator: string;    title: string;
    archiver: string;    archiveLink: string;    youtubeRestorer: string;
    youtubeLink: string;    notesOne: string;    notesOneLink: string;
    notesTwo: string;    notesTwoLink: string;    isAlt: boolean;
}

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

var totalVods = vodsInUse.length;

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

    // FILTER TABLE

    // SORT TABLE
    // id, dat, crt, ttl, alt - sort table rows
    const [ sortBy, setSortBy ] = useState(["id", false]);

    function setSort(thingy: string) {
        var thingyBool = false;
        if (sortBy[0] === thingy) {
            thingyBool = !(sortBy[1]);

        }

        setSortBy([thingy, thingyBool]);
        console.log(sortBy);
        sortTable( vodsInUse );
    }

    {/* TODO: FIX ERRANEOUS BEHAVIOR WHEN MULTIPLE COLUMNS ARE SORTED */}
    function sortTable( vodsInUse: VodsType ) {
        switch (sortBy[0]) {
            case "id": {
                if (sortBy[1]) {
                    vodsInUse.sort((a, b) => a.id - b.id);
                } else {
                    vodsInUse.sort((a, b) => b.id - a.id);
                }
                break;
            }

            case "dat": {
                vodsInUse.sort((a, b) => {
                    var thingA = a.date.split("/");
                    var thingB = b.date.split("/");

                    if (a.date.localeCompare(b.date)) {
                        return 0;

                    } else if (parseInt(thingA[2]) < parseInt(thingB[2])) {
                        return sortBy[1] ? 1 : -1;

                    } else if (parseInt(thingA[1]) < parseInt(thingB[1])) {
                        return sortBy[1] ? 1 : -1;

                    } else if (parseInt(thingA[0]) < parseInt(thingB[0])) {
                        return sortBy[1] ? 1 : -1;

                    } else {
                       return sortBy[1] ? -1 : 1;

                    }
                })
                break;
            }

            case "crt": {
                vodsInUse.sort((a, b) => {
                    const tempA = a.creator.toUpperCase();
                    const tempB = b.creator.toUpperCase();
                    console.log(tempA);
                    return sortBy[1] ? (tempA.localeCompare(tempB)) : (tempB.localeCompare(tempA));

                })
            }

            case "ttl": {
                vodsInUse.sort((a, b) => {
                    const tempC = a.title.toUpperCase();
                    const tempD = b.title.toUpperCase();
                    return sortBy[1] ? (tempC.localeCompare(tempD)) : (tempD.localeCompare(tempC));

                })
            }

            case "alt": {
                vodsInUse.sort((a, b) => {
                    if ((a.isAlt && b.isAlt) || !(a.isAlt && b.isAlt)) {
                        return 0;

                    } else if (a.isAlt && !(b.isAlt)) {
                        return sortBy[1] ? 1 : -1;

                    } else {
                        return sortBy[1] ? -1 : 1;

                    }

                })
            }

        }

    }


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



    function MakeRow( singleVod: SingleVodType, index: number ) {
        
        return [
            <div key={singleVod.id} className="grid grid-cols-20 col-span-20 ">
                <div onClick={() => {changeRowStates(index)}} 
                    className="col-start-1">{singleVod.id}</div>
                <div onClick={() => {changeRowStates(index)}}
                    className="col-start-2 col-span-2">{singleVod.date}</div>
                <div onClick={() => {changeRowStates(index)}}
                    className="col-start-4 col-span-3">{singleVod.creator}</div>
                <div onClick={() => {changeRowStates(index)}}
                    className="col-start-7 col-end-20 truncate text-ellipsis">{singleVod.title}</div>
                <div onClick={() => {changeRowStates(index)}}
                    className="">{singleVod.isAlt.toString()}</div>
            </div>
            ,
            rowExpand[index] && (


                /* MAKE FOR DIFFEERENT SCREEN SIZES */
                <div className="col-span-20">
                    <p className="">IA: {singleVod.archiveLink}</p>
                    <p>IA archiver: {singleVod.archiver}</p>
                </div>

            )
        ]
    }


    var totalPages = 61;
    function getTotalPages( vodsPerPage: number ) {
        totalPages = Math.round((totalVods / vodsPerPage)+1);
    }


    function getCurrentVods( vodsPerPage: number, currentPage: number, vodsInUse: VodsType ) {
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

        <div className="bg-slate-900 h-full p-6 grid grid-cols-20 font-monospace">
        {/* todo: make everything keyboard interactable*/}
        {/* todo: make screen size interactable + navbar slidable + ellipses text*/}
    
    
                <div className="border block " 
                    onClick={() => {setSort("id")}}>id</div>
                <div className="border col-span-2"
                    onClick={() => {setSort("dat")}}>date</div>
                <div className="border col-start-4 col-span-3"
                    onClick={() => {setSort("crt")}}>creator</div >
                <div className="border col-start-7 col-end-20 "
                   onClick={() => {setSort("ttl")}} >title</div>
                <div className="border block"
                    onClick={() => {setSort("alt")}}>isAlt</div>
                {getCurrentVods(vodsPerPage, currentPage, vodsInUse).map((singleVod, index) => 
                    (MakeRow(singleVod, index)))}
 
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
