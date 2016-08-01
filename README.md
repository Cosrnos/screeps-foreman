# screeps-foreman
Foreman is a framework for [screeps](https://screeps.com/) to power up your colony.

## Features

##### Build Tool
- Folder organization
- Customization of build
- Caching Methods

##### Horde Library

- Utilities to determine optimal resource levels
- Memory based caching
- Cache methods on ticks, process expensive calculations once

##### Foreman Library

**Coming Soon**

### Planned Features

##### Build Tool
- Plugins (with NPM importing!) - This will allow us to break out the default included libraries to optional modules.
- Custom Blueprints to employ advanced builds
- Module flattening - Combine multiple files to save CPU resources
- Command Line utilities to power up development
- Test Environment - Use simulated fixtures to test your code!

##### Horde lib

- Convenience Methods - Let us write the boiler plate for you
- Efficient data retrieval - Prototype overrides to ensure maximum performance
- Event Engine - Allow your AI to react to its surroundings 

##### Foreman lib

- Scheduling - Schedule a function to be called later
- Optimize your CPU Power - Create workers to crunch data when you have resources to spare
- Advanced Asynchronous Processing - Spread advanced operations over a number of gameTicks and maximize your throughput
- Simplify Management - Use predefined, optimized AI scripts for common operations.

## Installation

#### Prerequisites

- **Node.js >= 4.0.0** and **npm v3**
- [Grunt Task Runner](https://gruntjs.com/)
- Git

#### Setup

1. Clone the Foreman project and run the following in the root directory

    ```
    npm install
    ```

2. Clone a new branch in screeps
3. Open the `account.js` file in the `users` folder with your screeps email and password and add the `branch` property, setting it to the name of the branch created in step 2.
4. You're ready to go!

## Usage

#### Folder Structure

Foreman Build tool allows you to create modules within folders and include them in your project. However this doesn't behave exactly as you would expect it to in a normal node project.
 
To include a module in a folder, seperate the folder/file name(s) with the `.` character instead of the normal `/` character. All paths are relative to the `/src` directory. For example, if you had the following project:

```
/src
-- /foo
---- /bar
------ file.js
-- main.js
```

You would include the `foo/bar/file.js` file as

```
const file = require('foo.bar.file'); 
```

Foreman by default will also collapse module names to allow you to organize your files better. Let's say we have the following folder structure:

```
/src
-- /myLib
---- myLib.js
---- moduleA.js
---- moduleB.js
-- main.js
```

Foreman will see that you have a directory with an immediate child named after it, and will assume you want references to the `myLib` module to reference the `myLib/myLib.js` file.
 
 ```
 const myLib = require('myLib'); // References the myLib/myLib.js file
 const moduleA = require('myLib.moduleA'); // References the myLib/moduleA.js file
 ```

## Building & Deploying

To use Foreman, simply run `grunt <command>` in your project folder. There are currently 2 available commands:

**[default]** *(`grunt`)* - Builds the included Horde and Foreman library files and your Source files.

**push** *(`grunt push`)* - Builds the included Horde and Foreman library files, your Source files, and then pushes the compiled source to your Screeps account.

**dev** *(`grunt dev`)* - Performs the push command and watches your files for changes. Anytime you save changes they will be pushed. Best used with a development branch in the sim

## Contributing

Simply create a pull request!

Please open an issue for any bugs or feature requests and we'll do our best to provide support. If you have ideas for more optimal or performant code feel free to share those as well.

