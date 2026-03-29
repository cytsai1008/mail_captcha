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
    try {
        const { token } = await request.json();
        const secretKey = env.RECAPTCHA_SECRET_KEY;

        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
            { method: 'POST' }
        );
        const data = await response.json();

        if (data.success && data.score >= 0.5) {
            return Response.json({ success: true, email: env.MAIL_TO_EMAIL });
        } else {
            return Response.json({ success: false, message: 'reCAPTCHA verification failed.' });
        }
    } catch (error) {
        return Response.json(
            { success: false, message: 'Error verifying reCAPTCHA.' },
            { status: 500 }
        );
    }
}
