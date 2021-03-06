'use strict';
module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    var rewriteModule = require('http-rewrite-middleware');
    var serveStatic = require('serve-static');

    grunt.initConfig({
        config: {
            src: 'src',
            dist: 'dist',
            root: './'
        },
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            sass: {
                files: ['<%= config.src %>/scss/**/*.scss'],
                tasks: ['sass','postcss'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['<%= config.src %>/js/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['<%= config.src %>/**/*.html'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: ['<%= config.src %>/index.html']
            }
        },
        connect: {
            /*
            server: {
                options: {
                    port: 9002,
                    hostname: '*',
                    base: '<%= config.root %>',
                    middleware: function(connect, options, middlewares) {
                        // return middlewares;
                        
                        return [
                            serveStatic('.html'),
                            serveStatic('./'),
                            connect().use('/bower_components', serveStatic('./bower_components'))
                        ];
                    }
                }
            },
            */
            options: {
                port: 9002,
                livereload: 35730,
                hostname: '*'
            },
            livereload: {
                options: {
                    open: true,
                    port: 9002,
                    base: ['<%= config.root %>']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= config.src %>/css/theme.css': '<%= config.src %>/scss/theme.scss'
                }
            }
        },
        cssmin: {
            options: {
              sourceMap: false,
              level: {
                1: {
                  specialComments: 0
                }
              }
            },
            target: {
              files: [{
                expand: true,
                cwd: '<%= config.src %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: '<%= config.dist %>/css/',
                ext: '.min.css'
              }]
            }
        },
        wiredep: {
          task: {
            src: [
              '<%= config.src %>/{,*/}*.html', // .html support...
            ],
            options: {}
          },
        },
        jshint: {
          all: ['<%= config.src %>/**/*.js']
        },
        postcss: {
          options: {
            processors: [
              require('autoprefixer')({
                browsers: 'last 2 versions'
              }), // add vendor prefixes
            ]
          },
          dist: {
            src: [
                  '<%= config.src %>/css/theme.css',
                ]
          }
        },
        prettify: {
          options: {
            // Task-specific options go here.
            preserveBOM: true,
            indent_inner_html: false,
            indent: 2,
            padcomments: true,
            preserve_newlines: true
          },
          all: {
            expand: true,
            cwd: '<%= config.dist %>',
            ext: '.html',
            src: ['*.html'],
            dest: '<%= config.dist %>'
          }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/js/',
                        src: ['**'],
                        dest: '<%= config.dist %>/js/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/css/',
                        src: ['**'],
                        dest: '<%= config.dist %>/css/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/',
                        src: ['*.html'],
                        dest: '<%= config.dist %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.src %>/img/',
                        src: ['**'],
                        dest: '<%= config.dist %>/img/'
                    }
                ]
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/',
                        src: ['*.html'],
                        dest: '<%= config.dist %>/'
                    }
                ]
            }
        },
        useminPrepare: {
            html: [
              '<%= config.dist %>/index.html'
            ],
            options: {
              root: '<%= config.src %>',
              dest: '<%= config.dist %>',
              flow: {
                html: {
                  steps: {
                    myjs: ['concat', 'uglify'],
                    js: ['concat'],
                  },
                  post: {}
                }
              }
            }
        },
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/{,*/}*.css'],
            js: ['<%= config.dist %>/{,*/}*.js'],
            options: {
                assetsDirs: [
                    '<%= config.dist %>/js',
                    '<%= config.dist %>/img',
                    '<%= config.dist %>/css'
                ],
                patterns: {
                    js: [
                    [/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']
                    ]
                }
            }
        },
        uglify: {
            options: {
            mangle: false,
            beautify: true,
            preserveComments: false,
            }
        },
        htmlmin: {
            dev: {
            options: {
                removeComments: true,
                ignoreCustomComments: [
                /^\s+ko/,
                /\/ko\s+$/
                ]
            },
            files: [{
                expand: true,
                cwd: '<%= config.dist %>/',
                src: ['**/*.html', '*.html'],
                dest: '<%= config.dist %>'
            }]
            }
        },
        clean: ['<%= config.dist %>', '.tmp']
    });
        
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('server', [
      'default',
      'connect:livereload',
      'watch'
    ]);
    grunt.registerTask('server', [
      'default',
      'connect:livereload',
      'watch'
    ]);
    grunt.registerTask('build', [
      'clean',,
      'useminPrepare',
      'sass',
      'postcss',
      'cssmin',
      'htmlmin',
      'concat',
      'uglify',
      'usemin',
      'prettify',
      'copy',
    ]);
    grunt.registerTask('default', [
      'clean',
      'copy:main',
      'sass',
      'postcss'
    ]);
};