import React, { useEffect, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { addPaste, editPaste } from '../features/paste/pasteSlice'
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom'

function Home() {
    const [pasteTitle, setPasteTitle] = useState('')
    const [pasteContent, setPasteContent] = useState('')
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const pasteId = searchParams.get('pasteId')
    const allPastes = useSelector((state) => (state.paste.pastes))
    const searchRef = useRef();

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((paste) => (paste.id === pasteId));
            setPasteTitle(paste.title);
            setPasteContent(paste.content);
        }
    }, [pasteId])

    const createPaste = () => {
        if (pasteTitle && pasteContent) {
            const paste = {
                id: pasteId || nanoid(),
                title: pasteTitle,
                content: pasteContent,
                date: new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' })
            }
            
            if (pasteId) dispatch(editPaste(paste));
            else dispatch(addPaste(paste));

            setPasteContent('')
            setPasteTitle('')
            setSearchParams({})
        }
        else {
            if (!pasteContent && !pasteTitle) return toast.error('Add Title and Content')
            else if (!pasteContent) return toast.error('Add Content')
            else return toast.error('Add Title')
        }
    }
    return (
        <div className='content-container w-full max-w-5xl mx-auto pt-6 px-5'>
            <div className='input-bar flex gap-4 items-center justify-around w-full max-w-[910px] mx-auto'>
                <input
                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-blue-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500
                    outline-none  shadow-md "
                    placeholder='Add your Title'
                    value={pasteTitle}
                    onChange={(e) => setPasteTitle(e.target.value)}
                    ref={searchRef}
                />
                <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white  whitespace-nowrap
                "
                    onClick={createPaste}
                >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-lg group-hover:bg-transparent group-hover:dark:bg-transparent">
                        {`${pasteId ? 'Update Paste' : 'Add Paste'}`}
                    </span>
                </button>
            </div>

            <div className='content-text-area w-full max-w-[910px] mx-auto mt-6'>
                <textarea name="content-area" id=""
                    rows={24}
                    className='w-full rounded-lg bg-slate-100 outline-none p-5 shadow-xl'
                    placeholder='Add your Content . . .'
                    value={pasteContent}
                    onChange={(e) => setPasteContent(e.target.value)}
                >
                </textarea>
            </div>
        </div>
    )
}

export default Home
