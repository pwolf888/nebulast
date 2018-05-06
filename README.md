# nebulast
A text based space survival rpg, cordova application

Jonathan Turnbull (214527872) pwolf888
Josh Pujol (216189236) 

# Compile Instructions
The app can be run on any web browser.

#iOS - Mac
Make sure you have cordova installed via npm

- sudo npm install -g cordova

Run command inside project

- cordova platform add ios

- cordova build ios

With xcode installed onto your mac you may
emulate it via the simulator

- cordova emulate ios

#Emulate on Device
Once project has been built for iOS 

Open the file in xcode: 

- Nebulast.xcworkspace

Plug in device and make sure your developer account is
signed to the app and your device trusts the app, 
click the RUN button.

#Android - Windows - Josh can field this one

cordova platform add android

Download and Install Node.JS

Set Enviornment Variables

- ensure JAVA_HOME is avalible in system variables

- if not avalible create new system variable JAVA_HOME

- variable value is set to jdk version 1.8 path

Run command to install cordova via npm

- type: npm install -g cordova

Open Cordova project in Android Studios

Install Phonegap/Cordova Plugin

Add new Run/Debug Configuration for Phonegap/Cordova

- Choose Emulate or Run depending on if you are using emulator or physical Android device.

Run the project to build to Android emulator or device.

#Directory 
All content for the app is found in the 

- nebulast/www

Inside holds the core files for the project

- index.html calls all the js and css to the screen

- nebulast/www/css

- nebulast/www/js

- nebulast/www/json


# Henry comments 13/April
- Very nice to see you testing data ideas. Do adapt/refactor as you find weaknesses. 
- E.g. shop data, instead of "dataType": ["food", "water"] and "buyPrice": [50,40], would it not be better to put each shop item in its own object?

# Henry comments 17/April
- Also, probably don't need to specify "img/..." in image urls in your JSON data, as all images will be in whatever image directory you choose (as that can be hardwired). Unless you plan to have more than one image/media directory, in which case it's fine. Just a thought.

# Henry's Comments 27/April
- looking good. Changelog especially looking good.
- compile instructions + directory explanation still missing in this file :)

