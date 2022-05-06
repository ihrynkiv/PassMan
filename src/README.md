# PassMan - Password Manager, UI
## Setup

- Above all you should install all dependencies: `npm install`
- Then you should build the project: `npm run build`
- The next step: 
  - **Setup backend part (You could check README.md from BE part or just stay here)**
    - Please download [this repository](https://github.com/ihrynkiv/PassManBE) 
      - `git clone git@github.com:ihrynkiv/PassManBE.git`
    - You should have Docker (docker-compose), please install if you dont have.
    - Please switch work directory to **PassManBE** 
    - Install dependencies: `npm install`
    - Setup database (postgres):
      - Start database image in docker: `docker-compose up -d postgres`
      - Provide SQL migrations: `npm run migrate up`
    - Run node.js server: `npm run dev`
  - Open Chrome based browser (Google Chrome, Brave, Vivaldi etc.)
  - Go to [chrome://extensions](chrome://extensions)
  - Enable Developer Mode (Switch on Top-Right Side)
  - Click on the *Load Unpacked* button
  - Please select **build** folder from PassManFE
  - And now you are able to found PassMan in the list of your extensions