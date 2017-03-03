http://brianflove.com/2016/03/29/typescript-express-node-js/

This is a base "real" API project with a complete setup of:

* NodeJS
* Express
* TypeScript
* TSLint
* Database access (Postgres)
* Sequelize (ORM)
* Authentication
* Tests

Why an API only project and not a full WebApp
The decision of spliting the application in API and Front-End is mostly because of the build process. The build process of a JS Back-End and a JS Front-End projects are very different, for example, the TypeScript compilation of the Front-End may target ES5 and the Back-End may target ES6, the tests too are entirely different processes. So having two separete projects make the things a little bit easier.

Each file and configuration of the project will be explained with the source of the best pratices.

Editor Recomendation
My personal recomendation is Visual Studio Code: https://code.visualstudio.com/. A simple yet powerfull text editor.

"First and foremost, it is an editor that gets out of your way. The delightfully frictionless edit-build-debug cycle means less time fiddling with your environment, and more time executing on your ideas."

Plugin Recomendations for Visual Studio Code
* Beaytify - HookyQR.beautify
* EditorConfig - EditorConfig.EditorConfig
* TSLint - eg2.tslint
* vscode-icons - robertohuertasm.vscode-icons

File: .editorconfig
http://editorconfig.org/

"EditorConfig helps developers define and maintain consistent coding styles between different editors and IDEs. The EditorConfig project consists of a file format for defining coding styles and a collection of text editor plugins that enable editors to read the file format and adhere to defined styles. EditorConfig files are easily readable and they work nicely with version control systems."

https://github.com/google/web-starter-kit/blob/master/.editorconfig

File: .gitignore
https://git-scm.com/docs/gitignore

"A gitignore file specifies intentionally untracked files that Git should ignore. Files already tracked by Git are not affected"

https://github.com/google/web-starter-kit/blob/master/.gitignore

File: .jshintrc
https://github.com/jshint/jshint/blob/master/examples/.jshintrc
With the following adjusts:
* node: true
Because its a NodeJS project

* esversion: 6
Because its a ES6 project

Obs.:
Q: If its a TypeScript project, why a JS Linter config?
A: Because some files are in plain JavaScript, like the Gruntfile.js

File: Gruntfile.js
Based on:
https://www.sitepoint.com/writing-awesome-build-script-grunt/

Comments about the technics used are in the file.

File: package.json
https://docs.npmjs.com/files/package.json

File: tsconfig.json
https://www.typescriptlang.org/docs/handbook/tsconfig-json.html
"The presence of a tsconfig.json file in a directory indicates that the directory is the root of a TypeScript project. The tsconfig.json file specifies the root files and the compiler options required to compile the project."
Obs.:
Q: If we are going to use Grunt to compile the project why not put these configurations in the grunt-ts task?
A: If you are using a code editor like Visual Studio Code it needs to know how the TypeScript compilation is configured, if you put these configurations in the grunt-ts task it will simply not know how to give you hints about the code while you are coding your applications.

https://www.typescriptlang.org/docs/handbook/compiler-options.html
```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "target": "ES6",
        "outDir": "dist",
        "sourceMap": true,
        "noImplicitAny": true
    }
}
```

Some considerations:
* module: commonjs
This is the module system used by NodeJS

* target: ES6
Specify ECMAScript target version, since we are using NodeJS > 6, it is safe to use es6

* outDir: dist
All our result builded app will be located in this directory

* sourceMap: true
Generates source maps ts -> js so it will be easy to debug your generated code

* noImplicitAny: true
Raise error on expressions and declarations with an implied any type.

File: tslint.json
https://palantir.github.io/tslint/usage/tslint-json/
Set of rules used by tslint to lint your TypeScript code.

Sequelize
http://ngerakines.me/2016/04/11/sequelize/
https://github.com/suksant/sequelize-typescript-examples
