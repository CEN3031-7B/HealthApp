# Health App (CEN3031 7-B Project) #
### https://healthapp-cen3031-7b.herokuapp.com/

## About ##
This health app is a MEAN.JS-based application that allows a healthcare professional to interview patients based on a series of questions in the form of a survey. The survey then stores the information in the form of a results page that indicates the patient's health risk, determined by standard health risks. For example, a patient would be at risk for diabetes if they were of a certain age or weight and if they did not exercise regularly. 

### User States and Privileges ###
There are three levels of authentication: Un-authenticated user, authenticated user, and administrator. An un-authenticated user is only able to see the landing page and cannot access any other pages or states. An authenticated user is only able to create new patients, conduct surveys, and view stored results pages for the patients that they created (this last is referred to as the patient portal). An administrator is able to view the admin landing page which allows for the creation and management of new patients and new users. Additionally, an admin can access all pages that an authenticated user can access;  they can conduct surveys and view stored results pages for the patients that they created. A user is not capable of accessing administrator-only pages (those related to user creation and management). Neither admins nor users are able to access information about patients that are not their own.

### Patient Portal ###
The patient portal stores all patient information, including their name, age, and diseases they are at risk for. Patients in the list can be viewed by both administrators and regular users, but each user may only view the patients their account created. The patients can be identified by both first and last name and, in the case of patients with the same name, their date of birth. A dynamic search bar immediately begins filtering patients as the user types. For example, if the user types "J" in the search bar, only users whose last names contain a "J" would show up. Above the list, the user can click a large Give Survey button in order to create a new patient.

### Diseases ###
The disease page can be accessed from the dropdown menu. Each disease and their creation date are listed, and they can be filtered by the disease name. 
*Demonstration of disease filter:*
![Diseases filter](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/diseases.png)

For scalability, or if the user cannot find a certain disease, they may create a new disease in the database. To do so, the user can complete a form that includes information such as the disease's name and suggested treatments for that disease. The user is able to categorize and add special parameters to the suggested treatment. 
*Keeping in mind the site's scalability, diseases can be added:*
![Diseases/suggestions creation](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/diseases2.png)

So when a patient fills out the survey and has a certain disease, the corresponding suggested treatment(s) will appear in their health risk results.

This form, the survey, the diseases, and the suggested treatments are modeled after several pages of information that were provided by our client, a medical professional.

### Survey ###
##### Create New Patient #####
The survey is presented to a new patient by their healthcare practitioner. The new patient must fill out basic healthcare form information such as their first and last names, date of birth, gender, weight, etc. Optionally, diseases can be checked if they have that disease. After the form successfully submits, the healthcare practitioner can go to the patient information page to edit the information if they must. (They can also delete the patient if they must.) If the patient information is up-to-date, then the individual administering the survey can view the patient's results. 
##### Results #####
The results page retrieves the suggested treatments for the patient based on which diseases they checked in the survey. The diseases are categorized by the selected field from when they were created, and the corresponding suggestions are listed next to the disease so that the healthcare practitioner may check over the results in an organized fashion.

If the information is changed and updated, the results page will change accordingly.

### Admin Landing ###
*Administrator's landing page:*
![Loggedin Admin](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/masteradmin.png)
##### Create User #####
On the administrator's landing page, the administrator is able to add new users (i.e. healthcare assistants, nurses) through the create user modal. Information such as the username, first and last names, email, password, and whether or not the user should be made an administrator must be provided before the user can sign up. There are requirements for some of the fields: the username and email cannot already be in use; the password must be greater than 10 characters and must contain numbers, uppercase, lowercase, and special characters.
##### User Portal #####
The user portal lists the users that have signed up for an account for the web app. It can be accessed by the administrator on their landing page via the Manage User button. It cannot be accessed by regular users. Users can be identified by their first name, last name, and username. The date the account was created is displayed as well. In order to find a specific user among the entire list, the administrator can enter the user's last name in the filter bar. Similar to the patient portal filter bar, the names are filtered as the administrator types.

### Contact ###
There is also a contact us feature so that, if the user encounters an problem or has a question, they can inform the master administrator (our client) and resolve the issue quickly.
*Completed fields in Contact Us modal appear in the email client:*
![Contact Us modal](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/contactmodal.png)

### Miscellaneous ###
The user may change their password, update their profile information (change first name, last name, email, username, and profile picture), and add social media such as their office's LinkedIn profile.

For security purposes, the patient portal, diseases page, admin landing page, and settings pages cannot be accessed by typing its URL. If attempted, the user will be redirected back to their user state's landing page (whether it is the admin landing, patient portal, or sign-in page).

### Deployment ###
The app is hosted externally using the Heroku platform and has been tested using the Protractor framework. The web app is responsive for various devices:

*Unauthenticated user's view of the homepage on a large screen:*
![Large screen](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/notsignedinlgscreen.png)

*View of the homepage on a tablet (iPad):*
![iPad](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/notsignedinipadscreen.png)

*View of the homepage from a smartphone (iPhone 5):*
![iPhone5](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/notsignediniphone5screen.png)

*Administrator's landing page with the menu open on an iPhone 5:*
![iPhone5 Logged in and menu open](https://raw.githubusercontent.com/CEN3031-7B/HealthApp/master/healthappscreenshots/masteradminiphone5.png)

### Testing with Protractor ###
Each user state (unauthenticated, admin, and (non-admin) user) has a corresponding conf-*.js file (conf-admin.js and conf-user.js) that signs the user in to the proper state and prepares for testing. 

###### run protractor conf-unauthenticated.js ######
##### Unauthenticated user tests #####
* should see sign-in landing page
* should not see pages of other states
* attempts to access other pages via URL are redirected
* open contact modal
* send email using Outlook
* invalid login (manually; not tested with protractor)

###### run protractor conf-admin.js ######
##### Admin user tests #####
* should see admin landing
* should not see pages of other states
* buttons function correctly (patient portal/create user modal/user portal)
 * should go to patient portal
 * should open modal and create an admin and non-admin users
 * should go to user portal
* should be able to change admin state of another user
* test sign out (manually; not tested with protractor)
* open contact modal
* send mail through Outlook
##### Disease tests #####
* URL should match disease database id
 * adding/deleting/editing should work; reflect changes in database
* search filter should filter disease by name
* should be able to create new disease
* should be able to edit disease information
* verifies that the edit is present in the disease view
* tests deletion of disease
* verifies that the disease that was created is no longer in the list view

###### run protractor conf-user.js ######
##### (Non-admin) user tests #####
* should see Patient Portal
* should not see pages of other states
* test sign out (manually; not tested with protractor)
* open contact modal
* send mail through Outlook
##### Patient tests #####
* should have input box that filters by last name
* patient portal should display information of the patients
* adding/deleting/updating should work; reflect changes in database

## Credits ##
The Health Risk Assessment web application was made using
* [MEAN.JS](https://github.com/meanjs/mean)
* [Bootstrap](http://getbootstrap.com/)
* [Google Fonts](https://www.google.com/fonts)

## Run Health Risk Assessment Locally ##
1. Instructions for the set-up can be found at [Getting Started with the Mean Stack by Joshua Kegley](https://docs.google.com/document/d/1B7aqptx0jsWHLqm7W9BT1oKHYNCKkvwtjjUtsj6C-ks/edit).
2. Clone the repository [CEN3031-7B/HealthApp](https://github.com/CEN3031-7B/HealthApp)
3. In the command line, go to the directory
4. When in the correct directory, type
 1. npm install
 2. bower install
 3. bower update
 4. grunt
