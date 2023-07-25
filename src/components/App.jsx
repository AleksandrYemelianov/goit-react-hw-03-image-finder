import React, { Component } from 'react'
import { getApi } from '../service/api';

import Searchbar from 'components/Searchbar/Searchbar'
import ImageGallery from 'components/ImageGallery/ImageGallery'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved'
}

export default class App extends Component {
  state = {
    findText: '',
    page: 1,
    images: [],
    status: STATUS.IDLE,
  }
  
  componentDidUpdate(_, prevState) { 
    const { findText, page, status} = this.state;

    if (prevState.findText !== findText || prevState.page !== page) {  
      
      this.setState({status: STATUS.PENDING})
 
      getApi(findText, page)
        .then(response => {
          if (!response.ok) {
            throw new Error()
          }
          return response.json();
        })
        .then(data => {
          this.setState(prevState => ({ images: [...prevState.images, ...data.hits], status: STATUS.RESOLVED }))
        })
        .catch(error => console.log(error))
    }
    console.log(status);
  } 

  handleFind = (value) => {
    this.setState({
      findText: value,
      images: [],
      page: 1,
      status: STATUS.IDLE,
    })
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1}))
  }

  render() {
    
    const { images, status } = this.state;
    const { handleFind, handleLoadMore } = this;
    return (
      <div>
        <Searchbar handleFind={handleFind} />
        {status === STATUS.PENDING && <Loader/>}
        {status === STATUS.RESOLVED && <ImageGallery images={images} />}
        {status === STATUS.RESOLVED && <Button handleLoadMore={handleLoadMore} />}
      </div>
    )
  }
}

