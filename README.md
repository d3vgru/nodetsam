# nodetsam
A pure JavaScript federated networking client/instance framework.

## Requirements

The client and instance code both use [yarn](https://yarnpkg.com/docs/install/) to manage
modules. Running a dev instance of the reference client requires `babel-cli`

    npm install -g babel-cli

For both reference client and instance dev `loopback-cli` may be helpful

    npm install -g loopback-cli

If you're working with the quasar client, you'll need `quasar-cli`

    npm install -g quasar-cli

## Running

First, from the project root

    yarn install

Then go into `client/reference`

    yarn install

To run the client without the server

    npm run dev

To start a dev server and launch a dev reference client in a window go to the project root

    npm run dev

To start the quasar client, first go to `client\quasar`

    yarn install

then

    quasar dev

## Building

To build the client in `client/reference/dist` just go to `client/reference` and

    npm run build

If you build the client, you can go back to the project root and

    npm start
    
Point your browser at `http://localhost:3001` which is served by the LoopBack instance.
This is useful if you don't plan to do any work on the client side. Note: if you update
anything in the `common` folder, such as the data model, you will need to rebuild the
client.

To build the quasar client in `client/quasar/build` go to `client/quasar` and

    quasar build

To default to the built quasar client when loading `http://localhost:3001` edit the files
section of `server/middleware.json` so it looks like

    "files": {
      "loopback#static": {
        "params": "$!../client/quasar/dist"
      }
    },

## Overview (TODO: refactor)

Make the instance as permissive as the admins would like.

Make the client as restrictive as the people would like.

The idea is to have a very lightweight instance and a pretty thick client.
Both should be compatible with Mastodon and GNU social.

It should be (relatively) easy to point the client to a compatible instance.
The client will have a standard React reference implementation without P2P functionality.

It should be (slightly less easy) to replace the back-end of a compatible instance while
leaving their front-end intact.
The instance will have a standard reference implementation based on LoopBack.
P2P functionality will be configurable. Even if turned on, it should not break
"standards-compliant" clients.

Functionality should be modular enough that client and instance both have a top-level
class that can be overridden, replacing its hierarchy of internal components as needed.

Clients should be themable (whatever that means).

Federation should be implemented by converters that map the native data structure to what
a particular target (GNU social, Mastodon, postActiv, etc) is expecting.

## Authentication
* client posts have to be processed by instance (including replies, stars, boosts)

## High-level (global)
* front and back end should be totally independent

  - instances will conform to standards, adding additional info safely
  
  - client should be able to connect to any instance that conforms to standards
  
  - standards in question are: OStatus, ActivityPub

* Babel for ES2016+ support

## High-level (back-end / instance)
* strict implementation of OStatus standards
* should be very light weight (LoopBack API)
* define requirements of instance to support standard client
* instance would maintain DHT node list to seed newly started clients
* every hour, snapshot of public feed published along with hash(es)

  - hash and metadata can be used by clients to sync feeds with each other

  - signing can be used to store mutable data (<1k) if needed

  - federated feeds would be maintained same way

  - need way to tell other instances if a particular item is intentionally not synced

* private posts handled directly with instance

  - p2p mode enables more secure DMs

## High-level (front-end / client)
* HTML5 app

  - local storage

  - responsive JS view framework (Vue + Vuex + Quasar + Webpack)
   https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577fcvxzjvbuj

  - async/promises

* compatible with "OStatus" (bridges to protocols) (bridges to transport? e.g. XMPP)

  - specifically Mastodon and GS (bridges to networks)

  - main differences are probably content of payload, not so much transport & metadata

  - if OStatus services are listed under .well-known, client should be able to roll with it

  - possible HumHub, Friendica, and/or Diaspora* support at some point

  - can we separate OStatus interface from "social network" abstraction?

* reference implementation of a sort of spec for FOSS social network front ends

* front-end shouldn't care about back-end tech because of .well-known discovery

* admins should be able to drop client code into instances of supported networks

* devs should be able to bundle client code in native JS or mobile apps, web sites, etc

* can we abstract out the JS so if we start with say React we can change later

  - get something minminal that works

  - while it is still minimal, build abstraction layers to ease swapping out libs later

## Front-end variants

* at least two major flavors

  - reference: thin client, instance does heavy lifting

  - meshtodon: offload as much instance work as possible in p2pmode

* how much integration is possible with things like network type, battery level?

  - should degrade gracefully away from p2p mode if on battery, mobile device, etc

* should have way to force one mode or the other

* should be able to dynamically change operating mode while running

* admins and devs should be able to easily bundle "standard-only" client in other apps

* what's already out there in terms of activitystrea.ms?

* nodejs (almost complete?) OStatus lib: https://github.com/eschnou/node-ostatus

## Compatibility

Client should be able to connect in native (ActivityPub), OStatus-compliant, GNU social,
and Mastodon modes

Instance should be able to provide API for clients from GNU social, Mastodon, and
postActiv

Storage should be able to use native (ActivityPub), GNU social, or Mastodon schema

## P2P mode

* need to identify what instance functions can be offloaded

  - define minimum requirements of an instance that only supports p2p clients

* instances add alternate endpoints for...

  - link[rel="hub"]: browser can act as hub?

  - link[rel="salmon"]: browser can act as endpoint?

* if instance acts as proxy, is that helpful or just more overhead?

  - in other words, what actual work would the client be doing?

* how would OStatus need to be extended to make p2p mode (actually? even more?) useful?

  - need to include hashes in Atom feeds

  - clients can fetch feed chunks and individual posts and then share on DHT

  - need to be able to sync client to its instance, both directions (pull already impl)

  - clients should be able to handle salmon between similar clients on same DHT

* admins should be able to set up "satellite" p2p support nodes with minimum functionality

* need to balance e.g. low ttls of hub subscriptions etc v. increased overhead

* timer where client starts in standard mode and only enables p2p if running for min time?

* client will have different but well-known urls to pull _just_ hash and other metadata

  - e.g. https://anti.energy/@user/hash.atom

* DHT formed by clients connected to a given instance

  - how about between instances?

* nodejs DHT lib: https://github.com/feross/bittorrent-dht

  - probably need to extend it to prioritize certain peers one way or the other

* how do we handle streaming?

  - would it help for an instance to publish update announce at signed hash?

  - can clients help stream to each other?

## Direct messaging
* enables e2e encryption, allowing more secure "DMs" than currently available

  - DMs should not degrade, so user should be able to disable to save battery/bandwidth

  - DMs on/off should be a setting for "standard" mode

  - should be able to enable/disable DMs dynamically

## Block lists
* currently instance maintains block/mute list

  - sync with client

  - process on client side for posts pulled in from DHT

## Groups
* ability to feel like member of a group is a big draw

  - define group membership in human terms

  - define group membership programmatically

  - fight to ensure groups have functions needed to achieve and maintain freedom

## Client P2P Operations

### init
* load other DHT nodes
* get feeds

### refresh metadata
* sync relevant hashes and other data to be able to reconstruct 1-2 hour timeline

### refresh local feed
* load first screen full of data
* refresh metadata
* check DHT for chunks
* if that fails, check for individual posts

### refresh federated feed
* same, but also pull in metadata for other instances user is following someone on

### (make / un/boost / un/star) post // (un/follow / un/mute / un/block) user
* these are standard instance functions
