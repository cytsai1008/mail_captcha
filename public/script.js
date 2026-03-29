document.addEventListener('DOMContentLoaded', function() {
    const recaptchaScript = document.querySelector('script[src*="recaptcha/api.js"]');
    const siteKey = new URL(recaptchaScript.src).searchParams.get('render');

    grecaptcha.ready(function() {
        grecaptcha.execute(siteKey, {action: 'submit'}).then(function(token) {
            fetch('/verify', {
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
                    const mailtoHref = `mailto:${data.email}`;
                    const link = document.createElement('a');
                    link.href = mailtoHref;
                    link.textContent = mailtoHref;
                    document.getElementById('fallback_link').replaceChildren(link);
                    setTimeout(() => {
                        window.location.href = mailtoHref;
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
