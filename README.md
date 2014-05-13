BrowseMD
========

A Chrome extension to render Markdown documents.

How To Install
==============

I will upload the extension to Chrome Webstore later.
For now, you can go to [chrome://extensions](chrome://extensions/) and install it as local file. There're 2 ways:

1. Build the `.crx` file by following the steps below (see 'How To Build'), then drag and drop the `.crx` file in Chrome window.
2. Enable `Developer mode`, then click `Load unpacked extension ...` button then open the `src` folder in the project folder.

After installation, please check `Allow access to file URLs` to read local markdown files.

How To Use
==========

Open any markdown files in Chrome, it will show its HTML format. 
You can click the extension action button (at the right end of address bar) to toggle between text/html mode and select different themes.

How To Build
============

### Step 1 Clone the github

```bash
git clone https://github.com/ubertao/BrowseMD.git
```

### Step 2 Install dev tools

This project uses several popular tools: `Node.js`, `npm`, `bower` and `grunt`.
Please install them by following the instruction below:

* `Node.js` + `npm`: Please install it [here](http://nodejs.org/download/)
* `bower` front-end package manager: `npm install -g bower` 
* `grunt` task runner: `npm install -g grunt-cli`

### Step 3 Install dependent components

In order to install front-end components and `grunt` files, run following command from your project folder:

```bash
npm install
bower install
```

### Step 4 Setup private key

To sign your Chrome extension, you need to put your private key file into project folder under the name `key.pem`.
If you don't have a private key, use can use `ssh-keygen` to generate one.

### Step 5 Build the extension

Run following command to build the extension:

```bash
grunt
```

The result `.crx` file will be generated to `build/` folder.

Credits
=======

1. [showdown](https://github.com/coreyti/showdown) is used to convert markdown text to html.
2. Default CSS from https://gist.github.com/andyferra/2554919
3. Additional CSS themes from https://github.com/jasonm23/markdown-css-themes