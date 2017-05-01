# nodetsam
A pure JavaScript federated networking client/instance framework.

## Requirements

The client and instance code both use [yarn](https://yarnpkg.com/docs/install/) to manage
modules.

For both reference client and instance dev
[loopback-cli](https://loopback.io/doc/en/lb3/Command-line-tools.html) may be helpful

    npm install -g loopback-cli

## Client Implementations

Both a plain [Vue](client/reference) and [Quasar](client/quasar) implementation of a
client are provided.

## Running

First, from the project root

    yarn install

Make sure you went to `client/reference` and ran

    yarn install

To start a dev server and launch a dev reference client in a browser

    npm run dev

If you first [build](client/reference#building) the client, you can go back to the project
root

    npm start

Point your browser at `http://localhost:3001` which is served by the LoopBack instance.
This is useful if you don't plan to do any work on the client side. Note: if you update
anything in the `common` folder, such as the data model or translations, you will need to
rebuild the client.

To default to the quasar client when loading `http://localhost:3001` edit the files
section of `server/middleware.json` so it looks like

    "files": {
      "loopback#static": {
        "params": "$!../client/quasar/dist"
      }
    },

Make sure you [build](client/quasar#building) the Quasar client first.
