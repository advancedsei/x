module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'start.js'
      }
    },
    pkg: grunt.file.readJSON('package.json'),
    htmlmin: {                                     // Task
    dist: {                                      // Target
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
        expand: true,
         cwd: 'src/views/',
          src: ['**/*.ejs'],
          dest: 'views/'
    }
  }

  });

  // load nodemon
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('build', ['htmlmin']);
  // register the nodemon task when we run grunt
  grunt.registerTask('default', ['nodemon','htmlmin']);  

};