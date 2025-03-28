import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function SharePaste() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const allPastes = useSelector((state) => state.paste.pastes)
    const paste = allPastes.find((paste) => paste.id === pasteId)
    const [content, setContent] = useState('')

    useEffect(() => {
        if (paste) {
            setContent(`Title: ${paste.title}\n\nContent: ${paste.content}`);
        }
    }, [paste]);

    function handleShareContent (){
        window.navigator.clipboard.writeText(content)
        toast.success("Copied")
    }

    return (
        <div className='content-container w-full max-w-[910px] mx-auto pt-6 px-5'>

            <div className='content-text-area w-full max-w-[910px] mx-auto mt-6 flex flex-col items-center gap-5' >
                <textarea name="content-area" id=""
                    rows={10}
                    className='w-full rounded-lg bg-slate-100 outline-none p-5 shadow-xl'
                    value={content}
                >
                </textarea>
                <button type="button" className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700  dark:border-gray-700 " onClick={handleShareContent}>Copy</button>
            </div>
        </div>
    )
}

export default SharePaste
