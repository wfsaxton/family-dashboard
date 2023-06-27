# This is a dashboard for my family

## Quick install and run on Raspberry Pi OS

If you don't have a config yet, use the example one

```
$ cp config/config.ts.sample config/config.ts
```

Fill out the mandatory environment variables
```
$ cp env.example env.local
$ vi env.local
## Make edits ##
```

Then install nvm, node v20, npm, and build and run project

```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
$ nvm install 20
$ nvm use 20
$ sudo apt install -y npm
$ npm i
$ npm run build
$ npm run start
```