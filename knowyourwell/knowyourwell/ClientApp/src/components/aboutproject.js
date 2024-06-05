import React from 'react';
/*import Userfront from "@userfront/core";*/
import './css/style.css';

// Initialize Userfront Core JS
//Userfront.init("demo1234");


export default function AboutProject() {

    return (
        <form method='post' style={{ display: 'block', textAlign: 'center', margin: '20px', fontSize: 16 }}>
            <h2>About Project</h2>
            <div className="mb-3">
                <p>
                “Know Your Well” is a participatory science program training Nebraska high school teachers and students how to sample and 
                test domestic well water quality. This project began with four schools in 2017 and has grown to include over 30 schools 
                throughout Nebraska as of January 2024. Students collect data and test well water quality, evaluate land use related to 
                groundwater quality, and compare their results with tests conducted at the Nebraska Water Center’s Water Sciences Laboratory. 
                The program’s goal is to educate students and private well owners alike about what’s in their water, by providing education and 
                test results for nitrate, nitrite, metals, pesticides, and more.
                </p>
                <p>
                To learn more about how “Know Your Well” is helping well owners and future water scientists in Nebraska, 
                visit  <a href="https://knowyourwell.unl.edu/">knowyourwell.unl.edu</a>
                </p>
            </div>
            <h3>Related Organizations</h3>
            <a href="http://unl.edu">
                <div className="mb-3">
                    <img src={require('./images/unl.png')} alt="" style={{ objectFit: 'contain', width: 250, height: 100 }} />
                </div>
            </a>
            <a href="https://watercenter.unl.edu/">
                <div className="mb-3">
                    <img src={require('./images/NWC.jpg')} alt="" style={{ objectFit: 'contain', width: 250, height: 100 }} />
                </div>
            </a> 
            <a href="https://waterforfood.nebraska.edu/">
                <div className="mb-3">
                    <img src={require('./images/WaterForFood.png')} alt="" style={{ objectFit: 'contain', width: 250, height: 100 }} />
                </div>
            </a>
            <a href="http://www.deq.state.ne.us/">
                <div className="mb-3">
                    <img src={require('./images/NDEE.png')} alt="" style={{ objectFit: 'contain', width: 250, height: 100 }} />
                </div>
            </a>
            <a href="https://www.epa.gov/">
                <div className="mb-3">
                    <img src={require('./images/epa.png')} alt="" style={{ objectFit: 'contain', width: 250, height: 100 }} />
                </div>
            </a>
            <a href="https://environmentaltrust.nebraska.gov/">
                <div className="mb-3">
                    <img src={require('./images/NETseal_color.jpg')} alt="" style={{ objectFit: 'contain', width: 250, height: 100 }} />
                </div>
            </a>
        </form>
    )
}
