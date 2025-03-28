import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function ViewPaste() {
    const { pasteId } = useParams()
    const allPastes = useSelector((state) => state.paste.pastes)
    const paste = allPastes.find((paste) => paste.id === pasteId)
    



    return (
        <div className='content-container w-full max-w-[910px] mx-auto pt-6 px-5'>
            <div className='input-bar flex items-center justify-start w-full max-w-xl'>
                <input
                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                    outline-none h-16 shadow-md text-2xl ps-5"
                    value={paste.title}
                    readOnly
                />

            </div>

            <div className='content-text-area w-full max-w-[910px] mx-auto mt-6'>
                <textarea name="content-area" id=""
                    rows={20}
                    className='w-full rounded-lg bg-slate-100 outline-none p-5 shadow-xl'
                    value={paste.content}
                    readOnly
                >
                </textarea>
            </div>
        </div>
    )
}

export default ViewPaste
