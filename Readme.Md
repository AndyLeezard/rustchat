# What does it do?

- Locally test my **Rust** webserver's **chat API** and **realtime eventstream feature**.
- Separate chat rooms implemented.

# Dependencies

- [My Rust Server](https://github.com/AndyLeezard/bmb_rs_server)

# How to test

- Clone and run the webserver in the background
- Open two separate browsers. Test features. Voilà.

# Notice

- The `<body id="root">` was done on purpose as it is a project for testing purposes.
- Normally a React project should have `<div id="root"></div>` nested inside the body tag.

# Migrated

- From [vanilla JS](https://github.com/SergioBenitez/Rocket/tree/master/examples/chat/static) to React using Vite, SWC and typescript.
