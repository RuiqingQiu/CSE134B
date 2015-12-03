# CSE 134B Homework 5
_Developed by Team XYZ_
## Overview:
For homework 5, we provides a complete finished version of our vice & virtue application in optimal delivery state as well as applications in many platforms.
From the last assignment, we already have authentication and cloud storage using Parse. To track usage and error, we use Parse's analytics service to keep track of usage and Rollbar to keep track of any uncaught errors.
Our project in the build folder is minified and bundled version. We also have image spriting supported.
We have packaged our application for distributions in both Android and iOS for mobile platforms. For desktop platforms, we have included Chrome extension, Mac OS X application and Windows 10 application.

## Finished Application:
Most of the things we have already finished in homework 4.

## Usage Monitoring:
We are using Parse Analytics to monitor usage of the app. It was the best option since we are already using Parse for the backend so it keeps everything centralized and easy to use. Currently, we have set up analytics for when a habit is added and edited, and when a user completes one of their habits.
Here’s a graph from the Parse dashboard that shows the usage metrics:
![Usage Monitoring](https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/usage.png)
Blue represents the number of times users have edited a habit, orange shows the number of times users have completed a habit, and green represents the number of times users have added a habit.:

## Error Monitor:
We used rollbar to do our error monitoring. Each page has included codes to catch any uncaught exception and report back to rollbar. Currently, we didn’t have any good way to test it besides manually generate a uncaught error in the console since most of our errors are handled right now. Here’s a page on the rollbar website that the errors are recorded.
![Error Monitoring](https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/error.png)
Since we have handled most of the errors, these are errors that raised by make this function call in the javascript console:
   ```
   window.onerror("TestRollbarError: testing window.onerror", window.location.href)
   ```
We have tested both raygun and rollbar. There are not many differences and we choose rollbar since it’s easy to use and the monitoring is free to use, whereas raygun only offers a 30-day trial.

## Bundling/Minification:
All HTML, JS, and CSS files are minified. The library files in the "lib" directory are minified, and all the production files, which are in the "build" directory, are minified as well. For bundling, the Javascript libraries were bundled as much as possible. Due to some dependencies, not all Javascript library files were able to be bundled, but we bundled as many files as possible. The bundled library Javascript file is "vendor.js". For CSS, since each page has its own CSS file and used common tags such as "body" and "html", bundling the CSS for each page into one file caused funtionality errors, so we did not bundle the CSS. As for bundling the Javascript files (not library files) for each page, that would also cause functionality errors since each Javascript file has a $(document).ready() function. If given enough time, we could perhaps refactor the code, but due to the time constraints, we bundled as many files as we could.

## Chrome extension/browser app:
To install the app as a Chrome extension, in a Chrome browser, go to “chrome://extensions”. On this page, check the “Developer mode” box at the top of the page. Then, simply click “Load unpacked extension” or drag and drop the app/project folder into the page. This will install the app as an extension. Once the extension is installed, you can click on the jigsaw icon in the window toolbar of the current tab to open the app as a Chrome extension. To ensure it’s the right icon, when the mouse hovers over the icon, it should say “Vice and Virtue”.
![Chrome 1](https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/Chrome1.png)
![Chrome 2](https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/Chrome2.png)

## Phone app for Android:
For PhoneGap usage, we have to download PhoneGap desktop version to create a temp server and host our project in this server, then we need to download PhoneGap mobile version for our mobile device to enter the temp server ip address. Then we can run our web app in any mobile device. Also we used PhoneGap Cloud Build trying to package our file to an .apk/.cpp file, but for iOS PhoneGap need a specific key. And for Android app, after I install the generated apk in my phone, the app allowed me to have internet access even though in the app description, this app have full access to internet. So, I changed to user Cocoon cloud compiler to generate install package for Android and iOS.
<img src="https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/phone0.png" alt="Phone Screen 1" width="324" height="588">
<img src="https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/phone1.png" alt="Phone Screen 2" width="324" height="588">
<img src="https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/phone2.png" alt="Phone Screen 3" width="324" height="588">
<img src="https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/phone3.png" alt="Phone Screen 4" width="324" height="588">
<img src="https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/phone4.png" alt="Phone Screen 5" width="324" height="588">
<img src="https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/phone5.png" alt="Phone Screen 6" width="324" height="588">

*(see download section at the end of this README file for download link)*

## Windows/OSX Desktop Apps
We were trying to use the winJS to make a Modern app, but it requires a lot of changes to our current web app source code. We shifted to use Electron, it does not require much change to the source code of the current app, and it is easy to support different desktop OS platforms, which let us build both the OSX version and Windows Version.

!(OSX Screen 1)[https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/osx_2.png]

!(OSX Screen 2)[https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/osx_1.png]

!(Windows Screen 1)[https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/win_2.png]

!(Windows Screen 2)[https://github.com/RuiqingQiu/CSE134B/blob/gh-pages/readme/win_1.png]

*(see download section at the end of this README file for download link)*

## Individual tasks:
Timothy:
Added login and signup functionality with Parse to login.html, login.css, and login.js. Added error checking for the forms for Edit a Habit and Add a Habit pages. Set up the project with Gulp to allow for real-time minification of all source Javascript, HTML, and CSS files for the project. Bundled Javascript files. Added sliding animation effect for habit entries in habit list page. Contributed to the README.md. Created Chrome extension/browser app for the app.

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

### Platform-Specific App Release Download Link
<https://github.com/RuiqingQiu/CSE134B/releases>