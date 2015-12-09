# Health App (CEN3031 7-B Project)

This health app is a MEAN.JS-based application that allows a healthcare professional to interview patients based on a series of questions in the form of a survey. The survey then stores the information in the form of a results page that indicates the patient's health risk, determined by standard health risks. For example, a patient would be at risk for diabetes if they were of a certain age or weight and if they did not exercise regularly. 

There are two levels of authentication: User and administrator. A user is only able to create new patients, conduct surveys, and view stored results pages for the patients that they created. An administrator is able to create new patients or users, manage users, conduct surveys, and view stored results pages for the patients that they created. A user is not capable of accessing administrator-only pages (those related to user creation and management) or patients that are not their own.

Patients in the list can be identified by both first and last name and, in the case of patients with the same name, their date of birth. A dynamic search bar immediately begins filtering patients as the user types. For example, if the user types "J" in the search bar, only users whose names contain a "J" would show up.

There is also a contact us feature so that, if the user encounters an problem or has a question, they can inform the master administrator (our client) and resolve the issue quickly.

The app is hosted externally using the Heroku platform and has been throughly tested using the Protractor framework. 
