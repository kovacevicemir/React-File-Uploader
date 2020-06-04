import React, {Fragment, useState} from 'react'
import axios from 'axios'

const FileUpload = () => {

    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose file')
    const [uploadedFile, setuploadedFile] = useState({})

    const onChange = (e) =>{
        setFile(e.target.files[0])
        setFilename(e.target.files[0].name)
    }

    const onSubmit = async e =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await axios.post('/upload', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })

            const {fileName, filePath} = res.data
            setuploadedFile ({filename,filePath})

        } catch (err) {
            console.log(err)
            if(err.response.status === 500){
                console.log('There was a problem with the server')
            }else{
                console.log(err.response.data.msg)
            }
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
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