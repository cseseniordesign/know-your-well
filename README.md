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

[Know Your Well](https://knowyourwell.unl.edu/ "Know Your Well") (KYW) is a project started at the University of Nebraska affiliated Nebraska Water Center (referred to as "the sponsor") that engages high school students and teachers in sampling and testing groundwater quality. About 160 students from 19 schools participated in KYW Phase 1 from 2017 to 2019. A smaller project (Phase II) is underway involving 5 schools in the Bazile Groundwater Management Area in northeast Nebraska and is expected to finish in 2022. Through KYW, students are trained in well construction, features affecting well water quality, and how to collect and test samples. While sampling, students use Google Form Surveys (previously the KYW iOS App) to record well coordinates, land use, and other relevant features for up to 20 wells within 50 miles around their school, laying the groundwork for understanding groundwater vulnerability. Replacing the nonfunctional iOS app, a new KYW-III App will offer students a replacement mechanism to automate, manage and verify data collected by users. 

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

We inherited a former iOS application that was used but then became out of date and is no longer active. A training video for the former iOS app was also given to us. The sponsor also showed us the current Know Your well logo and website to help us design the new application. Hence, this project is not completely greenfield, but instead building from the examples of the old iOS application, and the old Google Forms that were used to input well data.  

## Important Features

### Geolocation 
Geolocation was a feature that the sponsor mentioned on day one of the project as one of an app's major benefits. The main way geolocation would be used in the finished product is by easily identifying the coordinates of the well as well as important features. We have succesfully implemented geolocation for locating the well using [navigator.geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) in field.js and we anticipate that future implementation for well features.

### Offline Caching 
Offline caching is the most important feature of the application. This is because as previously stated, the sponsor anticipates that many field locations won't have a stable internet connection. To counteract this the app must be able to save the information they need for their field activity, and also the data that users enter in the field, and then submit it when they have access to the internet. We have succesfully implemented this for the current pages where the sponsor said it was needed, but as the app expands past its current state more pages will need to be cached. We have accomplished this by saving relevant data to localStorage either when the database returns it or when the user hits save.

### Input Validation 
Input validation is currently handled by string patterns in the forms on the pages. One avenue for future development is also performing server side validation. The method that we were leaning towards when our work concluded was modifying the database to check constraints but more research is needed on whether this is a feasible solution for server-side validation.

### Authentication
The sponsors have consistently said that Authentication is an important feature of the application. They want to avoid vandalization of their database as well as allowing students at participating highschools to use the app in an easy way that respects their privacy. To this end, we have been working with NebraskaCloud to incorporate the same authentication system used by the  Nebraska public shool system. Currently, the application is configured to use https://samltest.id/ as the identity provider, though this should later be replaced by Nebraska Cloud. There is a button on the log in screen that creates a login request from the service provider to the identity provider. Despite these efforts, we have ran into some hiccups when it comes to what we have implemented which will be detailed in the Next Steps Section at the bottom of the README.

## Architecture

### Data Base
![Database ER Diagram](DocumentationImages/KYW-DatabaseRelationships.jpg "Database ER Diagram")
*ER Diagram was up to date before April update. The only major adjustment was making the relationship between the field, and lab tables 1-1.*

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
* Hard coded values in wellinfo - Currently several (school_id, well_code, county, nrd, etc.) are hard coded. Several of these values are hard coded because they are dependent on the implementation of authentication (school_id, and well_code through school_id) others are because the implementation is tied to a nearly empty database table that is supposed to provide the options (county, and nrd.)
    1. The fixes for these values vary depending on why they are hard coded. 
        * The fix for the tables based on authentication can be implemented fairly simply once NECloud tells you which school the student is enrolled in. This fix combined with an update to the well_code similar to what is done in /createclasslab could allow you to update the well_code based on the school_id and the well_id.
        * The fix for values that are supposed to be dependent on other tables in the DB can be fixed using the following approaches.
            * (Recommended) Don't use DB tables for populating drop-down menus and switch the values to VARCHARS instead. While it may be the case that the sponsors are comfortable adding an additional value to a DB, the process of adding an element to a drop-down table is trivial, as shown in the Common Tasks MD file. This fix would entail significantly less work than modifying the .js files to populate the drop-downs based on a query since it would only entail changing the type of a few columns and deleting a few tables.
            * Populate the drop-downs based on a query to the DB. This approach is significantly more complex. You would have to add, at minimum two additional endpoints to index.js and also make the rendering of each of these pages conditional on the results of these queries. This, in addition to the extra work, means that if the students don't have the fastest internet connection the forms might take significantly longer to load. I don't believe it would be controversial to say that this approach would be very atypical for the frequency of updates that would be made to the drop-down tables.
* The data ocasionally doesn't load, for some reason opening the terminal fixes the problem.
* The app loads slowly.
    1. Could maybe be solved by adjusting how pooling works in the app.

### Agile Epic Level Issues
Besides a few lingering bugs, we have implemented a large portion of the application. The largest outstanding categories are authentication and photo uploads.

The state of authentication is as stated earlier that the application is configured to use https://samltest.id/ as the identity provider, though this should later be replaced by Nebraska Cloud. There is a button on the log in screen that creates a login request from the service provider to the identity provider. However, there is still signifigant progress to be made since the login request is not receiving the expected response, and causes an error. This might be related to samltest, but should be fixed before moving on or switching the identity provider to Nebraska Cloud. To make the switch to Nebraska Cloud, modify the saml middleware to use the Nebraska Cloud metadata, rather than samltest. We also highly recommend creating a new X.509 certificate for our service provider metadata using OpenSSL. You can find a Windows installer for OpenSSL here: https://slproweb.com/products/Win32OpenSSL.html. Here is a link with information on how to generate this certificate https://support.google.com/a/answer/6342198?hl=en. Nebraska Cloud will also need a copy of that service provider metadata. Once this is done, you can test the same basic login request using Nebraska Cloud. Afterwards, you will need to add code to parse the response from Nebraska Cloud and use that information to control access to the rest of the application, as well as only query for wells relevant to the logged in user. Currently, our service provider metadata is configured so that logout requests are sent to "https://kywsso.azurewebsites.net/saml/logout" (SingleLogoutService) and the response from the identity provider is sent to "https://kywsso.azurewebsites.net/saml/acs" (AssertionConsumerService). Feel free to change these URLs, but you will need to set up endpoints to handle these requests.

Because of multiple roadblocks that we experienced through the semester, photo-upload capabilities were eventually side-lined in favor of strengthening the DB connection, caching data for offline use, and our progress on authentication. We've done very little research into this topic, and so it would require a significant amount of research. One note would be that the DB only has a 32 GB capacity so it might be best to avoid storing images on it. A popular option in Express apps for handling and storing file uploads in the site's own file structure is [multer](https://www.npmjs.com/package/multer), but limitations on a Web App's deployed size may make storing them within the Web App's own structure unattractive in which case [Azure Blob Storage](https://azure.microsoft.com/en-us/products/storage/blobs) may be a good option. Of course, you will have to be concious of security concerns when storing these files. It is our understanding that the next immediate step that the sponsor is planning on taking is performing limited user testing over the summer and hopefully the information they have gathered will be useful for further development. 

A large number of known bugs can be found in the repository's ZenHub board. Good luck!
