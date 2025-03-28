import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { copyPaste, deletePaste } from '../features/paste/pasteSlice'
import toast from 'react-hot-toast'
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { FaShareFromSquare } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { Tooltip } from 'react-tooltip'

function Paste() {
    const allPastes = useSelector((state) => state.paste.pastes)
    const [searchPaste, setSearchPaste] = useState('')

    const filteredPastes = allPastes.filter((paste) => (paste.title.toLowerCase().includes(searchPaste.toLowerCase())))
    const dispatch = useDispatch()

    function handleDeletePaste(id) {
        dispatch(deletePaste(id))
    }

    function handleShare(id) {
        const pasteLink = `${window.location.origin}/view?pasteId=${id}`;
        navigator.clipboard.writeText(pasteLink)
            .then(() => {
                toast.success('Share Link generated to Clipboard')
            })
            .catch(() => {
                alert("Failed to copy link.");
            });
    }

    return (
        <div className='content-container w-full max-w-5xl mx-auto pt-6 px-5'>
            <div className='input-bar flex gap-4 items-center justify-around w-full max-w-[910px] mx-auto'>
                <input
                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-50 dark:border-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500
                    outline-none shadow-md"
                    placeholder='Search your Paste'
                    value={searchPaste}
                    onChange={(e) => setSearchPaste(e.target.value)}

                />
            </div>

            <div className='content-text-area w-full max-w-[910px]  mx-auto mt-6  border-2 px-2 rounded border-slate-100'>
                <div className='text-white text-5xl md:text-4xl sm:text-2xl w-full px-7 mt-2 py-6 border bg-slate-600 rounded overflow-hidden font-medium'>
                    All Pastes
                </div>
                {
                    filteredPastes.length > 0 ?
                        filteredPastes.map((paste) => (
                            <div>
                                <div key={paste.id} className='pasteBox my-2 bg-slate-200 py-4 px-6 rounded'>
                                    <div className='upper-box flex justify-between mb-1 flex-col sm:flex-row gap-2'>
                                        <div className='text-4xl flex-1 pe-5'>
                                            {paste.title}
                                        </div>
                                        <div className='buttons flex flex-wrap items-start gap-1.5 overflow-hidden '>
                                            <button className='icons' data-tooltip-id='tooltip' data-tooltip-content={`Edit`}>
                                                <Link to={`/?pasteId=${paste.id}`}><CiEdit /></Link>
                                            </button>

                                            <button data-tooltip-id='tooltip' data-tooltip-content={`Delete`} className='icons' onClick={() => handleDeletePaste(paste.id)}>
                                                <RiDeleteBin5Line />
                                            </button>

                                            <button data-tooltip-id='tooltip' data-tooltip-content={`Copy`} className='icons' onClick={() => dispatch(copyPaste(paste.id))}>
                                                <MdContentCopy />
                                            </button>

                                            <button data-tooltip-id='tooltip' data-tooltip-content={`View`} className='icons'>
                                                <Link to={`/pasteID/${paste.id}`}><GrView /></Link>
                                            </button>

                                            <button data-tooltip-id='tooltip' data-tooltip-content={`Share`} className='icons' onClick={() => handleShare(paste.id)}>
                                                <FaShareFromSquare />
                                            </button>

                                        </div>
                                    </div>
                                    <div className='flex justify-start sm:justify-end my-1 overflow-hidden'>
                                        <div className='flex gap-1 justify-center items-center overflow-hidden'><MdDateRange className='text-xl text-slate-800' />{paste.date}</div>
                                    </div>
                                    <hr className='border border-gray-400' />
                                    <div className='pt-2 overflow-hidden'>
                                        {paste.content}
                                    </div>
                                </div>
                                <hr className='border border-slate-100 my-1' />
                            </div>
                        )) :
                        <div className='pasteBox my-2 py-4 px-6 border-2 border-slate-100 rounded'>
                            <div className='text-4xl flex-1 pe-5 '>
                                No Paste Found
                            </div>
                        </div>
                }
            </div>
            <Tooltip key={filteredPastes.length} id='tooltip' className='custom-tooltip hidden sm:block'/>
        </div>
    )
}

export default Paste