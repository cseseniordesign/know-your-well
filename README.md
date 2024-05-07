# know-your-well
2022-2023 Nebraska Water Center Senior Design Capstone Project

[Know Your Well YouTube Channel](https://www.youtube.com/@knowyourwell3985)

### Table of Contents
* [Executive Summary](#executive-summary)
* [Introduction](#introduction)
    * [Operational Environment](#operational-environment)
    * [Intended Users and Uses](#intended-users-and-uses)
    * [Assumptions and Limitations](#assumptions-and-limitations)
    * [Ethical Considerations](#ethical-considerations)
* [Past Design](#past-design)
* [Important Features](#important-features)
    * [Geolocation](#geolocation)
    * [Offline Caching](#offline-caching)
    * [Input Validation](#input-validation)
    * [Authentication](#authentication)
* [Architecture](#architecture)
    * [Database](#data-base)
    * [Node Backend](#node-backend)
    * [React Frontend](#react-frontend)
* [Next Steps](#next-steps)
    * [Notable At Large Bugs](#notable-at-large-bugs)
    * [Agile Epic Level Issues](#agile-epic-level-issues)


## Executive Summary 

[Know Your Well](https://knowyourwell.unl.edu/ "Know Your Well") (KYW) is a project started at the University of Nebraska affiliated Nebraska Water Center (referred to as "the sponsor") that engages high school students and teachers in sampling and testing groundwater quality. About 160 students from 19 schools participated in KYW Phase 1 from 2017 to 2019. Through KYW, students are trained in well construction, features affecting well water quality, and how to collect and test samples. While sampling, students use Google Form Surveys (previously the KYW iOS App) to record well coordinates, land use, and other relevant features for up to 20 wells within 50 miles around their school, laying the groundwork for understanding groundwater vulnerability. Replacing the nonfunctional iOS app, a new KYW-III App will offer students a replacement mechanism to automate, manage and verify data collected by users. 

The long-term goal is to build a sustainable youth education well water program by extending the scope of previous KYW projects with an NRD-led program supported by the University of Nebraska Lincoln (UNL) and Kearney (UNK), involving up to 50 schools across Nebraska. Specific objectives are to:

* improve the website, strengthen links to NRD stakeholders, and develop an Android-based KYW-III App, 
* involve and train NRD staff in KYW-III program materials, and 
* recruit and engage up to 50 school groups in sampling and testing of local domestic wells, helping students relate results to land use, well construction, and hydrogeology.

## Introduction

This application allows users (students or teachers generally) to log in using their school email and password. They can then create wells in the app that are submitted to an azure database. These wells are viewable to all students and teachers of the same school. Students in the KYW program can go to the well and submit "field actitives" through the app. Upon returning to the classroom for the testing of the water samples that are collected, students create "class labs" and submit the testing results to the database.

### Operational Environment
There are two operational environments that the app will be used in: in the classroom and at the well itself. In the classroom, students will have access to general information about the well and later, classroom lab test results. The most crucial difference between these two environments is that the classroom is likely to have a stable internet connection, whereas the well’s location may not have a stable connection, if at all, to the internet.

### Intended Users and Uses
High school students from participating Nebraska high schools will be the primary users of this application. Additional users include the UNL Water Sciences Lab and additional staff like Sara and Mark. We believe the main uses of this new application will be for students to input data about a specific well online and offline before submitting the information right away or the next time they are online. 

### Assumptions and Limitations 
The first assumption is that students will use any device they have access to, which may include a phone, tablet, or even a laptop. Another assumption is that every student will have access to a device whether their own or provided by the school. In addition, students are assumed to have a school login in which they can access the app. A potential limitation is if the student is unable to gain access to a device at the time of data collection, they may not be able gather all the required data. 

### Ethical Considerations
There are a few ethical considerations to be made in the production of Know Your Well. First, we must ensure that students gain the well owner’s consent before going on to their property to test their well. This can be achieved by having the owners sign a release form. Although this is common practice for Nebraska Water, we also want the ability to take a picture of the release form and upload it to the database as proof. 

Also, we want to protect the anonymity of the students, wells, and well owners. This can be achieved by storing the latitude and longitude as truncated general values, when data is released to the public. Privacy and consent are our two biggest ethical concerns. 

## Past Design 

The previous iOS mobile app used by KYW is no longer functional. Currently students are filling out data using a Google Forms Survey or by hand on printed forms. This setup is time-consuming and not very efficient. We have been tasked with creating a new application in replacement of these systems. This application will interface with an existing secure online database for automated data collection and retrieval of domestic well water quality data collected by participating high schools and Nebraska Natural Resources Districts.  

We inherited a former iOS application that was used but then became out of date and is no longer active. A training video for the former iOS app was also given to us. The sponsor also showed us the current Know Your well logo and website to help us design the new application. Hence, this project is not completely greenfield, but instead building from the examples of the old iOS application, and the old Google Forms that were used to input well data.  

## Important Features

### Geolocation 
Geolocation was a feature that the sponsor mentioned on day one of the project as one of an app's major benefits. The main way geolocation would be used in the finished product is by easily identifying the coordinates of the well as well as important features. We have succesfully implemented geolocation for locating the well using [navigator.geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) in field.js and we anticipate that future implementation for well features.

### Offline Caching 
Offline caching is the most important feature of the application. This is because as previously stated, the sponsor anticipates that many field locations won't have a stable internet connection. To counteract this the app must be able to save the information they need for their field activity, and also the data that users enter in the field, and then submit it when they have access to the internet. We have succesfully implemented this for the current pages where the sponsor said it was needed, but as the app expands past its current state more pages will need to be cached. We have accomplished this by saving relevant data to localStorage either when the database returns it or when the user hits save.

### Input Validation 
Input validation is currently handled by string patterns in the forms on the pages. These string patterns enforce constraints on the field such that users can not input values outside of a certatin range. This is used primarily for class labs but also for fields and wells as well.

### CSV Exporting
A feature was added late in the year that allowed users to export all data from the app to a csv file. This works as intended and the button can be found at the button of the wells page, beneath all the wells. One issue persists where county ids and NRD ids that are exported are one digit off. 

### Filtering/Sorting Wells
Wells can be filtered and sorted using the two buttons at the top of the wells page. The decision to sort by date and filter by counties was a decision made by the sponsor. Additional functionality includes clicking off of the filter button clears the filter/clears the sort.

### Authentication
Authentication has been completed in the form of Nebraska Cloud. Currently, the login page sends an api request to the backend server (index.js) and a saml2.0 login request is created by utilizing the samlify library. After a SAML URL has been generated, the app is redirected to the Nebraska Cloud website where users are to submit their school email and passwords to login. The users are then redirected back to the well page after the response from nebraska cloud has been received and a user session has been created. At the wells page, the app uses the information returned from Nebraska Cloud to determine the users school and then only wells from that school are displayed.

Authenticating users was a big step. This is because all wells that are created within in the app must be linked to their school, and Nebraska Cloud allowed us to do just this. In the current app, users can only see wells that are created by those who attend the same school, which was a sponsor requirement. 

## Architecture

### Data Base
![Database ER Diagram](DocumentationImages/KYW-DatabaseRelationships.jpg "Database ER Diagram")
*Major adjustments to this database have been made as per the sponsors request. Several fields were added, the class lab and field relationship was reworked, and a land feature table was added.*

The database that the PWA connects to is a SQL Database hosted on the sponsor's Azure account. It has a series of tables that correspond to user-associated information and tables associated with each of the three contexts where the app is used (classroom/home for well info, remote site for well, and classroom for the class lab.) The sponsor also included a Nebraska Water Center lab table which is for an anticipated expansion of the app to be used to enter data that will come from their experiments. 

### Node Backend
*More in-depth information can be found in [Backend.md](/Backend.md)*

* The entire app is served through the Node.js backend.
    * Accomplished by configuring project as Node app, and serving React front-end using [express.static()](https://expressjs.com/en/starter/static-files.html).
* The app by default tries to match the request to an API endpoint using app.get methods if it fails to do this it redirects users to static files served using the method mentioned above.
* Connects to database using Express, and [Node MSSQL](https://www.npmjs.com/package/mssql). 
    * Handles requests from the client app to retrieve, or update information in the DB. 

### React Frontend
*More in-depth information can be found in [Frontend.md](/Frontend.md)*

* Served by the Node Backend if the request doesn't match any of the DB API endpoints.
* Broadly 
    * Takes processed information from the Node backend and displays it. 
    * Collects information from users both by them entering it explicitly, and by reading system information e.g., drop-down menu, and system time. 
        * Validation is also performed using [HTML pattern attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) in the relevant forms.
    * Sends information collected by users to the server app using [Axios](https://axios-http.com/docs/intro). 
* Organized by the major points where the app is used with menus to navigate between these sections. 
    * Well Info – General information about the well that is entered in an area with an internet connection. 
    * Field – Collecting information in the field, designed to be usable without internet access. 
        * Information required for beginning the field section will be cached after pre-field, and the field log will be cached when the user indicates that they have finished the field section. 
            * Cached information is uploaded when the user has an internet connection. 
    * Lab – Students input results of lab tests that they run on water samples. 
        * Similar to Well-Info, except the user selects the well log they want to update for the Lab section. 
        * Associated with a Field entry

## Next Steps

### Notable At Large Bugs
* Currently, not all packages are automatically deployed to Azure. Client side packages (inside the ClientApp folder) are deployed correctly, but packages within the knowyourwell folder do not get deployed correctly. Our current workaround is to have that upper level package.json sent to Azure each deployment, so you can then manually run "npm install" from the Kudu console in Azure. This is very inefficient and the process should be performed automatically. There are two solutions to this problem that we can think of:
    1. Investigate why the client side packages are successfully transferred to Azure but the upper level packages are not. Ideally, everything needed on the Azure side is zipped up and sent from the GitHub Actions script. We do know that you may run into file size issues attempting to zip up and send the entire node_modules folder over from GitHub Actions, so another solution may be necessary.
    1. Have the Web App automatically run a script on deployment: Some Azure resource types have a post-deployment script as a default part of their structure but it seems that our resource type is not among them. More research is required for this option.
* At this point, users are often unable to be authenticated. Upon clicking the "Login with School Credentials" button they are met with a screen that says that the page could not be reached. This appears to be related to Nebraska Cloud in some capacity.
    1. This bug arose after another Nebraska Cloud issue, specifically where the app's saml requests sent with the "AllowCreate" attribute as an empty string. It is unknown why this bug occured, as when the SAML was initially implemented this was not an issue. In order to solve this, we greatly reworked how the saml requests are sent including using samlify templates. After the issue was solved the new issue of the page not being able to be reached arose.
    2. It appears this issue is random in timing. However you can generally work around it by continuing to sent refresh the page and restarting the app. This almost always bypasses the issue, although it will need to be investigated and addressed in the future.

### Agile Epic Level Issues
*Besides a few lingering bugs, we have implemented a large portion of the application. The largest outstanding categories are photo uploads and land features, and offline capabilites. A large triage of bugs causes us to delay features that we had initially been planning on releasing. Major progress has been made on the side of both offline capabilities and photo uploads, although it is not finished.
   1. Photo upload capabilities involves taking images of land features (in the field page, land features are described as septic tanks, surface water etc.) and uploading them in the field page. Eventually these images should be displayed in the view well page. Code for this is on production right now, but it is not functional.
   2. Because of how the database was set up, land features had to be associated with the well rather than the field activitiy, where the sponsors would prefer them. Moving them to the field page involves reworking the database, and this was not in the scope of our project unfortunately.
   3. Offline capabilities had to be reworked this year due to issues that arose early on. This issue has persisted and has been very tough to manage. We have ran into issues where the offline functionality works on local environments but not on the production environment, making it even tougher. Code for offline capabilities, including the new additions and revisions, is also on production but not functional at this time

A large number of known bugs can be found in the repository's ZenHub board. Good luck!
