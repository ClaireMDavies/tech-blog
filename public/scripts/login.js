const loginClickHandler = async () => {

    const emailAddress = $('#login-email-address').val().trim();
    const password = $('#login-password').val().trim();

    if (emailAddress && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ emailAddress, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const signUpClickHandler = async () => {

    const firstName = $('#signup-first-name').val().trim();
    const lastName = $('#signup-last-name').val().trim();
    const emailAddress = $('#signup-email-address').val().trim();
    const password = $('#signup-password').val().trim();

    if (firstName && lastName && emailAddress && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, emailAddress, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

$("#login-button").click(loginClickHandler);
$("#signup-button").click(signUpClickHandler);