"use client"
import { useState, useMemo } from 'react';
import vods from "./media/dsmpVodsMasterSheet";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import creatorsData from './media/creatorData';


// pagination inside table function
// navbar function -> checkboxes link to global layout function

export type VodType = {
  id: number;    date: Date;    cid: number;    creator: string;    title: string;
  archiver: string;    archiveLink: string;    youtubeRestorer: string;
  youtubeLink: string;    notesOne: string;    notesOneLink: string;
  notesTwo: string;    notesTwoLink: string;    isAlt: boolean;
}


export function getInitRowExpandStates(vodsPerPage: number) {
  const initRowExpandStates : boolean[] = [];
  for (let i = 0; i < vodsPerPage; i++) {
    initRowExpandStates.push(false);
  }
  return initRowExpandStates;
}

export default function Page() {

  {/* default number vods per page */}
  const [ vodsPerPage, setVodsPerPage ] = useState(50);

  {/* pages starts counting from 1*/}
  const [ currentPage, setCurrentPage ] = useState(1);

  {/* each row can expand for more information */}
  const initRowExpandStates = getInitRowExpandStates(vodsPerPage);
  const [ rowExpand, setRowExpand ] = useState(initRowExpandStates);

  const creatorsList = creatorsData;
  const [creators, setCreators] = useState(creatorsList)

  const activeCreators = useMemo(() => new Set(creators), [creators]);
  const vodsInUse = useMemo(() => 
                            vods.filter(item => 
                               activeCreators.has(item.creator)), [activeCreators]);

  console.log("any dreams? " + activeCreators.has(vods[0].creator));

  const totalVods = vodsInUse.length;

  console.log(vodsPerPage + " main");
  console.log(vodsInUse.length);

  return (
    <div className="flex ">
      <div className="flex-1">
        <Pagination setRowExpand={setRowExpand} vodsPerPage={vodsPerPage} setVodsPerPage={setVodsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalVods={totalVods} />
        <Table vodsInUse={vodsInUse} rowExpand={rowExpand} setRowExpand={setRowExpand} currentPage={currentPage} vodsPerPage={vodsPerPage} />
        <Pagination setRowExpand={setRowExpand} vodsPerPage={vodsPerPage} setVodsPerPage={setVodsPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalVods={totalVods} />
      </div>
      <aside className="flex-col w-76 sticky top-0 shrink-0 h-fit">
        <Navbar selected={creators} setSelected={setCreators} creatorsList={creatorsList} />
      </aside>
    </div>

  )

}
