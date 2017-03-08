'use strict';

const timer = require('grunt-timer');

module.exports = function (grunt) {

  timer.init(grunt);

  var srcDir = 'src';
  var buildDir = 'dist';

  grunt.initConfig({
    clean: {
      all: {
        src: [buildDir, './**/*.tmp.txt']
      },
    },
    copy: {
      all: {
        cwd: srcDir,
        src: ['**', '!**/*.ts', '!**/.baseDir.ts'],
        dest: buildDir,
        expand: true
      },
    },
    express: {
      dev: {
        options: {
          script: 'dist/index.js',
          node_env: 'development',
        }
      },
      prod: {
        options: {
          script: 'dist/index.js',
          node_env: 'production',
        }
      }
    },
    // Configure a mochaTest task
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          // captureFile: 'results.txt', // Optionally capture the reporter output to a file
          // quiet: false, // Optionally suppress output to standard out (defaults to false)
          // clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          // noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['dist/test/**/*.js']
      }
    },
    ts: {
      default: {
        tsconfig: true
      }
    },
    tslint: {
      options: {
        configuration: 'tslint.json',
        force: false,
        fix: true
      },
      files: {
        src: [
          srcDir + '/**/*.ts'
        ]
      }
    },
    watch: {
      files: [srcDir + '/**'],
      tasks: ['fastbuild', 'express:dev'],
      options: {
        spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
      }
    },
  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');

  // The build task will do a complete project build, with a previous clean
  grunt.registerTask(
    'build',
    'Clean, lint, compile, copy and test all assets.', ['clean', 'fastbuild']
  );

  grunt.registerTask(
    'fastbuild',
    'Used to do a incremental and fastest build whenever a resource changes.', ['tslint', 'ts', 'copy', 'mochaTest']
    // 'Used to do a incremental and fastest build whenever a resource changes.', ['tslint', 'ts', 'copy']
  );

  grunt.registerTask(
    'default',
    'Makes a full build, start the server and wait for changes', ['build', 'express:dev', 'watch']
  );

  grunt.registerTask(
    'dist',
    'Just generates the distribution version.', ['build']
  );
};
