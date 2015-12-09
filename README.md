# Health App (CEN3031 7-B Project) #

## About ##
This health app is a MEAN.JS-based application that allows a healthcare professional to interview patients based on a series of questions in the form of a survey. The survey then stores the information in the form of a results page that indicates the patient's health risk, determined by standard health risks. For example, a patient would be at risk for diabetes if they were of a certain age or weight and if they did not exercise regularly. 

### User States and Privileges ###
There are three levels of authentication: Un-authenticated user, authenticated user (conf-user.js), and administrator (conf-admin.js). An un-authenticated user is only able to see the landing page and cannot access any other pages or states. An authenticated user is only able to create new patients, conduct surveys, and view stored results pages for the patients that they created (this last is referred to as the patient portal). An administrator is able to view the admin landing page which allows for the creation and management of new patients and new users. Additionally, an admin can access all pages that an authenticated user can access;  they can conduct surveys and view stored results pages for the patients that they created. A user is not capable of accessing administrator-only pages (those related to user creation and management). Neither admins nor users are able to access information about patients that are not their own.

### Patient Portal ###
Patients in the list can be identified by both first and last name and, in the case of patients with the same name, their date of birth. A dynamic search bar immediately begins filtering patients as the user types. For example, if the user types "J" in the search bar, only users whose last names contain a "J" would show up.

### Contact ###
There is also a contact us feature so that, if the user encounters an problem or has a question, they can inform the master administrator (our client) and resolve the issue quickly.

### Deployment ###
The app is hosted externally using the Heroku platform and has been tested using the Protractor framework. 

### Testing with Protractor ###
The three states for users of the app are unauthenticated, admin, and (non-admin) user. They each have a corresponding conf-*.js file (conf-admin.js and conf-user.js sign in the user to the proper state and prepare for testing). 
* #### Unauthenticated users ####
 *should see sign-in landing page
 *should not see pages of other states
 *attempts to access other pages via URL are redirected
 *open contact modal
 *send email using Outlook
 *invalid login (not tested with protractor)
* #### Admin users ####
 * should see admin landing
 * should not see pages of other states
 * buttons function correctly (patient portal/create user modal/user portal)
 * should be able to change admin state of another user (not tested with protractor)
 * test sign out (not tested with protractor)
 * open contact modal
 * send mail through Outlook
* #### (Non-admin) users ####
 * should see Patient Portal
 * should not see pages of other states
 * test sign out (not tested with protractor)
 * open contact modal
 * send mail through Outlook
* #### Patient Portal ####
 * should have input box that filters by last name
 * PATIENT PAGE SHOULD DISPLAY INFORMATION (does not currently work 12/09/15)
 * Adding/deleting/updating should work; reflect changes in database
 * Add/remove condition
* #### Diseases ####
 * URL should match disease database id
  * Adding/deleting/editing should work; reflect changes in database
 *Search filter
