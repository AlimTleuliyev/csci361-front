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
            <br/>
            <div className='contact-container'>
                <div className="left-container">
                    <div className="info-row">
                        <h2>Email</h2>
                        <p>contact@example.com</p> {/* Replace with your actual email */}
                    </div>
                    <div className="info-row">
                        <h2>Address</h2>
                        <p>Kabanbay Batyra 53, Astana, Kazakhstan</p> {/* Replace with your actual address */}
                    </div>
                </div>
                <div className="right-container">
                    <div className="info-row">
                        <h2>Find Us</h2>
                        <iframe
                            className="google-map"
                            src="https://maps.google.com/maps?q=Kabanbay%20Batyra%2053%2C%20Astana%2C%20Kazakhstan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Contact;