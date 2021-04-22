import React, { useState, useRef, useContext } from 'react'
import Axios from 'axios'
import { Button, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { Data } from '../Context'

const UploadForm = () => {
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState({})
  const [data, setData] = useContext(Data)
  const userRef = useRef()
  const captionRef = useRef()
  const history = useHistory()
  const onChangeHandler = e => {
    const acceptedDataType = ['image/jpeg', 'image/png']
    const chosenFile = e.target.files[0]
    if (acceptedDataType.includes(chosenFile.type)) {
      setSelectedImage(chosenFile)
    } else {
      console.log('Not Accepted!')
    }
  }

  const submitHandler = () => {
    setLoading(true)
    // submit to cloudinary
    const formData = new FormData()
    formData.append('file', selectedImage)
    formData.append('upload_preset', 'mqoqh1bj')
    Axios.post(
      'https://api.cloudinary.com/v1_1/da9vubstw/image/upload',
      formData
    )
      .then(res => {
        setData([
          ...data,
          {
            imageUrl: res.data.url,
            user: userRef.current.value,
            caption: captionRef.current.value
          }
        ])
        Axios.post('https://cloudinary-instagramm.herokuapp.com/api/post', {
          imageUrl: res.data.url,
          user: userRef.current.value,
          caption: captionRef.current.value
        })
      })
      .then(() => {
        setLoading(false)
        history.push('/')
      })
  }

  return (
    <div className='py-5 text-center'>
      <h1>Upload Form</h1>
      {loading && <Alert variant='warning col-6 mx-auto'>Uploading...</Alert>}

      <input onChange={onChangeHandler} type='file' />
      <div className='mt-3 p-1 col-lg-6 col-md-10 col-xs-12 mx-auto'>
        <input
          ref={userRef}
          placeholder='Enter name'
          type='text'
          className='form-control mb-2'
        />
        <input
          ref={captionRef}
          placeholder='Enter caption'
          type='text'
          className='form-control mb-2'
        />
      </div>
      <div className='col-6 mx-auto'>
        <div className='row'>
          <div className='px-1 col-6'>
            <Button
              disabled={loading}
              className='w-100 btn-sm'
              onClick={submitHandler}
            >
              Submit
            </Button>
          </div>
          <div className='px-1 col-6'>
            <Button
              disabled={loading}
              className='w-100 btn-sm'
              onClick={() => history.push('/')}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadForm
