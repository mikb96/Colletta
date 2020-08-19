# Colletta project - OttoBit team

Team members:
* Bergo Giovanni
* Bortone Michele
* Cosentino Benedetto
* Marcato Enrico
* Peagno Eleonora
* Peron Giovanni
* Pettenuzzo Gianmarco


Colletta is a web platform for resolution of grammar analysis exercises. It includes an automatic solver, implemented with Hunpos, an open source part-of-speech tagger, trained for detecting and tagging italian language.

## How to use our prototype
This project needs to be executed in local.
* Step 1 - Donwoload our project
  <br/>Download the branch that corresponds to your OS
  
* Step 2 - Install Node JS
  <br/>Download Node JS for your OS from https://nodejs.org/en/download/

* Step 3 -  Download all the needed libraries
  <br/>Go to the project's main directory and use these commands to downloads the libraries needed to execute the project:
  ```
  npm install --save firebase-admin
  ```
  ```
  npm install express --save
  ```
  ```
  npm install shelljs
  ```

* Step 4 -  Run the project local server
  <br/>Open the terminal at the project's main directory and use this command to run the project local server
  ```
  node index.js
  ```
* Step 5 -  Use coletta's prototype!
  <br/>Open your browser and go to http://localhost:8080/insert
