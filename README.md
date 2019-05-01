# RAk3rman Profile
[![Build Status](https://travis-ci.org/RAK3RMAN/rak3rman-profile.svg?branch=master)](https://travis-ci.org/RAK3RMAN/rak3rman-profile)

The public webpage profile for Radison Akerman

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
