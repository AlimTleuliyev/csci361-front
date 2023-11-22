// ContactPage.js
import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div>
            <h1>Contact Us</h1>
            <p>Have questions or feedback? Reach out to us!</p>

            <form>
                <div class="form-group">
                    <label for="name">Name:</label>
                        <input
                            type="text"
                            name="middlename"
                            value=''
                          
                        />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" />
                </div>

                <div className="form-group">
                    <label>Message:</label>
                    <input name="message" rows="4"></input>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
