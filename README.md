## simple-kmz

**simple-kmz** is a raw HTML, CSS, and JavaScript version of [webmap-kmz](https://github.com/ciatph/webmap-kmz) (which uses webpack). This version uses gulp + browser-sync for live reload and does not bundle the static files for output.

This project uses CORS-enabled Firebase Hosting to host KMZ and other static files. Every successful deployment thru GitHub Actions or using the firebase cli applies the CORS settings defined in the [`firebase.json`](/firebase.json) file to the defined Firebase Hosting project and website target.

This repository also serves as an entry point for uploading KMZ files to Firebase Hosting. Read the instructions in the [Uploading Data to Firebase Hosting](#uploading-data-to-firebase-hosting) section for more information on uploading data.

- [simple-kmz](#simple-kmz)
  - [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Installation Using Docker](#installation-using-docker)
  - [Docker Dependencies](#docker-dependencies)
  - [Docker for Localhost Development](#docker-for-localhost-development)
- [Uploading Data to Firebase Hosting](#uploading-data-to-firebase-hosting)
- [Using the Uploaded Data](#using-the-uploaded-data)

### Dependencies

The following dependecies are used for this project. Feel free to experiment using other dependencies and versions.

1. Windows 64-bit OS
2. nvm version 1.1.9 (for Windows)
3. NodeJS 18.14.2 installed using nvm
   - node v18.14.2
   - npm v9.5.0
4. yarn v1.22.19
   - installed using NodeJS
5. NodeJS modules (installed using yarn)
   - gulp v.4.0.2
   - browser-sync v.2.27.12

## Installation

We can install and use the app by installing its dependencies manually, on a development machine, or by running its [Docker container](#installation-using-docker).

1. Clone this repository.<br>
`(https://github.com/ciatph/simple-kmz.git`

2. Set up the environment variables. Create a `.env` file inside the root project directory with reference to the `.env.example` file.

   | Variable       | Description                                                                                                                                                                                                                                                                             |
   | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | FIREBASE_TOKEN | Firebase CI token to use for deploying to Firebase Hosting using the [Firebase CLI](https://firebase.google.com/docs/cli).<br>Retrieve it's value by running `firebase login:ci`<br> **NOTE:** You may use the default value if you don't plan to deploy the website from Firebase CLI. |

3. Install dependencies.<br>
   ```
   cd app
   yarn install
   ```

## Usage

1. Run the localhost static website development environment.<br>
   - `npm run dev` or
   - ```
     cd yarn
     yarn dev
     ```

2. Edit the existing static files int the `"/app/public"` directory and wait for live reload. Your updates will reflect on the web browser.

3. View the development website on:<br>
`http://localhost:3000`

4. View the current map zoom level and map coordinates on mouseclick on:<br>
`http://localhost:3000/log.html`

## Installation Using Docker

We can optionally use Docker to run a dockerized client app for local development. The following methods require a correctly installed setup of Docker and Docker compose on your development machine.

### Docker Dependencies

The following dependencies are used to build and run the image. Please feel feel free to use other OS and versions as needed.

1. Ubuntu 22.04.1
2. Docker version 23.0.1, build a5eeb1
3. Docker Compose v2.16.0

### Docker for Localhost Development

1. Set up the environment variables for the **/app** directory like mentioned in the (manual) [Installation](#installation), step no. 2.

2. Verify that port 3000 is free for use by the app container.

3. Stop current-running my-phonebook containers, if any.<br>
`docker compose -f docker-compose.app.yml down`

4. Stop and delete all docker instances for a fresh start.<br>
   - > **NOTE:** Running this script will delete all docker images, containers, volumes, and networks. Run this script if you feel like everything is piling but do not proceed if you have important work on other running Docker containers.
   - ```
      sudo chmod u+x scripts/docker-cleanup.sh
      ./scripts/docker-cleanup.sh
      # Answer all proceeding prompts
      ```

5. Edit any of the files under `"/app/public"` after running step no. 2.
   ```
   # 1. Build the app container for localhost development.
   docker compose -f docker-compose.app.yml build

   # 2. Create and start the development app containers
   docker compose -f docker-compose.app.yml up

   # 3. Stop and remove the development containers, networks, images and volumes
   docker compose -f docker-compose.app.yml down
   ```

## Uploading Data to Firebase Hosting

New updates to the `dev` directory will trigger the repository's GitHub Actions workflow for deploying to Firebase Hosting.

> **NOTE:** You must have Collaborator access to the repository to push new updates. You can also clone this repository and link GitHub Actions to your own Firebase Hosting project for deployment.

1. Add new files or edit existing HTML, CSS, and data files in the `"/app/public"` directory.<br>
2. Push new updates to the repository using either of the following methods (no. 3 and no. 4).
3. Option 1: Using Git bash.
   - Use git bash to commit and push new updates directly to the `dev` branch.
4. Option 2: Using GitHub's Upload Files Feature
   - ![upload-files](/app/public/assets/images/add-file.png)
   - Navigate to the repository's `"/app/public/data"` directory using a web browser.<br>
https://github.com/ciatph/simple-kmz/tree/cluster-points/app/public/data
   - Press the **Add file** button on the upper right.
      - Select the **Create new file** option to create new non-binary files.
      - Select the **Upload Files** option to enable selecting local files for uploading..
5. Go to the repository's [GitHub Actions](https://github.com/ciatph/simple-kmz/actions) page and click the latest running workflow triggered by your update.
   - This workflow pushes new updates from the `dev` branch to Firebase Hosting.
   - Wait for the workflow to finish running and observe if it will succeed or fail.
6. Wait for the workflow to finish running and observe if it will end with success or failure.
   - New files should be available on https://kmz-server.web.app/data/<my_new_data>.kmz (or any other file) if the workflow finishes with success.

## Using the Uploaded Data

1. Open the `"/app/public/template.html"`, a clustered LeafletJS example with a text editor.
2. Go to line no. 47. Replace the value of `KMZ_DOWNLOAD_URL` with any of the new file URLs uploaded using the steps in [Uploading Data to Firebase Hosting](#uploading-data-to-firebase-hosting).
   - ![line47](/app/public/assets/images/line47.PNG)
3. Copy `"/app/public/template.html"`'s contents where you'd like to display the web map.

@ciatph<br>
20220225
