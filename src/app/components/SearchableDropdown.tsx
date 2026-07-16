import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { useState, Dispatch, SetStateAction } from 'react';
import clsx from 'clsx'
import { FiChevronDown } from "react-icons/fi";
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";


export default function SearchableDropdown({fromList, selected, setSelected} : {fromList: string[], selected: string[], setSelected:Dispatch<SetStateAction<string[]>>}) {
  const [query, setQuery] = useState('')
  const list = Array.from(fromList);


  const filteredList =
    query === ''
      ? list
      : list.filter((item) => {
          return item.toLowerCase().includes(query.toLowerCase())
        })


  return (
    <div className="w-52 ">
      <Combobox multiple value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')} >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              'w-full h-8 border border-white/50 bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white font-monospace',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
            )}
            displayValue="laskdj"
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <FiChevronDown />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-(--input-width) h-84 rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:--spacing(1)] empty:invisible font-monospace',
            'transition duration-100 ease-in data-leave:data-closed:opacity-0'
          )}
        >
          {filteredList.map((item) => (
            <ComboboxOption
              key={item}
              value={item}
              className="group flex cursor-default items-center gap-2 rounded-lg px-3 py-1.5 select-none data-focus:bg-white/10 data-selected:bg-gray-500"
            >
            {({focus, selected}) => (
              <div className="text-sm/6 text-white flex">
                {selected ? <MdOutlineCheckBox className="self-center"/> : <MdOutlineCheckBoxOutlineBlank className="self-center"/>}
                <p className="px-2">{item}</p>
              </div>

            )}
            </ComboboxOption>
          ))}
            {/* ICON HERE */}
        </ComboboxOptions>
      </Combobox>
    </div>
  )
}

