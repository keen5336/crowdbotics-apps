To start, run npm install and then npm run start.

things to note about this app.

large sections of the api are broken. and claim the csrftoken is missing or invalid.
not all calls are broken, I know the csrftoken is correct.

the api refuses to execute logout,
the api refuses to create apps,
without an app to create, display, update and delete fail.

just because the api has problems, doesn't mean the front end can't build most of the displays

I built mocks within the displays so they render correctly and still at least attempt to perform every action.

This app is limited in scope, and there are many features and optimizations that could and should be added before used in a production environment.
