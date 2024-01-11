import React from 'react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import { createTicket, getAllTickets, deleteTicket, updateTicket } from './api';
import { AuthenticatedTemplate, MsalContext, UnauthenticatedTemplate, withMsal } from '@azure/msal-react';
import { loginRequest } from './auth/authConfig';

class App extends React.Component {
  static contextType = MsalContext;
  constructor() {
    super()
    this.state = {
      tickets: []
    }
  }

  componentDidMount() {
    getAllTickets().then((response) => {
      if (response) {
        this.setState({
          tickets: response
        })
      }
    }).catch((err) => {
      console.error('Fetch Error:', err);
    })
  }

  addTicket = (newTicket) => {
    createTicket(newTicket).then((res) => {
      if (res) {
        this.setState((preState) => ({
          tickets: [...preState.tickets, { ...res }]
        }))
      }
    }).catch((err) => {
      console.error('post Error:', err);
    })
  };

  deleteTicket = (ticketId) => {
    deleteTicket(ticketId).then((res) => {
      const tickets = this.state.tickets.filter((tkt) => tkt.id !== ticketId)
      this.setState({ tickets })
    }).catch((err) => {
      console.error('post Error:', err);
    })
  }

  editTicket = (ticketId, editedTitle, editedDescription) => {
    const formData = {
      title: editedTitle,
      description: editedDescription
    }

    updateTicket(ticketId, formData).then((res) => {
      this.setState((prevState) => ({
        tickets: prevState.tickets.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, title: editedTitle, description: editedDescription }
            : ticket
        ),
      }));
    }).catch((err) => {
      console.error('Update Error:', err);
    })
  }

  handleLogin = () => {

    this.props.msalContext.instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  }

  handleLogout = () => {
    this.props.msalContext.instance.logout();
    sessionStorage.clear();
  }

  render() {
    const { tickets } = this.state
    return (
      <div className='p-30px'>
        <div className='header-container'>
          <h1 className='w-20'>Ticket Management App</h1>
          <UnauthenticatedTemplate>
            <button onClick={this.handleLogin}>Sign In</button>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <button onClick={this.handleLogout}>Sign Out</button>
          </AuthenticatedTemplate>
        </div>
        <AuthenticatedTemplate>
          {tickets && tickets.length > 0 && <TicketList tickets={tickets} deleteTicket={this.deleteTicket} editTicket={this.editTicket} />}
          <TicketForm addTicket={this.addTicket} ticketToEdit={this.state.ticketToEdit} />
        </AuthenticatedTemplate>
      </div>
    );
  }

};

export default App = withMsal(App);
