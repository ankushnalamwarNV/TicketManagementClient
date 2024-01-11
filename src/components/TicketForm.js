import React from 'react';

class TicketForm extends React.Component {
    constructor() {
        super()
        this.state = {
            title: '',
            description: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description } = this.state
        if (this.state.title.trim() === '') return;
        this.props.addTicket({ title, description });
        this.setState({
            title: '',
            description: ''
        })
    };

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h2>Create Ticket</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='m-20px '>
                        <label>
                            Title:
                            <input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                        </label>
                    </div>
                    <div className='m-20px '>
                        <label>Description: </label>
                        <textarea value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}></textarea>
                    </div>

                    <button type="submit">Add Ticket</button>
                </form>
            </div>
        );
    }

};

export default TicketForm;
