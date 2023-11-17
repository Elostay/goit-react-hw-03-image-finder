import { SearchBar, Button, Form, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const handleSumbit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.search.value.trim().toLowerCase();

    return onSubmit(inputValue);
  };

  return (
    <SearchBar>
      <Form onSubmit={handleSumbit}>
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
