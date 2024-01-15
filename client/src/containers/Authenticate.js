// Authenticate.js
import { endpoints } from "../endpoints";

function authenticateUser(password) {

    return fetch(endpoints.authenticate, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password })
    }).then(response => response.json().then(body => ({  
        status: response.status,
        body: body
    })));
}

export { authenticateUser };
