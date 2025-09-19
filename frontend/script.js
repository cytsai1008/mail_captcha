const backendUrl = window.location.origin.includes('localhost') ? 'http://localhost:3000' : '/api';

document.addEventListener('DOMContentLoaded', function() {
    grecaptcha.ready(function() {
        grecaptcha.execute('6LeGis4rAAAAAH14N9IbwRsYNpPZxnvRPEg9PQCJ', {action: 'submit'}).then(function(token) {
            fetch(`${backendUrl}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('status-text').textContent = 'Success! If nothing happened, try link below.';
                    document.getElementById('fallback_link').innerHTML = `<a href="mailto:${data.email}">mailto:${data.email}</a>`;
                    setTimeout(() => {
                        window.location.href = `mailto:${data.email}`;
                    }, 1000);
                } else {
                    window.location.href = 'failed.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.href = 'failed.html';
            });
        });
    });
});
