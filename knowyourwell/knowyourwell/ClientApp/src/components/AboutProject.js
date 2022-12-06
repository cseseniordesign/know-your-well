import React from 'react';
/*import Userfront from "@userfront/core";*/
import './css/style.css';

// Initialize Userfront Core JS
//Userfront.init("demo1234");


export default function AboutProject() {
   
    return (
        <form method='post' style={{ display: 'block', textAlign:'center', margin:'20px', fontSize: 16}}>
            <h2>About Project</h2>
            <div className="mb-3">
                <p>
                    “Know Your Well” is a Nebraska Environmental Trust-funded project training high school students how to sample and test well water quality.
                    This project began in 2017 and expects to connect with 50 schools across Nebraska by 2025. 
                    Students will compare their results with tests conducted at the University of Nebraska Water Sciences Laboratory. 
                    Over 300 private wells will eventually be tested for nitrate, nitrite, metals, pesticides, and more. 
                    Well owners are supplied with test results and provided with information to help them evaluate their water quality.  
                </p>
                <p>    
                    To learn more about how “Know Your Well” is helping well owners and future water scientists in Nebraska, visit <a href="https://knowyourwell.unl.edu/">knowyourwell.unl.edu</a>
                </p>
            </div>
            <h3>Related Organizations</h3>
            <div className="mb-3">
                <img src={require('./images/UNK.png')} alt= "" style={{ objectFit: 'contain', width:250, height: 100 }}/>
            </div>
            <div className="mb-3">
                <a href="https://www.unk.edu">The University of Nebraska at Kearney</a>
            </div>
            <div className="mb-3">
                <img src={require('./images/WaterForFood.png')} alt= "" style={{ objectFit: 'contain', width:250, height: 100}}/>
            </div>
            <div className="mb-3">
                <a href="https://waterforfood.nebraska.edu/">Daugherty Water for Food Global Institute</a>
            </div>
            <div className="mb-3">
                <img src={require('./images/NET.png')} alt= "" style={{ objectFit: 'contain', width:250, height: 100}}/>
            </div>
            <div className="mb-3">
                <a href="https://environmentaltrust.nebraska.gov/">The Nebraska Environmental Trust</a>
            </div>
            <div className="mb-3">
                <img src={require('./images/NDEE.png')} alt= "" style={{ objectFit: 'contain', width:250, height: 100}}/>
            </div>
            <div className="mb-3">
                <a href="http://www.deq.state.ne.us/">Nebraska Department of Environment and Energy</a>
            </div>
            <div className="mb-3">
                <img src={require('./images/PMRNRD.png')} alt= "" style={{ objectFit: 'contain', width:250, height: 100}}/>
            </div>
            <div className="mb-3">
                <a href="https://www.papionrd.org//">Papio-Missouri River Natural Resource District</a>
            </div>
        </form>
    )
}