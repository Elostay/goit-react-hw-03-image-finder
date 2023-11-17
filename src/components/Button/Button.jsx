import { ButtonStyle } from './Button.styled';
const Button = ({ onClick }) => {
  return (
    <ButtonStyle type="button" onClick={onClick}>
      Load more
    </ButtonStyle>
  );
};
export default Button;
