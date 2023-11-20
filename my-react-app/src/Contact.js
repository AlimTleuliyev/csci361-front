// ContactPage.js
import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div id="contact-container" className="container">
            <h1>Contact Us</h1>
            <p>Have questions or feedback? Reach out to us!</p>

            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>

                <label>
                    Email:
                    <input type="email" name="email" />
                </label>

                <label>
                    Message:
                    <textarea name="message" rows="4"></textarea>
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
