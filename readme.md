# BUSY Pattern Lab Slingshot

An oppinionated composition of frameworks and utilities for quickly scaffolding out boilerplates for working with design systems in [BUSY ApS](https://busycph.dk/)

It's comprised of the following technologies:

 * [PatternLab]((https://github.com/pattern-lab/patternlab-node)) with a [webpack](https://webpack.js.org/) wrapper
 * [SCSS](http://sass-lang.com/) with a [ITCSS approach](https://www.youtube.com/watch?v=1OKZOV-iLj4)
 * [Tailwind](https://tailwindcss.com/) (if it's conceptually compatible with ITCSS... I'm still finding out)
 * PostCSS: [Lost](http://lostgrid.org/), [Rucksack](https://www.rucksackcss.org/), [cssnano](http://cssnano.co/), [Autoprefixer](https://autoprefixer.github.io/).

## Installation and Starting

1. `npm install`
2. `npm run patternlab:serve`

## Prerequisites

The Pattern Lab Node - webpack edition uses [Node](https://nodejs.org/en/) for core processing, [npm](https://www.npmjs.com/) to manage project dependencies, and [webpack.io](https://webpack.github.io/) to run tasks and interface with the core library. Node version 4 or higher suffices. You can follow the directions for [installing Node](https://nodejs.org/en/download/) on the Node website if you haven't done so already. Installation of Node will include npm.

## Updating Pattern Lab

To update Pattern Lab please refer to each component's GitHub repository, and the [master instructions for core](https://github.com/pattern-lab/patternlab-node/wiki/Upgrading). The components are listed at the top of the README.

### List all of the available commands

To list all available commands type:

    npm run patternlab:help

### Generate Pattern Lab

To generate the front-end for Pattern Lab type:

    npm run patternlab:build