// About.js
import React from 'react';
import './About.css'; // Import the corresponding CSS file

const About = () => {
    return (
        <div className="about-us-container">
            <h2>About Us</h2>
            <p>
                Welcome to the Vehicle Management System (VMS), your comprehensive solution for efficiently managing vehicle fleets. Our system integrates with Google Maps and is accessible through both an Android application and a web-based solution.
            </p>
            <p>
                At VMS, we aim to provide students with hands-on experience in developing real-world applications. Our platform is designed to streamline the management of vehicle fleets, making it easier for organizations to monitor and maintain their vehicles.
            </p>
            <p>
                Whether you are a maintenance personnel, a gas fueling person, a driver, or an administrator, VMS has features tailored to meet your specific needs. From creating job assignments to updating vehicle details, tracking fueling information, and managing routes, we've got you covered.
            </p>
            <p>
                Explore the various functionalities of VMS and experience the efficiency and convenience it brings to vehicle fleet management.
            </p>
        </div>
    );
};

export default About;