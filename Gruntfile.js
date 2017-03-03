'use strict';

const timer = require('grunt-timer');

module.exports = function (grunt) {

  timer.init(grunt);

  var srcDir = 'src';
  var buildDir = 'dist';

  grunt.initConfig({
    clean: {
      all: {
        src: [buildDir]
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
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'dist/index.js'
        }
      },
      prod: {
        options: {
          script: 'path/to/prod/server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'path/to/test/server.js'
        }
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
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-tslint');

  // The build task will do a complete project build, with a previous clean
  grunt.registerTask(
    'build',
    'Clean, lint, compile, copy and test all assets.',
    ['clean', 'tslint', 'ts', 'copy']
  );

  grunt.registerTask(
    'fastbuild',
    'Used to do a incremental and fastest build whenever a resource changes.',
    ['tslint', 'ts', 'copy']
  );

  grunt.registerTask(
    'default',
    'Makes a full build, start the server and wait for changes',
    ['build', 'express:dev', 'watch']
  );

  grunt.registerTask(
    'dist',
    'Added as a good pratice, generates the distribution version.',
    ['build']
  );
};
