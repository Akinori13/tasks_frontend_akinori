import React from 'react'

const TextStatus = props => {
    let text;
    if (props.status === 0) {
        text = "To do";
    } else if (props.status === 1) {
        text = "In progress";
    } else {
        text = "Done";
    }

    return (
        <>
        {text}
        </>
    )
    
}

export default TextStatus;