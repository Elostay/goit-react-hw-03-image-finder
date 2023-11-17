import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import DNA from './Loader/Loader';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const MAX_RESULTS = 500;

class App extends Component {
  state = {
    results: [],
    q: '',
    page: 1,
    status: 'idle',
    hasMore: true,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.q !== this.state.q) {
      this.setState({ results: [], loading: true });
      this.searchByData();
    }
    if (prevState.page !== this.state.page) {
      if (this.state.page * 12 >= MAX_RESULTS) {
        this.setState({ hasMore: false });
      }
    }
  }

  searchByData = async () => {
    const searchParams = new URLSearchParams({
      key: '39827869-ea8193496bafc954651761ff2',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      q: this.state.q,
      page: this.state.page,
    });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?${searchParams}`
      );

      this.setState(prevState => ({
        results: [...prevState.results, ...response.data.hits],
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ hasMore: false });
    } finally {
      this.setState({ loading: false });
    }
  };

  inputHandler = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.search.value.trim().toLowerCase();

    if (inputValue === '') {
      toast.info('🦄 Enter something', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    this.setState({ q: inputValue, page: 1 });
  };

  loadMore = async () => {
    this.setState({ loading: true });

    try {
      await new Promise(resolve => {
        this.setState(prevState => ({ page: prevState.page + 1 }), resolve);
      });

      await this.searchByData();
    } catch (error) {
      console.error('Error in loadMore:', error);
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    const { results, hasMore, loading } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.inputHandler} />
        {loading && <DNA />}
        <ImageGallery array={results} />
        {hasMore && results.length >= 12 && <Button onClick={this.loadMore} />}
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
