import React from 'react';

class TicketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingTicketId: null,
            editedTitle: '',
            editedDescription: '',
        };
    }

    handleEditClick(ticketId, title, description) {
        // Add your edit logic here
        this.setState({
            editingTicketId: ticketId,
            editedTitle: title,
            editedDescription: description,
        });
    }

    handleDeleteTicket(ticketId) {
        // Add your delete logic here
        this.props.deleteTicket(ticketId);
        console.log('Delete ticket with ID:', ticketId);
    }

    handleCancelEdit = () => {
        this.setState({
            editingTicketId: null,
            editedTitle: '',
            editedDescription: '',
        });
    };

    handleSaveEdit = () => {
        const { editingTicketId, editedTitle, editedDescription } = this.state;

        // Call a function to save the edited ticket data
        this.props.editTicket(editingTicketId, editedTitle, editedDescription);

        // Reset the edit state
        this.setState({
            editingTicketId: null,
            editedTitle: '',
            editedDescription: '',
        });
    };

    render() {
        const { tickets, deleteTicket } = this.props
        const { editingTicketId, editedTitle, editedDescription } = this.state;

        return (
            <div>
                <h2>Ticket List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket.id}>
                                <td>{index + 1}</td>
                                <td>{editingTicketId === ticket.id ? (
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={(e) => this.setState({ editedTitle: e.target.value })}
                                    />
                                ) : (
                                    ticket.title
                                )}</td>
                                <td>{editingTicketId === ticket.id ? (
                                    <textarea
                                        value={editedDescription}
                                        onChange={(e) => this.setState({ editedDescription: e.target.value })}
                                    />
                                ) : (
                                    ticket.description
                                )}</td>
                                <td>
                                    {editingTicketId === ticket.id ? (
                                        <>
                                            <button onClick={this.handleSaveEdit}>Save</button>
                                            <button onClick={this.handleCancelEdit}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <span
                                                className="edit"
                                                onClick={() => this.handleEditClick(ticket.id, ticket.title, ticket.description)}
                                            >
                                                ✎
                                            </span>
                                            <span className="delete" onClick={() => deleteTicket(ticket.id)}>
                                                ✖
                                            </span>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

};

export default TicketList;
