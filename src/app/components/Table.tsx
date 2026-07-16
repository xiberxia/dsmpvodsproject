import { Dispatch, SetStateAction, useState } from "react";
import { VodType } from "../page";

export default function Table( {vodsInUse, rowExpand, setRowExpand, currentPage, vodsPerPage } :
                               {vodsInUse: VodType[], rowExpand: boolean[],
                                   setRowExpand: Dispatch<SetStateAction<boolean[]>>,
                                   currentPage: number, vodsPerPage: number } ) {
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

  const [ sortBy, setSortBy ] = useState({id: false,
                                          date: "un",
                                          creator: "un",
                                          title: "un",
                                          isAlt: "un"});

  function setSort(target: string) {

    switch (target) {
      case "id":
        setSortBy({id: !sortBy.id, date: "un", creator: "un", title: "un", isAlt: "un"})
      break;
      case "date":
        if (sortBy.date == "un") {
        setSortBy({id: true, date: "asc", creator: "un", title: "un", isAlt: "un"})
      } else if (sortBy.date == "asc") {
        setSortBy({id: true, date: "desc", creator: "un", title: "un", isAlt: "un"})
      } else {
        setSortBy({id: true, date: "un", creator: "un", title: "un", isAlt: "un"})
      }
      break;

      case "creator":
        if (sortBy.creator == "un") {
        setSortBy({id: true, date: "un", creator: "asc", title: "un", isAlt: "un"})
      } else if (sortBy.creator == "asc") {
        setSortBy({id: true, date: "un", creator: "desc", title: "un", isAlt: "un"})
      } else {
        setSortBy({id: true, date: "un", creator: "un", title: "un", isAlt: "un"})
      }
      break;

      case "title":
        if (sortBy.title == "un") {
        setSortBy({id: true, date: "un", creator: "un", title: "asc", isAlt: "un"})
      } else if (sortBy.title == "asc") {
        setSortBy({id: true, date: "un", creator: "un", title: "desc", isAlt: "un"})
      } else {
        setSortBy({id: true, date: "un", creator: "un", title: "un", isAlt: "un"})
      }
      break;

      case "alt":
        if (sortBy.isAlt == "un") {
        setSortBy({id: true, date: "un", creator: "un", title: "un", isAlt: "asc"})
      } else if (sortBy.isAlt == "asc") {
        setSortBy({id: true, date: "un", creator: "un", title: "un", isAlt: "desc"})
      } else {
        setSortBy({id: true, date: "un", creator: "un", title: "un", isAlt: "un"})
      }
    }

    sortTable( vodsInUse, target );
  }


  {/* TODO: FIX ERRANEOUS BEHAVIOR WHEN MULTIPLE COLUMNS ARE SORTED */}
  function sortTable( vodsInUse: VodType[], target: string ) {
    console.log("sorting with: " + target);
    if (target != "id") {
      vodsInUse.sort((a, b) => a.id - b.id);
    } else
    if (sortBy.id) {
      vodsInUse.sort((a, b) => a.id - b.id);
    } else {
      vodsInUse.sort((a, b) => b.id - a.id);
    }

    switch (target) {
      case "date": {
        console.log(sortBy.date)
        // we are one cycle behind
        if (sortBy.date == "desc") {
          break;
        }
        if (sortBy.date == "asc") {
          vodsInUse.sort((a, b) => {
            return b.date.getTime() - a.date.getTime();
          })
        } else {
          vodsInUse.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
          })
        }
        break;
      }

      case "creator": {
        if (sortBy.creator == "desc") {
          break;
        }
        vodsInUse.sort((a, b) => {
          const tempA = a.creator.toUpperCase();
          const tempB = b.creator.toUpperCase();
          return sortBy.creator == "asc" ? (tempB.localeCompare(tempA)) : (tempA.localeCompare(tempB));

        })
        break;
      }

      case "title": {
        if (sortBy.title == "desc") {
          break;
        }
        vodsInUse.sort((a, b) => {
          const tempC = a.title.toUpperCase();
          const tempD = b.title.toUpperCase();
          return sortBy.title == "asc" ? (tempD.localeCompare(tempC)) : (tempC.localeCompare(tempD));

        })
        break;
      }

      case "alt": {
        if (sortBy.isAlt == "desc") {
          break;
        }
        vodsInUse.sort((a, b) => {
          if ((a.isAlt && b.isAlt) || !(a.isAlt && b.isAlt)) {
            return 0;
          } else if (a.isAlt && !(b.isAlt)) {
            return sortBy.isAlt == "un" ? 1 : -1;
          } else {
            return sortBy.isAlt == "asc" ? -1 : 1;
          }
        })
      }
    }
    // end switch
  }



  function changeRowStates(index: number) {
    const curRowExpandStates = rowExpand.slice(0);
    curRowExpandStates[index] = !rowExpand[index];

    setRowExpand(curRowExpandStates);

  }



  function MakeRow( singleVod: VodType, index: number ) {
    return [
      <div key={singleVod.id} className="grid grid-cols-20 col-span-20 ">
      <div onClick={() => {changeRowStates(index)}} 
      className="col-start-1">{singleVod.id}</div>
      <div onClick={() => {changeRowStates(index)}}
      className="col-start-2 col-span-2">{singleVod.date.toLocaleDateString()}</div>
      <div onClick={() => {changeRowStates(index)}}
      className="col-start-4 col-span-3">{singleVod.creator}</div>
      <div onClick={() => {changeRowStates(index)}}
      className="col-start-7 col-end-20 truncate text-ellipsis">{singleVod.title}</div>
      <div onClick={() => {changeRowStates(index)}}
      className="">{singleVod.isAlt.toString()}</div>
      </div>
      ,
      rowExpand[index] && singleVod.archiveLink && (

        /* MAKE FOR DIFFEERENT SCREEN SIZES */
        <div key={singleVod.archiveLink} className="col-span-20">
        <p className="">IA: {singleVod.archiveLink}</p>
        <p>IA archiver: {singleVod.archiver}</p>
        </div>

      )
    ]
  }


  function getCurrentVods( vodsPerPage: number, currentPage: number, vodsInUse: VodType[] ) {
    const displayedVods = [];
    for (let i=0;i<vodsPerPage;i++) {
      if (((vodsPerPage * (currentPage-1)) + i) <= vodsInUse.length-1) {
        displayedVods.push(vodsInUse[(vodsPerPage * (currentPage-1)) + i]);
      }
    }
    return (
      displayedVods
    )
  }


  return (

    <div className="">

      <div className="bg-slate-900 h-full p-6 grid grid-cols-20 font-monospace">
      {/* todo: make everything keyboard interactable*/}
      {/* todo: make screen size interactable + navbar slidable + ellipses text*/}
  
        <div className="border block " 
             onClick={() => setSort("id")}>id</div>
        <div className="border col-span-2"
             onClick={() => setSort("date")}>date {sortBy.date == "asc" ? "asc" :
                                                   sortBy.date == "desc" ? "desc" : "un"}
             {/*<span class="material-symbols-outlined">
            arrow_upward
          </span>*/}
        </div>
        <div className="border col-start-4 col-span-3"
          onClick={() => setSort("creator")}>creator {sortBy.creator == "asc" ? "asc" :
                                                      sortBy.creator == "desc" ? "desc" : "un"}
        </div >
        <div className="border col-start-7 col-end-20 "
          onClick={() => setSort("title")} >title {sortBy.title == "asc" ? "asc" :
                                                   sortBy.title == "desc" ? "desc" : "un"}
        </div>
        <div className="border block "
          onClick={() => setSort("alt")}>isAlt {sortBy.isAlt == "asc" ? "asc" :
                                                sortBy.isAlt == "desc" ? "desc" : "un"}</div>
        {getCurrentVods(vodsPerPage, currentPage, vodsInUse).map((singleVod, index) => 
        (MakeRow(singleVod, index)))}

      </div>
    </div>

  ); 

}

