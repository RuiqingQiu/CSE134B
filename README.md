# CSE 134B Homework 4  
_Developed by Team XYZ_
## Overview:
Same as last time. The minified Javascript, HTML, and CSS files are in the “build” directory. These are the actual files that will go into production, along with the libraries in the “lib” directory. The source files that are actually worked on by developers are in the “src” directory and are not minified. Each file in “src” has its corresponding minified version in “build.”
Flow of app: Same as last time except the list page and also include navigation, logout and notification
Library used: Parse for backend, jQuery, handlebars, animate.css, cropbox.js, BootStrap UI widgets (customized by grabbing part of the library code we need)

## Login/Sign up page:
Login/Sign up page allows users to either register for or login to the app, using the Parse backend. If there is invalid input to the sign up or login page, there will be an error message. If the user tries to login, and the app can't find the corresponding username, or the password is incorrect, there will be an error.  If Javascript is disabled, the page will display an error message letting the user know Javascript is required for the app to function and that Javascript is currently turned off in the browser, and the login and signup buttons will not work. If the user tries to login with the incorrect username and password, there will be a HTTP request error in the console. This is a common bug in the Parse library, and I attempted to fix it in the source code, but it proved difficult to debug. The console bug does not affect the app functionality in any way and the user will almost never be looking at the console to actually use the app, so this error does not affect user interaction, usability, and other app functionality in any way. Also, using the login and signup functionality locally in Internet Explorer causes a SCRIPT5007 error in Parse. This is an IE error. However, using the Parse app hosted on the Parse server, there is no issue with login and signup in IE.

## Add a habit & Edit a habit:
The form and field are same as before. The add page will correctly detect any missing information. If everything is correct, that habit will be correctly inserted into our Parse database in order to be displayed in habit list. Habit page includes a image cropping tools for user to pick their own icons for the habit instead of using the default ones. Select the file by choosing the upload button and zoom in or out using +/- button. Once finished, save button will crop and save that image. If any fields are missing when they click add, there will be red text next to the field showing error message. Also, included a confirmation for save to confirm the addition of habit. Cancel will promote a cancel confirmation to prevent user misclick and make good usability. Image cropper is used to make sure all the habit icon are the same dimension for correctly-aligned display.
The same thing for the edit page where all the fields and images are firstly populated with the original values. The user will perform the same task as in add page to update the habit. 

## Welcome Page & Setting:
We add a navigation bar at the top of every page (except login page) which will help customer quickly transform between each pages and log out. For “logout”, we will popup a confirmation box to make sure users are truely want to logout, not click the button just by accident. After customer click logout again, we clear the user info in our database and then direct them to login page. For “Home”, we direct user back to welcome page. For “Setting”, we create a new Setting page that customer can change the setting for notification. If they turn off the notification enable, they won’t receive any notification in our app. For “notification sleep”, our plan is blocking any notification to be pushed between 10pm - 6am. Once customer turn this on, we will not get any notification in this specific time even if they turn on the notification enable. But we haven’t implemented this yet. 

## List of Tracked Habits Page:
This page is resdesigned from the original framework due to the confusion of a confirmation and a cancel button. Now replaced with checkmark and cross to clearly indiciate that the user has done such hahbit during the day or not. As moved edit and delete button to the top right corner for usability issue. In this way, the user will not misclick and accidentially delete the habit. All the danger operations have a confirmation box to make sure that's what the user want to do. Gray out the card for user who didn't do such activity that day. However, that's purely local for right now due to time constriant. Notification for this page is local as well with a timer that will loop and display them. We will finish up the list displaying the current day habits in homework 5.

## Notification:
For now, we can only support local notification in our app with two ways to call it. The first way is triggered by onclick method, once we click something, the notification will popup and display corresponding message. Another way is we call notification during the page is loading, and we can push some notification.  In our welcome page, once the customer is login, we will popup a welcome message to show customer’s username and give him a welcome.
Reason that we didn’t do the server side notification. 
we first do some research on Parse Javascript push notification, but it turn out didn’t work fine with either desktop/android/iOS. For android and iOS device, parse led us to look over android/iOS development which is not related with our web development with javascript. For desktop notification, parse led us to download Visual Studio and use Package Manager Console to install their SDK. But before this, we have to change our project to native app. However, we don’t think we need native app for this course. 
we also find a third party app: pushover which could help us to push notification to any device, but customer have to install pushover app to help them receive those notification that  we pushed, so this is not work with our project.
Then we followed one of Ta’s suggestion to look over Roost, but we found out the basic Roost notification, we already handle in our local notification, and all other advanced notification need to pay for monthly fee which we cannot afford. 
We finally simulates the notification to remind people to do habits and let them confirm whether they did on the notification as well. However, no project instruction tends to let us have a rule or a user setting to set time for notifications. Therefore, we instead made it notify every 10 seconds on the habit list page (list.html, it is hard to make the timer cross page as we don't have a backend for the timer) for every habit at the same time. Every notification disappear after 5 seconds.

## Individual tasks:
Timothy:
Added login and signup functionality with Parse to login.html, login.css, and login.js. Added error checking for the forms for Edit a Habit and Add a Habit pages. Set up the project with Gulp to allow for real-time minification of all source Javascript, HTML, and CSS files for the project. Added sliding animation effect for habit entries in habit list page. Contributed to the README.md.

Ruiqing:
Added create and edit functionality with Parse to add.html, edit.html, form.css, add.js, edit.js. Implemented all functionality such as Image cropper, error detection, UI focused javascript in the two pages. Create parse backend database format and structure. Communication between habit list and edit page. Redesigned the overall look of the app and buttons issues concerning about usability. 

Jingyuan:
Implemented most functionalities (CRUD on habits) on the habit list: create habit (outlink to add page), read list of habits from the list, update habit (click done button to change parameters of the habit), delete the habit from the database record. Added notification with relevant actions to habits.

Qing:
Added navigation bar to every pages (except login.html), Added logout functionality with Parse to all pages which have navigation bar. Added notification function to pages which need to push local notification. Added notification enable functionality to setting.html, setting.css, setting.js. Modified the functionality and style in welcome.html, welcome.css, welcome.js. Contributed to the README.md.


## Libraries;
Parse: We decided between Parse and Firebase because these two are the biggest backend-as-a-service companies, which suits our need for a purely client-side project. In the end, we chose Parse over Firebase because Parse, with its Android and iOS SDKs and REST API wrappers in multiple languages, has a larger ecosystem in case we wanted to expand the app to multiple platforms. Furthermore, Parse provides Cloud code and push notifications in case we wanted to use Parse as an option for push notifications.

jQuery: We chose jQuery because it is widely used as a standard Javascript library. It makes operations in Javascript a lot easier. Additionally, there are a lot of jQuery plugins that we could leverage for the project if the need arose. We looked into Prototype.js and other Javascript libraries, but none had the support, community, and number of plugins that jQuery has.

animate.css: animate.css is a very useful CSS animation library. It’s extremely easy to add CSS animations to HTML elements. We also chose this library over Javascript and canvas animations because CSS animations generally have better performance and involves less code, which makes the project easier to read, maintain, and less bloated.

Handlebars: handlebar.js is a lightweight frontend/js template engine. We need a frontend template engine because without any server-side template, there is barely any other way rather than use a front-end template to render a dynamic list of elements (habits, in this case) in a neat way of programming. Among all the different front-end templates, we choose Handlebars because: the library is not too large(less delay for downloading); there is no much learning curve (meaningful for project like this); it does not do complicated work (less delay for rendering); it tries to keep the original HTML DOM structure (no web component, etc.)

cropbox.js: a lightweight javascript plugin for cropping images. The image cropper is used so that whenever user upload a different dimension image, they will need to fit it into a square so that the display of the image in list habit will be in the same dimension. 

bootstrap-notify.js/css: This is very usefully and powerful customize library based on bootstrap. We choose this library to perform a better look notification with flexible locations and time and amazing animate effect in the way notifications are enter and exit. 

bootstrap-customized.js/css: we only used 3~4 different UI widgets from BootStrap, so there is no need to download the full library. Bootstrap allows us to customize to combine and download dependencies for those widgets and download as our own Bootstrap library. This speeds up pages loading a lot compared with downloading the whole bootstrap.

### Version
1.0.0

### Source Files

This Project has these 6 main html files:

* _welcome.html_ - welcome page
* _login.html_ - user login page
* _add.html_- page for adding a habbit
* _edit.html_ - page for editing a habit
* _list.html_ - page to show the list of existing habits
* _setting.html_ - page shows the setting for notification

(All the CSS and JavaScript file has corresponding name to the html. add.html & edit.html use both the forms.html)

Project Folder:
* _src_ folder contains all the source files for our project
* _build_ folder is all the files that are minified
* _lib_ contains all the library files










