/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    manifest: grunt.file.readJSON('src/manifest.json'),
    crx: {
      build: {
        "src": "src/",
        "dest": "build/",
        "baseURL": "https://github.com/ubertao/BrowseMD",
        "filename": "",
        "exclude": [ ".git", ".svn", "*.pem" ],
        "privateKey": "key.pem",
        "options": {}
      }
    },
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      source: {
        src: 'src/js/*.js',
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
    },
    copy: {
      showdown: { expand: true, cwd: 'bower_components/showdown/src/', src: '**/*.js', dest: 'src/js/lib/' },
      css: { expand: true, cwd: 'bower_components/markdown-css-themes/', src: '*.css', dest: 'src/css/' }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      source: {
        files: '<%= jshint.source.src %>',
        tasks: ['jshint:source', 'qunit']
      },
      build: {
        files: ['key.pem','src/**/*'],
        tasks: ['crx']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-crx');

  // Default task.
  grunt.registerTask('default', ['copy', 'jshint', 'qunit', 'crx']);

};
