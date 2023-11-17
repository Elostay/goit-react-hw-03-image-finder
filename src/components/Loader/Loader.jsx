import { Dna } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const DNA = () => {
  return (
    <LoaderContainer>
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </LoaderContainer>
  );
};

export default DNA;
