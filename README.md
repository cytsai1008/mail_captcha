# reCAPTCHA v3 Mailto Verification (Fullstack)

This project demonstrates how to use reCAPTCHA v3 to protect a `mailto:` link from bots, using a secure backend to handle verification.

## Project Structure

- `/frontend`: Contains the HTML, CSS, and JavaScript for the user-facing website.
- `/backend`: Contains the Node.js server that handles reCAPTCHA verification.

## Setup

### 1. reCAPTCHA v3 Keys

- Go to the [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin/).
- Register a new site.
- Choose **reCAPTCHA v3**.
- Add your domain (or `localhost` for testing).
- Copy the **site key** and the **secret key**.

### 2. Frontend Configuration

- Open `frontend/index.html` and replace `YOUR_SITE_KEY` with your reCAPTCHA v3 **site key**.
- Open `frontend/script.js` and replace `YOUR_SITE_KEY` with your reCAPTCHA v3 **site key**.

### 3. Backend Configuration

- In the `backend` directory, create a file named `.env`.
- Add the following to the `.env` file:

```
RECAPTCHA_SECRET_KEY=YOUR_SECRET_KEY
MAIL_TO_EMAIL=your-email@example.com
```

- Replace `YOUR_SECRET_KEY` with your reCAPTCHA v3 **secret key**.
- Replace `your-email@example.com` with your desired email address.

## Running the Project

1.  **Start the Backend:**
    - Open a terminal in the `backend` directory.
    - Run `npm install` to install the dependencies.
    - Run `node server.js` to start the server.

2.  **Start the Frontend:**
    - Open `frontend/index.html` in your web browser.

3.  **Verify:**
    - Click the "Verify and Get Email" button.
    - If the reCAPTCHA verification is successful, your default email client will open with a new message addressed to the email you configured in the backend.

## How it Works

1.  The user clicks the button on the frontend.
2.  reCAPTCHA v3 generates a token.
3.  The frontend sends the token to the `/verify` endpoint on the backend.
4.  The backend sends the token and your **secret key** to the Google reCAPTCHA API for verification.
5.  If the verification is successful, the backend sends the email address to the frontend.
6.  The frontend receives the email address and redirects the user to the `mailto:` link.