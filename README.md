# know-your-well
2022-2023 Nebraska Water Center Senior Design Capstone Project

[Know Your Well YouTube Channel](https://www.youtube.com/@knowyourwell3985 "Know Your Well YouTube Channel")


## Executive Summary 

[Know Your Well](https://knowyourwell.unl.edu/ "Know Your Well") (KYW) is a project started at the University of Nebraska that engages high school students and teachers in sampling and testing groundwater quality. About 160 students from 19 schools participated in KYW Phase 1 from 2017 to 2019. A smaller project (Phase II) is underway involving 5 schools in the Bazile Groundwater Management Area in northeast Nebraska and is expected to finish in 2022. Through KYW, students are trained in well construction, features affecting well water quality, and how to collect and test samples. While sampling, students use Google Form Surveys (previously the KYW iOS App) to record well coordinates, land use, and other relevant features for up to 20 wells within 50 miles around their school, laying the groundwork for understanding groundwater vulnerability. Replacing the nonfunctional iOS app, a new KYW-III App will offer students a replacement mechanism to automate, manage and verify data collected by users. 

The long-term goal is to build a sustainable youth education well water program by extending the scope of previous KYW projects with an NRD-led program supported by the University of Nebraska Lincoln (UNL) and Kearney (UNK), involving up to 50 schools across Nebraska. Specific objectives are to:

* improve the website, strengthen links to NRD stakeholders, and develop an Android-based KYW-III App, 
* involve and train NRD staff in KYW-III program materials, and 
* recruit and engage up to 50 school groups in sampling and testing of local domestic wells, helping students relate results to land use, well construction, and hydrogeology.

## Introduction

There is a progressive web application (PWA) that is easy for faculty and students to use. This PWA will reduce paper copies and eliminate the need for Google Forms. Users will be able to input data online or offline. If data is entered offline, they will be able to save it to their device and then synchronize with the database once they are back online.

### Operational Environment
There are two operational environments that the app will be used in: in the classroom and at the well itself. In the classroom, students will have access to general information about the well and later, classroom lab test results. The most crucial difference between these two environments is that the classroom is likely to have a stable internet connection, whereas the well’s location may not have a stable connection, if at all, to the internet.

### Intended Users and Uses
High school students from participating Nebraska high schools will be the primary users of this application. Additional users include the UNL Water Sciences Lab and additional staff like Sara and Mark. We believe the main uses of this new application will be for students to input data about a specific well online and offline before submitting the information right away or the next time they are online. 

### Assumptions and Limitations 
The first assumption is that students will use any device they have access to, which may include a phone, tablet, or even a laptop. Another assumption is that every student will have access to a device whether their own or provided by the school. In addition, it is implied that the application that we build will incorporate GPS and will help ensure that the student is at the right well. A potential limitation is if the student is unable to gain access to a device at the time of data collection, they may not be able gather all the required data. Also, depending on the specific sign-on option chosen by the sponsor, the individual may need to sign-up for an account or deal with complicated double authentication rules. 

### Ethical Considerations
The largest ethical considerations we are aware of is the safety of personal information and logins of students, teachers, and staff. We have considered this as we built the application, making sure to protect that information from the public and those who may have access to the application. Privacy and safety of all involved is our highest priority. 

An additional consideration we are aware of is tampering with the collected data. To limit the possibility of this happening, students are unable to edit previous entries. To fix mistakes, they must reach out to KYW directly (though an email provided in the PWA) to request an adjustment to the data. 

## Past Design 

The previous iOS mobile app used by KYW is no longer functional. Currently students are filling out data using a Google Forms Survey or by hand on printed forms. This setup is time-consuming and not very efficient. We have been tasked with creating a new application in replacement of these systems. This application will interface with an existing secure online database for automated data collection and retrieval of domestic well water quality data collected by participating high schools and Nebraska Natural Resources Districts.  

We inherited a former iOS application that was used but then became out of date and is no longer active. A training video for the former iOS app was also given to us. The sponsors also showed us the current Know Your well logo and website to help us design the new application. Hence, this project is not completely greenfield, but instead building from the examples of the old iOS application, and the old Google Forms that were used to input well data.  

## Important Features

### Geolocation 
Geolocation was a feature that sponsors mentioned on day one of the project as one of an app's major benefits. The main way geolocation would be used in the finished product is by easily identifying the coordinates of the well as well as important features. We have succesfully implemented geolocation for locating the well using [navigator.geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) in field.js and we anticipate that future implementation for well features.

### Offline caching 
Offline caching is the most important feature of the application. This is because as previously stated, the sponsors anticipate that many field locations won't have a stable internet connection. To counteract this the app must be able to save the information they need for their field activity, and also the data that users enter in the field, and then submit it when they have access to the internet. We have succesfully implemented this for the current pages where the sponsors have said it was needed, but as the app expands past its current state more pages will need to be cached. We have accomplished this by saving relevant data to localStorage either when the database returns it or when the user hits save.

### Input validation 
Input validation is currently handled by string patterns in the forms on the pages. One avenue for future development is also performing server side validation. The method that we were leaning towards when our work concluded was modifying the database to check constraints but more research is needed on whether this is a feasible solution for server-side validation.

## Architecture

### Data Base
![Database ER Diagram](\DocumentationImages\KYW-DatabaseRelationships.jpg "Database ER Diagram")
*ER Diagram was up to date before April update. The only major adjustment was making the relationship between the field, and lab tables 1-1.*

The database that the PWA connects to is a SQL Database hosted on the sponsor's Azure account. It has a series of tables that correspond to user associated information, and tables associated with each of the three contexts that the app is used in (class room/home for well info, remote site for well, and classroom for the class lab.) The sponsors also included a Nebraska Water Center lab table which is for an anctipated expansion of the app to be used to enter data that comes from their experiments.