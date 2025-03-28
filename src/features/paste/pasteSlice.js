import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
    pastes: localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : [],
}

export const pasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addPaste: (state, action) => {
            const paste = action.payload
            state.pastes.push(paste)
            localStorage.setItem('pastes', JSON.stringify(state.pastes))
            toast.success('Paste added successfully')
        },
        deletePaste: (state, action) => {
            const pasteId = action.payload
            state.pastes = state.pastes.filter((paste) => (paste.id !== pasteId))
            localStorage.setItem('pastes', JSON.stringify(state.pastes))
            toast.success('Paste removed successfully')
        },
        editPaste: (state, action) => {
            const paste = action.payload;
            const index = state.pastes.findIndex((item) => (item.id === paste.id))
            if (index >= 0) {
                state.pastes[index] = paste
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success("Paste Updated Successfully")
            }
        },
        copyPaste: (state, action) => {
            const pasteId = action.payload;
            const paste = state.pastes.find((paste) => (paste.id === pasteId))
            window.navigator.clipboard.writeText(paste.content)
            toast("Copied")
        },
        viewPaste: (state, action) => {

        },
    },
})

// Action creators are generated for each case reducer function
export const { addPaste, deletePaste, editPaste, copyPaste } = pasteSlice.actions

export default pasteSlice.reducer