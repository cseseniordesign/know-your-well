# Front End

## Overview
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