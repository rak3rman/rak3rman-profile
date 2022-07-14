# Mark 1

The 1st iteration of Radison Akerman's personal website, built on Node.js and bare HTML/CSS

## Site Screenshots

Apologies, there seems to be an screenshot issue with the color gradient clipping on title sections. 

[Home Page PDF](https://github.com/rak3rman/mark1/files/9107228/mark1home.pdf)

[About Page PDF](https://github.com/rak3rman/mark1/files/9107229/mark1about.pdf)

[Projects Page PDF](https://github.com/rak3rman/mark1/files/9107227/mark1projects.pdf)

## Install and Setup
- Clone the repository from github.com
```
git clone https://github.com/RAK3RMAN/rak3rman-profile.git
```
- Setup Base WebFramework NodeJS
    - Enter the rak3rman-profile folder
        - `cd rak3rman-profile`
    - Install all required packages with root-level access (if needed)
        - `sudo npm install`    
    - Start default application using npm
        - `npm start`
    - If you want a different broadcast port, you can configure these values by proceeding with the:
        - Hardcode option:
            - Enter the `sysConfig.json` file
                - `sudo nano rak3rman-profile/config/sysConfig.json`
            - Edit the `console_port` parameter to your desired configuration
    - If any errors occur, please read the logs and attempt to resolve. If resolution cannot be achieved, post in the issues under this project. 
- Access web application through `localhost:3000`
