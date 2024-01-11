
import React, { useState } from 'react'
import Button from '@mui/joy/Button'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import Stack from '@mui/joy/Stack'
import Add from '@mui/icons-material/Add'
import { Note } from '../../services/icons.service'

export function PlaylistHero({ handleChange, stationToEdit, onSaveStation }) {
    const [open, setOpen] = useState(false)

    const { type, name, amount, createdBy, duration, imgUrl } = stationToEdit


    return (
        <header>
            <form className="flex">

                <label htmlFor="file-input">
                    <input type="file" id="file-input" name="image" onChange={handleChange} accept="image/*" hidden />
                    <Note></Note>
                </label>
                <div className="hero-right-section flex">
                    <div className="station-hero">
                        <p>{type}</p>
                        <React.Fragment>
                            <Button
                                variant="outlined"
                                color="neutral"
                                startDecorator={<Add />}
                                onClick={() => setOpen(true)}
                            >
                                {name}
                            </Button>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                <ModalDialog>
                                    <DialogTitle>{name}</DialogTitle>
                                    <DialogContent>Edit details</DialogContent>
                                    <form
                                        onSubmit={(event) => {
                                            event.preventDefault()
                                            onSaveStation()
                                            setOpen(false)
                                        }}
                                    >
                                        <Stack spacing={2}>
                                            <FormControl>
                                                <FormLabel>Name</FormLabel>
                                                <Input autoFocus required value={name} onChange={(event) => handleChange(event)} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Description</FormLabel>
                                                <Input />
                                            </FormControl>
                                            <Button type="submit">Save</Button>
                                        </Stack>
                                    </form>
                                </ModalDialog>
                            </Modal>
                        </React.Fragment>
                    </div>
                    <div>
                        <p>{createdBy.username || 'Spotify'}</p>
                        <p>{amount || ''}</p>
                        <p>duration: {duration || ''}</p>
                    </div>
                </div>
            </form>
        </header>
    )
}