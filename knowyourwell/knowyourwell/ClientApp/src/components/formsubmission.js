import React from 'react';
import { List } from 'semantic-ui-react'

export default function FormSubmission() {

    const backButton = () => {
        window.location.href = "/editwell";
    }

    return (
        <List style={{ textAlign: 'center' }}>
            <h2> <strong> Form Submission </strong></h2>
            <button type="submit" onClick={backButton} >Back</button>
        </List>
    );
}

