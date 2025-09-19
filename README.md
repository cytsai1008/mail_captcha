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

### 2. Environment Variables

- Create a `.env` file in the root of the project by copying `.env.example`:
  ```bash
  cp .env.example .env
  ```
- Open the newly created `.env` file and fill in the following:
  - `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA v3 **secret key**.
  - `RECAPTCHA_SITE_KEY`: Your reCAPTCHA v3 **site key**.
  - `MAIL_TO_EMAIL`: The email address that the `mailto:` link should use (e.g., `your-email@example.com`).

## Running the Project

1.  **Build and Run with Docker Compose:**
    - Make sure you have Docker and Docker Compose installed.
    - Open a terminal in the root of the project.
    - Run the following command to build the images and start the services:
      ```bash
      docker-compose up --build
      ```
2.  **Access the Application:**
    - Open your web browser and navigate to `http://localhost`.
    - Nginx will serve the frontend, and all API requests will be proxied to the backend.

3.  **Verify:**
    - The frontend will attempt to verify you as human using reCAPTCHA v3.
    - If the reCAPTCHA verification is successful, your default email client will open with a new message addressed to the email you configured in the `.env` file.

## How it Works

1.  The user clicks the button on the frontend.
2.  reCAPTCHA v3 generates a token.
3.  The frontend sends the token to the `/verify` endpoint on the backend.
4.  The backend sends the token and your **secret key** to the Google reCAPTCHA API for verification.
5.  If the verification is successful, the backend sends the email address to the frontend.
6.  The frontend receives the email address and redirects the user to the `mailto:` link.