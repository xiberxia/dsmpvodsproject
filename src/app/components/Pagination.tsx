import { useState, Dispatch, SetStateAction } from 'react';
import { getInitRowExpandStates } from '../page';


function DropDown({setVodsPerPage} :
                  {setVodsPerPage: Dispatch<SetStateAction<number>>}) {

  const [tempValue, setTempValue] = useState("50");
  function handleSetValue(value: string) {
    let numValue = 5;
    if (value) {
      numValue = parseInt(value);

    } else {
      setTempValue(String(numValue));
    }
    setVodsPerPage(numValue);
  }

  return (
    <div className="flex ">
      <p className="flex font-monospace m-2 pl-2">entries per page: </p>
      <input value={tempValue} type="number" step="5"
             onChange={e => setTempValue( e.target.value )}
             onBlur={() => handleSetValue(tempValue)}
             className="flex font-monospace border m-2 px-2 focus:outline-2 focus:outline-offset-2 focus:outline-gray-700"
      />
    </div>

  )

}

function PaginationLogic( {vodsPerPage, totalVods, currentPage} :
                          {vodsPerPage: number, totalVods: number, currentPage: number }) {
  const startPageNumbers = [];
  const middlePageNumbers = [];
  const endPageNumbers = [];
  const totalPages = Math.round((totalVods / vodsPerPage)+1);
  console.log(vodsPerPage);

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

export default function Pagination({setRowExpand, vodsPerPage, setVodsPerPage, currentPage, setCurrentPage, totalVods } :
                                   {setRowExpand: Dispatch<SetStateAction<boolean[]>>, vodsPerPage: number, setVodsPerPage: Dispatch<SetStateAction<number>>,
                                    currentPage: number, setCurrentPage: Dispatch<SetStateAction<number>>, totalVods: number}) {


  const paginationKey = PaginationLogic({vodsPerPage, totalVods, currentPage});
  const initRowExpandStates = getInitRowExpandStates(vodsPerPage);

  return(
    <div className="flex ">
      {/* pagination */}
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

    <DropDown vodsPerPage={vodsPerPage} setVodsPerPage={setVodsPerPage}/>
    </div> 

  );
}

