document.addEventListener('DOMContentLoaded', function() {
    grecaptcha.ready(function() {
        grecaptcha.execute('6LeGis4rAAAAAH14N9IbwRsYNpPZxnvRPEg9PQCJ', {action: 'submit'}).then(function(token) {
            fetch('http://localhost:3000/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById('status-text').textContent = 'Success!';
                    setTimeout(() => {
                        window.location.href = `mailto:${data.email}`;
                    }, 1000);
                } else {
                    window.location.href = 'failed.html';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred during verification.');
            });
        });
    });
});
