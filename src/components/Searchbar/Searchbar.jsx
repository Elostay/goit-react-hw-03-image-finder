import { SearchBar, Button, Form, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <SearchBar>
      <Form onSubmit={onSubmit}>
        <Button type="submit">Search</Button>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
      </Form>
    </SearchBar>
  );
};

export default Searchbar;
