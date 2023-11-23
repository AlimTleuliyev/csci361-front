// About.js
import React from 'react';
import './About.css'; 
import backgroundImage from './photo/photo.jpg'; 

const About = () => {
    return (
        
        <div>
        <div className="about-us-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="about-us-content">
                <h1>About VMS</h1>
                <h3>Efficient, comprehensive vehicle fleet oversight. Streamlined for success.</h3>
            </div>
        </div>

           

            <h2 className="text-center">Our Team</h2>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Alim</h2>
                            <p className="title">Backend Developer</p>
                            <p>3rd year CS student</p>
                            <p>Alim.Tleuliyev@nu.edu.kz</p>
                            <p><button className="button" onClick={() => window.location = 'mailto:Alim.Tleuliyev@nu.edu.kz'}>Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Ruslan</h2>
                            <p className="title">Backend Developer</p>
                            <p>3rd year CS student</p>
                            <p>Ruslan@nu.edu.kz</p>
                            <p><button className="button" onClick={() => window.location = 'mailto:Ruslan.Kalimzhanov@nu.edu.kz'}>Contact</button></p>
                        </div>
                    </div>
                </div>
                
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Aidana</h2>
                            <p className="title">Backend Developer</p>
                            <p>3rd year CS student</p>
                            <p>Aidana@nu.edu.kz</p>
                            <p><button className="button" onClick={() => window.location = 'mailto:Aidana.Baglanova@nu.edu.kz'}>Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Umit</h2>
                            <p className="title">Backend Developer</p>
                            <p>3rd year CS student</p>
                            <p>Umtiti@nu.edu.kz</p>
                            <p><button className="button" onClick={() => window.location = 'mailto:Umit.azirakhmet@nu.edu.kz'}>Contact</button></p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Ralina</h2>
                            <p className="title">Frontend Developer</p>
                            <p>3rd year CS student</p>
                            <p>Ralina@nu.edu.kz</p>
                            <p><button className="button" onClick={() => window.location = 'mailto:Ralina.Tashenova@nu.edu.kz'}>Contact</button></p>
                        </div>
                    </div>
                </div>
                
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Sanzhar</h2>
                            <p className="title">Frontend Developer</p>
                            <p>3rd year CS student</p>
                            <p>Sanzhar@nu.edu.kz</p>
                            <p><button className="button" onClick={() => window.location = 'mailto:Sanzhar.Fazyl@nu.edu.kz'}>Contact</button></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <div className="container">
                            <h2>Arsen</h2>
                            <p className="title">Frontend Developer</p>
                            <p>3rd year CS student</p>
                            <p>Arsen@nu.edu.kz</p>
                            <p><button className="button" onClick={() => window.location = 'mailto:Arsen@nu.edu.kz'}>Contact</button></p>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default About;
