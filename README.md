# This branch: PHP/SQL/REACT version of the w9ccu.org rewrite

This was the start of my php backend rewrite of the node rewrite version of the w9ccu.org website. There are several bugs in this version and not everything is connected and working.

## Setup and View

- Clone this branch down
- Have Php installed on your device. And a server available to run the php code.
- Set up a postgres database with the name of "WCRA_test"
- seed database by running: php Seeding/seedingScript.php
- Install needed packages for the frontend: npn install
- Then make sure your server is running and navigate to where the index page is hosted to view. - site may be bugging and not display becuase I never finished rewritting/connecting all my API calls.

## There are tests writting for the front end. (React/Redux)

Tests were copied over from the Node version and my not be passing any more
