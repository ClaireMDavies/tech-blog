const loginClickHandler = async () => {

    const email = $('#login-email-address').val().trim();
    const password = $('#login-password').val().trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
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

    const first_name = $('#signup-first-name').val().trim();
    const last_name = $('#signup-last-name').val().trim();
    const email = $('#signup-email-address').val().trim();
    const password = $('#signup-password').val().trim();

    if (first_name && last_name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password }),
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