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
According to the provided wireframes, our welcome page basically have the same content with the prototype welcome page. This welcome page is more like a transition page which connect Login/Signup page with Edit/Add Habit page together. After users successful login to our web-app, they will come into this welcome page, which give users a welcome and let them to think about what kind of habit that they want to keep in track. Once users finish their brainstorming, and decide which specific habits that they want to track, then they only
need to click the "add a habit" button, this button will take them to the add habit page. We eliminate the plus sign on the button because we already have the content "add a habit". In order to make our web-app clean and simple, we remove the plus sign. We also reduce the size of button to make the entire interface more reasonable.


## Add a Habit & Edit a Habit Page: 
Based on the wireframe, add a habit and edit a habit page basically has the same element and layout. The main things in add page is a habit title, an icon to go with it, the weekly and daily frequency of the habit. We gave a default text to the input to give user an example of what goes to the title box, things like “Eat Healthy”, “Exercise 30 minutes” would be prefered to put in the box. 

For the icon selection, we understand that in a phone platform, a swipeable icon selection would be really a good way to pick the image, however, this is not intuitive from a desktop browser perspective. Therefore, I decided to only supply some frequent ones and let the user upload what they want to have. In the example, I have icon for sleep, eat and exercise. These are basically considered images that are commonly used. And the last add icon indicates that user can feel freely to
choose whatever they want to have as an icon. We added a simple hover effect to clearly notify the user which icons are they picking. And once they selected the icon, we put a blue border to give user feedback of what they have selected. 

For the frequency, we renamed it to two section “weekly frequency” to indicate on which dates the user would like to perform such activity and “daily frequency” to indicate how many times per day would he like to perform. Based on this information, our developer’s goals are to make sure we keep track how many days he kept doing it or how many days he missed. The sample layout didn’t provide options more than 3 times per day but we feel like there may be things one would like
to perform more than 3 times so we put a optional box where user can input any values.



##List of Tracked Habits Page:

We removed the 85% and the thumb-up icon aside it. The reason is that it is confusing to users what that 85% means: is that percentage out of the times you done for today, for total times, or for total number of days. If it stands for the latter two, we do not really have a goal for a habit because a habit is something the user normally want to keep going on instead of keep for a period and then just let it go. Also, we already have a progress bar compare with the best record as well as some text for it, so this duplication will only take space and may confuse users. As for the thumb-up icon aside the percentage, it makes this whole part very like social network; however, this wireframe does not seems to have social connect functionality, since others does not seems to be able to see the current user’s habits.

We also removed the thumb-down button, we believe that let people click to indicate that they have done a practice of the habit is reasonable. However, there is no need to let them to press the button to show that they did not do it. A more reasonable way is that when this current date passes but the user did not click the button, then it mean that the user skipped this habit for today.

We changed the button icon for buttons that had thumb-up icon originally to a check icon, because this icon is widely known as “like” in social network like Facebook. Here we actually use it to let users check if they have done the thing. So we just use a check sign instead so we can avoid confusing users.

We got rid of the swipe for desktop because it is not appropriate to have finger swipes for desktop. For mobile there are several reasons why we also removed the swipe action: first, swipe is not typical in mobile websites/web apps, although it is common in native mobile apps; second, it is actually not very intuitive since there is totally no indication for that (we cannot assume every user knows to swipe); the fact that the check button mentioned above is already there instead of hidden in swipe, this will let a lot of people assume it to be the only action they can have; lastly, swipe out and choose actually requires 2 actions for users while a button will only need one.

As mentioned above that we keep only 3 buttons there, and we make it into a group with different icon and color with green and check icon for done, yellow and pencil icon for edit, and red trash bin icon for delete. We made it this way because this color arrangement actually tells users how dangerous an action can be, and the icons makes it very understandable for users since it follows the convention for icon meanings. Just in case (i.e. for users who are not familiar with the web or apps), we added name attribute for those icons so that a tooltip will show up if the user really don’t understand the icons.

We also changed the text by explicitly say whether the number stands for number of days or number of times. This makes the app much easier to understand in the case that the habit should be done several times a day.

We make the habit list into a list of cards rather than the big block with horizontal lines separating things this will make it much easier for users to differentiate different habits. Especially in the fact that environment light and different device types and settings will make a horizontal line very different in visibility. 

We added a heading for this page and explicitly tell users that this page is a list of habits they put into the system to keep track of so that new users will understand what this page is for. Especially when our list of habits likes more like cards rather than lists.

We also created the fixed "add" button so it will always be at a consistant place users can always easily add habit without scrolling up and down to user it or looking for it everywhere.


### Version
0.3.0

### Source Files

This Project has these 5 main html files:

* _welcome.html_ - welcome page
* _login.html_ - user login page
* _add.html_- page for adding a habbit
* _edit.html_ - page for editing a habit
* _list.html_ - page to show the list of existing habits

(All the CSS and JavaScript file has corresponding name to the html. add.html & edit.html use both the forms.html)
