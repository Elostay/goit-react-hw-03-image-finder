import { Component } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc = e => {
    e.code === 'Escape' && this.props.onClose();
  };
  handleClick = e => {
    e.target === e.currentTarget && this.props.onClose();
  };

  render() {
    const { largeImg } = this.props;
    return (
      <Overlay onClick={this.handleClick}>
        <ModalStyle>
          <img src={largeImg} alt="" />
        </ModalStyle>
      </Overlay>
    );
  }
}
export default Modal;
