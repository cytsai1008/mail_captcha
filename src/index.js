export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        if (url.pathname === '/verify' && request.method === 'POST') {
            return handleVerify(request, env);
        }

        if (url.pathname === '/health' && request.method === 'GET') {
            return Response.json({ status: 'ok' });
        }

        return env.ASSETS.fetch(request);
    },
};

async function handleVerify(request, env) {
    if (!env.RECAPTCHA_SECRET_KEY || !env.MAIL_TO_EMAIL) {
        console.error('Missing required environment variables: RECAPTCHA_SECRET_KEY or MAIL_TO_EMAIL');
        return Response.json({ success: false, message: 'Server configuration error.' }, { status: 500 });
    }

    try {
        const { token } = await request.json();

        const body = new URLSearchParams({ secret: env.RECAPTCHA_SECRET_KEY, response: token });
        const ip = request.headers.get('CF-Connecting-IP');
        if (ip) body.append('remoteip', ip);

        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body,
        });
        const data = await response.json();

        const hostname = new URL(request.url).hostname;
        if (data.success && data.score >= 0.5 && data.action === 'submit' && data.hostname === hostname) {
            return Response.json({ success: true, email: env.MAIL_TO_EMAIL });
        } else {
            return Response.json({ success: false, message: 'reCAPTCHA verification failed.' });
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        return Response.json({ success: false, message: 'Error verifying reCAPTCHA.' }, { status: 500 });
    }
}
