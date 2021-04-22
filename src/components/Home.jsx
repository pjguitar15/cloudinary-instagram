import React, { useState, useEffect, useContext } from 'react'
import { Data } from '../ContextProvider'
import { Button, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useContext(Data)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const loadingItems = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  useEffect(() => {
    setLoading(true)
    Axios.get('https://cloudinary-instagramm.herokuapp.com/api/get')
      .then(res => setData(res.data))
      .then(() => setLoading(false))
  }, [])
  return (
    <div className='py-5'>
      <h1>Instagram</h1>
      <Button
        onClick={() => history.push('/upload')}
        variant='outline-dark'
        size='sm'
      >
        Post something!
      </Button>
      {loading && (
        <Row>
          {loadingItems.map((item, index) => (
            <Col key={index} className='p-2' md='4'>
              <div className='border'>
                <div style={{ background: '#f2f2f2', height: '15rem' }}></div>
                <div className='p-3'>
                  <h5>Loading...</h5>
                  <p className='m-0 p-0'>Loading...</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <Row>
        {data
          .map((item, index) => (
            <Col key={index} className='p-2' md='4'>
              <div className='border'>
                <img
                  style={{ width: '100%' }}
                  src={item.imageUrl}
                  alt='imgurl'
                />
                <div className='p-3'>
                  <h5>{item.user}</h5>
                  <p className='m-0 p-0'>{item.caption}</p>
                </div>
              </div>
            </Col>
          ))
          .reverse()}
      </Row>
    </div>
  )
}

export default Home
