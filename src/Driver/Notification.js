import React, {
    useState,
    useEffect
} from 'react'
import { Modal, Box } from '@mui/material'
import { Button } from '../Components/StaticComponents'

//props.onDismiss - a function that executes when the notification is dismissed
//props.timeSeconds - how long the notification lasts before automatically dismissing
//props.open - whether or not the modal is open
//props.text - the text to appear in the notification
//props.title - the title to appear in the notification
export default function Notification(props){

    const [open, setOpen] = useState(props.open)

    const close = () => {
        setOpen(false)
        props.onDismiss()
    }

    useEffect(() => {
        setOpen(props.open)
        if(props.open && props.timeSeconds){
            setTimeout(()=>{
                if(open){
                    close()
                }
            }, props.timeSeconds * 1000)
        }
    }, [props.open])

    return(
        <Modal
            open={open}
            onClose={close}
            sx={{display: 'flex', alignItems: 'center'}}
        >
            <div
                style={{display: 'flex', flexDirection: 'column', margin: '0 auto', border: '3px solid black', padding: '10px', backgroundColor: 'white', justifyContent: 'center'}}
            >
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <Button
                onClick={close}
            >
                Close
            </Button>
            </div>
        </Modal>
    )
}