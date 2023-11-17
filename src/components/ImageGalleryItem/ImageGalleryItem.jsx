import { Component } from 'react';
import { ImageGalleryItemStyle, Image } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { smallImg, largeImg } = this.props;
    const { isModalOpen } = this.state;
    return (
      <ImageGalleryItemStyle>
        <Image src={smallImg} alt="" onClick={this.openModal} />
        {isModalOpen && <Modal largeImg={largeImg} onClose={this.closeModal} />}
      </ImageGalleryItemStyle>
    );
  }
}
export default ImageGalleryItem;
