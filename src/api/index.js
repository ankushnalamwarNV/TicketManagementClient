import axios from "axios";

const baseUrl = `https://localhost:7293/api/`;

export const getAllTickets = async () => {
    const { data } = await axios.get(baseUrl + "Tickets");
    return data;
};

export const createTicket = async (formData) => {
    const { data } = await axios.post(baseUrl + "Tickets", formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return data;
};

export const deleteTicket = async (ticketId) => {
    const { data } = await axios.delete(baseUrl + `Tickets/${ticketId}`);
    return data;
};

export const updateTicket = async (ticketId, formData) => {
    const { data } = await axios.put(baseUrl + `Tickets/${ticketId}`, formData, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return data;
}