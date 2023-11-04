import React from 'react';
import * as console from "console";
import {Button} from "@mui/material";

type ButtonType = {
    className?: string
    children: React.ReactNode
    onClick: () => void
    variant: string
}

const Btn = ({children}: ButtonType) => {
    console.log('pereresovano btn')
    return (
        <Button  variant="contained">
            {children}
        </Button>


    );
};

export default Btn;