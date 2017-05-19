## Developer Job Search Dashboard 

This project aims to improve the user experience of searching for a Developer role in Ireland. The output is a data dashboard
 that allows the user to tailor their job search by filtering job posts by the following questions:
1.	Where do I want to work?
2.	What type of job am I looking for?
3.	What level of experience do I have?
4.	Which industry am I interested in working in?
5.	Which company do I want to work for?
6.	What are my top ten hits based on the 5 questions I have asked to date? (The output here is a table with links to your 
relevant job posts)

The raw data for this dashboard has been sourced from Indeed.com API. Regex queries were used to cleanse and enhance the data 
(i.e. additional data attributes were created to form the basis of certain filters). Sample regex queries used can be found in 
the projectdocumentation folder.

## Demo

A demo of this site is available [here](https://nmc17-devjob-dashboard.herokuapp.com/).

## Getting started / Deployment

* If you wish to deploy this app locally, please clone or download this repo and use the following guidelines:

### Python
You must have Python 2.7 installed on your system. Download the correct version for your operating system and follow the installation instructions.
requirements.txt
Create and activate a local virtual environment and pip install -r requirements.txt

### Local Server
Run your app using the following commands in command line:
$ export FLASK_APP=IndeedAPI.py
$ flask run
Navigate to http://localhost:5000/ to view your app locally

***N.B.: Please note that running this app locally (without connecting to a database) will result in empty chart containers. To connect to your own database, you will need to update the database configurations in the IndeedAPI.py file. 
- See line 9 to 14 to configure to a local database.
- See line 16 to 20 to configure to a database hosted by Heroku mLab MongoDB.


### Deploy to heroku
To deploy this app in a live environment, use the following guidelines:

1. Create a new heroku app and make a note of the domain name for your site
2. If you haven't done so already (by pip install -r requirements.txt), install the gunicorn package in the project
3. Go to the command line and type in: pip freeze > requirements.txt
4. Create a Procfile, containing the words web: gunicorn ***:app
5. Replace *** with the name of your app, for this example the app name is IndeedAPI
6. Git commit and push to your Github repo
7. Link your heroku app to your Github repo: git remote add heroku <git-url-for-your-app>
8. Go to add-ons within your heroku app, create your mLab add on. Follow mLab instructions to connect to your db.
9. Reconfigure your db connection in the IndeedAPI file to match the mLab
10. Commit your changes to Github, go to Heroku and run your app


## Hosting

This app is hosted by Heroku – a container-based cloud Platform as a Service (PaaS) that allows you to deploy, manage, 
and scale apps. Heroku sources code from this Github repo and the data is sourced and hosted from an add-on called mLab MongoDB. 
The Procfile declares the first command to be run to start the app: web: gunicorn IndeedAPI:app.

## Built With

* D3.js: A JavaScript based visualization engine, which will render interactive charts and graphs based on the data.
* Dc.js: A JavaScript based wrapper library for D3.js, which makes plotting the charts a lot easier.
* Crossfilter.js: A JavaScript based data manipulation library that enables two way data binding.
* Queue.js: An asynchronous helper library for JavaScript.
* Intro.js: A helper library that allows you to easily create tool-tips to train or show the user how to use this dashboard
* MongoDB/ mLab MongoDB: NoSQL Database used to convert and present our data in JSON format.
* Flask: A Python based  micro – framework  used to serve our data from the server to our web based interface
* HTML, CSS and JavaScript: Front end languages that give the application structure, style and interactivity

## UX Design

Details of the UX design and research process undertaken as part of this project is available in the 
projectdocumentation folder. This document outlines how I approached the design of this site through the 
5 layers (strategy, scope, structure, skeleton and surface) and describes 
my ideas for further development of this site (beyond the scope of this site as a Stream 3 project).

## Testing

Manual testing was undertaken for this application and satisfactorily passed. A sample of the tests conducted are as follows:
1.	Testing the responsiveness of the application (on desktop and mobile applications). **N.B.:** Whilst the dashboard 
containers are responsive, the charts are not fully responsive due to limitations of dc.js
2.	Validating the data represented in the charts
3.	Testing cross-filtering functionality
3.	Validating the tooltips work
4.	Validating buttons (e.g. reset filters) work


## Authors

**Nakita McCool** - This project was completed as part of Code Institute’s Web Development bootcamp in May 2017.

## Acknowledgments

* Template by [Bootstrap](https://startbootstrap.com/)
* Data sourced from [Indeed](https://www.indeed.com/publisher)
* Loading bar by [Pace](http://github.hubspot.com/pace/docs/welcome/)


