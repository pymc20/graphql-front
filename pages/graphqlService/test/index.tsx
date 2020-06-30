import React, { useEffect } from 'react'
import marked from 'marked'

function Editor() {

    useEffect(()=> {
        const iframe = document.getElementById('editor');
        const doc = iframe.contentDocument;
        doc.designMode = 'on';
        doc.getElementsByTagName('body')[0].innerHTML = marked('<>')
        doc.addEventListener('keyup', () => {
            const text = doc.getElementsByTagName('body')[0].innerHTML;
            console.log(text);
        })
    })

    return (
        <iframe id="editor"/>
    )
}

export default Editor