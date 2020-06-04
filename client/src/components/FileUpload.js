import React, {Fragment, useState} from 'react'
import axios from 'axios'
import Message from './Message'
import Progress from './Progress'

const FileUpload = () => {

    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('Choose file')
    const [uploadedFile, setuploadedFile] = useState({})
    const [message, setMessage] = useState('')
    const [uploadPrecentage, setuploadPrecentage] = useState(0)

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
                },
                onUploadProgress: ProgressEvent => {
                    setuploadPrecentage(parseInt 
                        (Math.round((ProgressEvent.loaded * 100)) / ProgressEvent.total ))
                        
                        //clear precentage
                        setTimeout(() => {
                            setuploadPrecentage(0)
                        }, 5000);
                }
            })

            const {fileName, filePath} = res.data
            setuploadedFile ({filename,filePath})
            setMessage('File Uploaded')

        } catch (err) {
            console.log(err)
            if(err.response.status === 500){
                setMessage('There was a problem with the server')
            }else{
                setMessage(err.response.data.msg)
            }
        }
    }

    return (
        <Fragment>
            {message ? <Message msg={message} />:null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input onChange={onChange} type="file" className="custom-file-input" id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>

                <Progress precentage = {uploadPrecentage} />

                <input type="submit" value="upload" className="btn btn-primary btn-block mt-4"></input>
            </form>

            { uploadedFile ? <div className='row mt-5'>
                <div className='col-md-6 m-auto'>
                    <h3 className="text-center">{uploadedFile.filename}</h3>
                    <img style={{width: '100'}} src={uploadedFile.filePath} alt={uploadedFile.filename}></img>
                </div>
            </div>  : null }
        </Fragment>
    )
}

export default FileUpload