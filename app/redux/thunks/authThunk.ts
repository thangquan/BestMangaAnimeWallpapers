import { createAsyncThunk } from '@reduxjs/toolkit'

const register = createAsyncThunk('user/register', async () => {
    return 123
})

export { register }
