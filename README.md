# CSE 134B Homework 3  
_Developed by Team XYZ_
## Overview:
According to our interpretation of the wireframes, the application’s main functionality is helping people develop good habits. They can add and edit habits, such as frequency, a picture representation of the habit, and the name/description of the habit. Once they have added some good habits to develop, the habits they’ve added will be recorded and show up in the Habit List page. In the Habit List page, the user can indicate whether they have performed their habit, and the app can then
keep track of the user’s progress in developing the habit.
Here are the different pages that make up the web app: Login/Sign Up page, Landing page, Edit a Habit page, Add a Habit page, and Habit List page. 
### The flow of the app is as follows: 
User logins in or signs up through login page Logging in will take them to the Landing page. Once they click the add habit button, they will be taken to the add habit page. Once they click the add habit page, they will be taken to the habit list page. From there, they can either click “done”, which means they performed the habit, edit, which takes them to the Edit a Habit page, or delete, which deletes the habit.

For the overall design, we focused on a mobile-first design by creating a mobile-optimized version first and then making sure that the pages looked good and were functional on tablet and laptop/PC sized screens. Our page elements are in the center of the page, in order to focus user attention and to make it easier for them to use the app. Furthermore, keeping all the user-interaction elements in one place reduces the distance the user has to cross to reach each element, whether by
mouse or by finger, making the app easier to use.

## Login/Sign up page:
Since there was no wireframe for a login screen, we designed and implemented a login screen according to what we thought would be useful for the users and consistent with the theme and functionality of the app. It is a simple login screen which focuses the user on the app name and the form to either register or login. The login screen has a minimalistic look in order to make it as easy as possible for the user to login and direct the user to the form, instead of potentially
distracting the user from logging in or signing up.
To sign up, the user types in the email name and password, and then clicks sign up. Because currently the UI mockup does not have a backend or focus too much on actual functionality, the current login mockup will assume the user has signed up successfully as long as the "Sign Up" button is clicked in order to demonstrate the flow of the app. Once the user has "signed up", then they can enter in their email and password and click "Login" to be taken to the app's landing page.

## Welcome Page:



## Add a Habit & Edit a Habit Page: 
Based on the wireframe, add a habit and edit a habit page basically has the same element and layout. The main things in add page is a habit title, an icon to go with it, the weekly and daily frequency of the habit. We gave a default text to the input to give user an example of what goes to the title box, things like “Eat Healthy”, “Exercise 30 minutes” would be prefered to put in the box. 

For the icon selection, we understand that in a phone platform, a swipeable icon selection would be really a good way to pick the image, however, this is not intuitive from a desktop browser perspective. Therefore, I decided to only supply some frequent ones and let the user upload what they want to have. In the example, I have icon for sleep, eat and exercise. These are basically considered images that are commonly used. And the last add icon indicates that user can feel freely to
choose whatever they want to have as an icon. We added a simple hover effect to clearly notify the user which icons are they picking. And once they selected the icon, we put a blue border to give user feedback of what they have selected. 

For the frequency, we renamed it to two section “weekly frequency” to indicate on which dates the user would like to perform such activity and “daily frequency” to indicate how many times per day would he like to perform. Based on this information, our developer’s goals are to make sure we keep track how many days he kept doing it or how many days he missed. The sample layout didn’t provide options more than 3 times per day but we feel like there may be things one would like
to perform more than 3 times so we put a optional box where user can input any values.

### Version
0.3.0

### Source Files

This Project has these 5 main html files:

* _welcome.html_ - welcome page
* _login.html_ - user login page
* _add.html_- a super fast port of Markdown to JavaScript
* _edit.html_ - great UI boilerplate for modern web apps
* _list.html_ - evented I/O for the backend

(All the CSS and JavaScript file has corresponding name to the html. add.html & edit.html use both the forms.html)
