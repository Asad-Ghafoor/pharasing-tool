import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Box, Typography, TextareaAutosize } from '@mui/material'

const Prompt = () => {
    const [originalPrompt, setPrompt] = useState('')
    const [editPrompt, setEditPrompt] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const formData = new FormData();

    const getPrompt = async () => {
        try {
            const response = await axios.get("https://findoc.abark.tech/view_prompt")
            const currentPrompt = response?.data?.current_compliance_prompt;
            setPrompt(currentPrompt);
            setEditPrompt(currentPrompt);
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditPrompt = async () => {
        try {
            formData.append('prompt_value', editPrompt);
            const response = await axios.post("https://findoc.abark.tech/edit_prompt", formData)
            if (response.data) {
                setPrompt(editPrompt)
                setIsEditing(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPrompt()
    }, [])

    return (
        <Box sx={{ p: 3 }}>
            {isEditing ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextareaAutosize
                        variant="outlined"
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                        style={{ width: "100vw", height: "50vh", border: "2px solid gray" }}
                    />
                </Box>
            ) : (
                <Typography variant="h6">{originalPrompt}</Typography>
            )}
            {!isEditing ? (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setIsEditing(true)}
                    sx={{ mt: 2 }}
                >
                    Edit
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleEditPrompt}
                    sx={{ mt: 2 }}
                >
                    Save
                </Button>
            )}
        </Box>
    )
}

export default Prompt
