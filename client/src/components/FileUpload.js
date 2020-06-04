import React, {Fragment, useState} from 'react'

const FileUpload = () => {

    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose file')

    const onChange = (e) =>{
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    return (
        <Fragment>
            <form>
                <div className="custom-file mb-4">
                    <input onChange={onChange} type="file" className="custom-file-input" id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
                <input type="submit" value="upload" className="btn btn-primary btn-block mt-4"></input>
            </form>
        </Fragment>
    )
}

export default FileUpload