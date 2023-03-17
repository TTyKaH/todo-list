# todo list

<!-- Написать гайд для первого разворачивания проекта и гайд - для последующих запусков -->

<!-- Project has web and api parts with DB on postgresql. -->

<!-- Before starting - install dependencies for web and api parts. -->
<!-- split terminal and enter next commands -->

cd web
npm install

<!-- then in second terminal -->

cd api/src
npm install

<!-- For running front part after install packages: -->

cd web
nvm use 19.4
npm run dev

<!-- For running api part after install packages: -->

cd api/src
node server

<!-- DB part -->
<!-- DB starting -->

sudo service postgresql start

<!-- versioning -->
<!-- Node v 19.4 -->
