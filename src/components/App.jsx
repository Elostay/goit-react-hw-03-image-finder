import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import DNA from './Loader/Loader';
import getImages from 'helpers/api';

class App extends Component {
  state = {
    results: [],
    q: '',
    page: 1,
    totalImages: 0,
    hasMore: true,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.setState({ loading: true });
      this.searchByData();
    }
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      if (this.state.page * 12 >= this.state.totalImages) {
        this.setState({ hasMore: false });
      }
      this.setState({ loading: true });
      this.searchByData();
    }
  }

  searchByData = async () => {
    try {
      const data = await getImages(this.state.q, this.state.page);

      this.setState(prevState => ({
        results: [...prevState.results, ...data.hits],
        totalImages: data.totalHits,
        hasMore: true,
      }));
    } catch (error) {
      this.setState({ hasMore: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  inputHandler = query => {
    if (query === '') {
      toast.info('🦄 Enter something');
      return;
    }
    this.setState({ q: query, page: 1, results: [], totalImages: 0 });
  };

  loadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { results, totalImages, loading, hasMore } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.inputHandler} />

        <ImageGallery array={results} />
        {loading ? (
          <DNA />
        ) : (
          totalImages !== results.length &&
          hasMore && <Button onClick={this.loadMore} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AppContainer>
    );
  }
}

export default App;
