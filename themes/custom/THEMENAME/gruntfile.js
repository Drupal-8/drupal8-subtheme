module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-cssbeautifier');
  grunt.loadNpmTasks('grunt-strip-css-comments');
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Define paths.
    paths: {
      sass: 'sass',
      devCSS: 'css',
      prodCSS: 'deploy/styles',
    }, // paths

    uglify: {
      global: {
        files: {
          "js/site.min.js": ['js/*.js']
        }
      }
    }, // uglify

    cssbeautifier: {
      global: {
        files: {
          src: ['css/*.css']
        },
        options: {
          indent: '  ',
          openbrace: 'end-of-line',
          autosemicolon: false
        }
      }
    }, // cssbeautifier

    stripCssComments: {
      global: {
        files: [{
          expand: true,
          src: ['css/*.css']
        }]
      }
    }, // stripCssComments

    sass: {
      global: {
        options: {
          sourceMap: true,
          sourceComments: false,
          outputStyle: 'expanded'
        },
        // I suspect this method slows down grunt
        // @todo - test with named files.
        files: [{
          expand: true,
          cwd: '<%= paths.sass %>/',
          src: ['**/*.{scss,sass}'],
          dest: '<%= paths.devCSS %>/',
          ext: '.css'
        },
        ],
      }
    }, // sass

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ['templates/**/*.tpl.php', 'js/**/*.{js,json}', 'css/*.css', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}']
      },
      js: {
        files: ['js/*.js'],
        tasks: ["uglify"]
      },
      css: {
        files: ["sass/**/*.{scss,sass}"],
        tasks: ["sass"]
      },
    } // watch

  });
  require("load-grunt-tasks")(grunt);
  // grunt command
  grunt.registerTask("default", ["sass", "watch"]);
  // grunt format command (run before code commit)
  grunt.registerTask("format", ["stripCssComments", "cssbeautifier"]);
};
