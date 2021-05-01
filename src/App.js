import Container from './components/Container/Container';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import Spinner from './components/Loader/Loader';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { contactsOperations, contactsSelectors } from './redux/contacts';

const App = ({ isLoading, isError, fetchContacts }) => {
  // eslint-disable-next-line
  useEffect(() => fetchContacts(), []);

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p>sorry, there is an error :(</p>
      ) : (
        <ContactList />
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  isLoading: contactsSelectors.getLoading(state),
  isError: contactsSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
