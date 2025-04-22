# know-your-well

2024-2025 Nebraska Water Center Senior Design Capstone Project

[Know Your Well YouTube Channel](https://www.youtube.com/@knowyourwell3985)

### Table of Contents

- [Executive Summary](#executive-summary)
- [Introduction](#introduction)
  - [Operational Environment](#operational-environment)
  - [Intended Users and Uses](#intended-users-and-uses)
  - [Assumptions and Limitations](#assumptions-and-limitations)
  - [Ethical Considerations](#ethical-considerations)
- [Past Design](#past-design)
- [Important Features](#important-features)
  - [Geolocation](#geolocation)
  - [Offline Caching](#offline-caching)
  - [Input Validation](#input-validation)
  - [Authentication](#authentication)
- [Architecture](#architecture)
  - [Database](#data-base)
  - [Node Backend](#node-backend)
  - [React Frontend](#react-frontend)
- [Next Steps](#next-steps)
  - [Notable At Large Bugs](#notable-at-large-bugs)
  - [Agile Epic Level Issues](#agile-epic-level-issues)

## Executive Summary

[Know Your Well](https://knowyourwell.unl.edu/ "Know Your Well") (KYW) is a project started at the University of Nebraska affiliated Nebraska Water Center (referred to as "the sponsor") that engages high school students and teachers in sampling and testing groundwater quality. About 160 students from 19 schools participated in KYW Phase 1 from 2017 to 2019. Through KYW, students are trained in well construction, features affecting well water quality, and how to collect and test samples. While sampling, students use a Progressive Web Application (PWA) to record well coordinates, land use, and other relevant features for (**IS THIS STILL TRUE**)up to 20 wells within 50 miles around their school, laying the groundwork for understanding groundwater vulnerability.

(_delete??_)The long-term goal is to build a sustainable youth education well water program by extending the scope of previous KYW projects with an NRD-led program supported by the University of Nebraska Lincoln (UNL) and Kearney (UNK), involving up to 50 schools across Nebraska. Specific objectives are to:

DELETE WHAT'S BELOW??!!

- improve the website, strengthen links to NRD stakeholders, and develop an Android-based KYW-III App,
- involve and train NRD staff in KYW-III program materials, and
- recruit and engage up to 50 school groups in sampling and testing of local domestic wells, helping students relate results to land use, well construction, and hydrogeology.

## Introduction

This application allows users (students or teachers generally) to log in using a secure single sign-on protocol through the Nebraska Department of Education’s NebraskaCloud federation. They can then create wells in the app that are submitted to an azure database. These wells are viewable to all students and teachers of the same school. These wells are viewable in the form of a list or a geographic map interface. Images associated with the well can also be uploaded. Students in the KYW program can go to the well and submit "field activities" through the app. Upon returning to the classroom for the testing of the water samples that are collected, students create "class labs" and "water science labs" associated with respective field activities and submit the testing results to the database.

### Operational Environment

There are two operational environments in which the app will be used: in the classroom and at the well itself. In the classroom, students will have access to general information about the well as well as any associated images, and later, classroom lab and water science lab test results. At the well, which is typically a remote environment where internet access is limited or non-existent, the app is typically used on mobile devices such as tablets. The most crucial difference between these two environments is that the classroom is likely to have a stable internet connection, whereas the well’s location may not have a stable connection, if at all, to the internet.

### Intended Users and Uses

High school students from participating Nebraska high schools will be the primary users of this application. Additional users include the UNL Water Sciences Lab, the Nebraska Water Center, the Daugherty Water for Food Global Institute at the University of Nebraska and other miscellaneous staff or faculty within the University's College of Agricultural Sciences and Natural Resources. The main use of this PWA is to replace documentation of information about wells, field activities, class labs, and water science labs done using paper and pencil. Another use of the PWA is to benefit from functionality that would be unfeasible on paper and pencil, such as by uploading images affilitated with a particular well.

### Assumptions and Limitations

The first assumption is that students will use an electronic device they have access to, such as a phone, tablet, or a laptop. Another assumption is that every student will have access to a device, whether their own or provided by their school.

One limitation is that the user must have internet access in the location that they initially boot up the app. It uses a secure single sign-on protocol through the Nebraska Department of Education’s NebraskaCloud federation, which requires an internet connection to authenticate. Another potential limitation is if the student is unable to gain access to a device at the time of data collection, they may not be able gather all the required data.

### Ethical Considerations

There are a few ethical considerations to be made in the production of Know Your Well. First, we must ensure that students gain the well owner’s consent before going on to their property to test their well. In Nebraska, wells are private property and require owner consent for students to enter the physical area to perform cataloguing. This is traditionally handled by external storage of a consent form provided by the well’s owner, but as part of image storage features, this form can now be stored within the PWA's database.

Also, we want to protect the anonymity of the students, wells, and well owners. This app also retains potentially sensitive information such as the full names of individuals, geographic coordinates of wells, and free-form text that may include unexpected and potentially sensitive data. The team’s photo upload features are now in production, meaning the app will also store user-submitted images which likewise may present unexpected and potentially sensitive data. The introduction of the geographic map interface shows the location of a well on a map; to maintain owner privacy, the level of zoom on the map has been limited to obscure the exact location, and well details are not displayed from this page.

In summary, privacy and consent are our two biggest ethical concerns.

## Past Design

As this is a continuation project, with our group being the third team to work on it, we received a product that had a preexisting design. The previous version of the app was contained in this same repository and had the same architecture as the current version, but it was more primitive in functionality. In the previous version of the app, users could create wells and input information related to research, classroom labs, and field activities.

## Important Features

### Geolocation

Geolocation was a feature that the sponsor mentioned on day one of the project as one of an app's major benefits. The main way geolocation would be used in the finished product is by easily identifying the coordinates of the well as well as important features. We have successfully implemented geolocation across the app. When the app is opened, it will use [navigator.geolocation.getCurrentPosition()](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) to get the user's current position and store it using [React Context](https://react.dev/reference/react/useContext) so that it can be used from anywhere in the app. Currently, the app will only get the user's position once upon it being opened, so it will no
be accurate to where the user is when they upload data. This is because we ran into issues with navigator.geolocation.getCurrentPosition() starting to fail t

#modifying the code to attempt to get the uuserser's coords from navigator.geolocation.getCurrentposiPosition()) first , using the cached coords as a fallback.## Offline Caching

rOffline caching is the most important feature of the application. This is because as previously stated, the sponsor anticipates that many field locations won't have a stable internet connection. To counteract this the app must be able to save the information they need for their field activity,;n There are two different types of datafoffline caching supported by the app:

1. Manual Caching: When the user knows they do not have a connection, or wants to cache their data to come back and edit later, they can press the "Save" button on supported forms to cache the information for later. When the user navigates back to the page and cached data exists, the app will prompt the user to ask if they would like to continue with their cached data. This is implemented using localStorage to save the relevant data.

0.wAutomatic Caching: When the user attempts to submit data, if the app does not have a connection to the server it will automatically cache the data in a queue that will check for a connection every 15 seconds and, if one is found, upload the user's data. hen the the app realizeds it does not have a connicen partand also the tdoniata that usersi center in the field, and then submit it when they have access to the internet. We have successfform emented this for the urrent pages where the .d, but as the app expands past its current state more pages will n (and images to Indexe to the server upon data submission.dDB)eed to be cached. We have accomplished this by saving relevant data to localStorage either when the database returns it or when the user hits save.
e
tu### Input Validation
r
nInput validation is currently handled by string patterns in the forms on the pages. These string patterns enforce constraints on the field such that users can not input data when being called repeatedly. If we require more accurate p sition data, we could consider values outside of a certain ranAn export page exists in the app that allows about wells in ththey have access to. In partThis page can be accessed from the navigation bar once the user is logged in. There are currently two supporteed d prisupported data export options: All Well Data and Image Metadata.i class labs but also for fields and wells as well.

### CSV Exporting

A feature was added late in the year that allowed users to export all data from the app to a csv file. This works as intended and the button can be found at the button of the wells page, beneath all the wells. One issue persists where county ids and NRD ids that are exported are one digit off.

### Filtering/Sorting Wells

Wells can be filtered and sorted using the two buttons at the top of the wells page. The decision to sort by date and filter by counties was a decision made by the sponsor. Additional functionality includes clicking off of the filter button clears the filter/clears the sort.

### Authentication

Authentication has been completed in the form of Nebraska Cloud. Currently, the loginWells can be sorted by The sort and filter options ar ele listed below:

- **Sort**
  - Oldest First (default): Lists the wells in order of their entry to the database, from oldest to newest.
  - Newest First: Lists the wells in order of their entry to the database, from newest to oldest.
  - Well Name A-Z: Lists the wells in alphabetical order.
  - Well Name Z-A: Lists the wells in reverse alphabetical order.
  - Most Recent Field Activity: Lists the wells ordered by the most recently entered field activity.
- **Filter**
  - County: Filters wells by county.
  - Natural Resource District: Filters wells by NRD.
  - Search: Filters wells by well name.
  - Latitude: Finds wells inside a latitude range.
  - Longitude: Finds wells inside a longitude range.
  - Wells in a \_\_\_ mile radius: Finds wells within a certain mile radius of the user's current position.page sends an api request to the backend server (index.js) and a saml2.0 login request is created by utilizing the samlify library. After a SAML URL has been generated, the app is redirected to the Nebraska Cloud website where users are to submit their school email and passwords to login. The users are then redirected back to the well page after the response from nebraska cloud has been received and a user session has been created. At the wells page, the app uses the information returned from Nebraska Cloud to determine the users school and then only wells from that school are displayed.

Authenticating users was a big step. This is because all wells that are created within in the app must be linked to their school, and Nebraska Cloud allowed us to do just this. In the current app, users can only see wells that are created by those who attend the same school, which was a sponsor requirement.

### Image Upload

The application includes the funcionality for uploading images of various land features such as septic tanks, surface water, and well heads, as well as important documentation like the well owner's consent forms and image release consent forms. Images can be captured and uploaded to the database from the user's device during field activities. The images are designed to be viewable in the Previously Uploaded Images page. Like other field data, images can be captured offline and will automatically upload to the database when the user has internet access.

## Architecture

### Data Base

![Database ER Diagram](DocumentationImages/KYW-DatabaseRelationships.jpg "Database ER Diagram")
_Major adjustments to this database have been made as per the sponsors request. Several fields were added, the class lab and field relationship was reworked, and a land feature table was added._

The database that the PWA connects to is a SQL Database hosted on the sponsor's Azure account. It has a series of tables that correspond to user-associated information and tables associated with each of the three contexts where the app is used (classroom/home for well info, remote site for well, and classroom for the class lab.) The sponsor also included a Nebraska Water Center lab table which is for an anticipated expansion of the app to be used to enter data that will come from their experiments.

### Node Backend

_More in-depth information can be found in [Backend.md](/Backend.md)_

- The entire app is served through the Node.js backend.
  - Accomplished by configuring project as Node app, and serving React front-end using [express.static()](https://expressjs.com/en/starter/static-files.html).
- The app by default tries to match the request to an API endpoint using app.get methods if it fails to do this it redirects users to static files served using the method mentioned above.
- Connects to database using Express, and [Node MSSQL](https://www.npmjs.com/package/mssql).
  - Handles requests from the client app to retrieve, or update information in the DB.

### React Frontend

_More in-depth information can be found in [Frontend.md](/Frontend.md)_

- Served by the Node Backend if the request doesn't match any of the DB API endpoints.
- Broadly
  - Takes processed information from the Node backend and displays it.
  - Collects information from users both by them entering it explicitly, and by reading system information e.g., drop-down menu, and system time.
    - Validation is also performed using [HTML pattern attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern) in the relevant forms.
  - Sends information collected by users to the server app using [Axios](https://axios-http.com/docs/intro).
- Organized by the major points where the app is used with menus to navigate between these sections.
  - Well Info – General information about the well that is entered in an area with an internet connection.
  - Field – Collecting information in the field, designed to be usable without internet access.
    - Information required for beginning the field section will be cached after pre-field, and the field log will be cached when the user indicates that they have finished the field section.
      - Cached information is uploaded when the user has an internet connection.
  - Lab – Students input results of lab tests that they run on water samples.
    - Similar to Well-Info, except the user selects the well log they want to update for the Lab section.
    - Associated with a Field entry

## Next Steps

### Notable At Large Bugs

- Currently, not all packages are automatically deployed to Azure. Client side packages (inside the ClientApp folder) are deployed correctly, but packages within the knowyourwell folder do not get deployed correctly. Our current workaround is to have that upper level package.json sent to Azure each deployment, so you can then manually run "npm install" from the Kudu console in Azure. This is very inefficient and the process should be performed automatically. There are two solutions to this problem that we can think of:
  1. Investigate why the client side packages are successfully transferred to Azure but the upper level packages are not. Ideally, everything needed on the Azure side is zipped up and sent from the GitHub Actions script. We do know that you may run into file size issues attempting to zip up and send the entire node_modules folder over from GitHub Actions, so another solution may be necessary.
  1. Have the Web App automatically run a script on deployment: Some Azure resource types have a post-deployment script as a default part of their structure but it seems that our resource type is not among them. More research is required for this option.
- At this point, users are often unable to be authenticated. Upon clicking the "Login with School Credentials" button they are met with a screen that says that the page could not be reached. This appears to be related to Nebraska Cloud in some capacity.
  1. This bug arose after another Nebraska Cloud issue, specifically where the app's saml requests sent with the "AllowCreate" attribute as an empty string. It is unknown why this bug occurred, as when the SAML was initially implemented this was not an issue. In order to solve this, we greatly reworked how the saml requests are sent including using samlify templates. After the issue was solved the new issue of the page not being able to be reached arose.
  2. It appears this issue is random in timing. However you can generally work around it by continuing to sent refresh the page and restarting the app. This almost always bypasses the issue, although it will need to be investigated and addressed in the future.

### Agile Epic Level Issues

\*Besides a few lingering bugs, we have implemented a large portion of the application. The largest outstanding categories are photo uploads and land features, and offline capabilities. A large triage of bugs causes us to delay features that we had initially been planning on releasing. Major progress has been made on the side of both offline capabilities and photo uploads, although it is not finished.

1.  Photo upload capabilities involves taking images of land features (in the field page, land features are described as septic tanks, surface water etc.) and uploading them in the field page. Eventually these images should be displayed in the view well page. Code for this is on production right now, but it is not functional.
2.  Because of how the database was set up, land features had to be associated with the well rather than the field activity, where the sponsors would prefer them. Moving them to the field page involves reworking the database, and this was not in the scope of our project unfortunately.
3.  Offline capabilities had to be reworked this year due to issues that arose early on. This issue has persisted and has been very tough to manage. We have ran into issues where the offline functionality works on local environments but not on the production environment, making it even tougher. Code for offline capabilities, including the new additions and revisions, is also on production but not functional at this time

A large number of known bugs can be found in the repository's ZenHub board. Good luck!
