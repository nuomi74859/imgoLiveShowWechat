module.exports = function(grunt) {
    'use strict';
    grunt.util.linefeed = '\n';
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';\n'
            },
            dist: {
                src:'src/**/*.js',
                dest:'js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                mangle: false,
                report:'min',
                sourceMap:true
            },
            dist: {
                files: [{
                    expand:true,
                    cwd:'',
                    src:'<%= concat.dist.dest %>',
                    dest:'',
                    ext:'.min.js'
                }]
            }
        },
        compass: {
            default: {
                options: {
                    sassDir:'src/sass/main',
                    cssDir:'css',
                    imagesDir:'images',
                    outputStyle:'compressed',
                    assetCacheBuster:false
                },
                dist: {
                    files:[{
                        expand:true,
                        src:'**/*.scss'
                    }]
                }
            },
            sprite: {
                options: {
                    sassDir:'src/sass',
                    specify: 'src/sass/spriter.scss',
                    cssDir:'css',
//                    cssPath:'cssPath',
                    imagesDir:'images',
                    imagesPath: 'src/images',
                    outputStyle:'compressed',
                    assetCacheBuster:false
                }
            }

        },
        htmlmin: {
            options: {
                removeComments:true,
                collapseWhitespace:true,
                minifyJS:{
                    mangle:false
                },
                minifyCSS:true
            },
            dist: {
                files:[{
                    expand:true,
                    cwd:'src',
                    src:'**/*.html',
                    dest:''
                }]
            }
        },
        imagemin: {
            options: {
                optimizationLevel:3
            },
            dist: {
                files: [{
                    expand:true,
                    cwd:'src',
                    src:['**/*.{png,jpg,jpeg,ico}'],
                    dest:''
                }]
            }

        },
        connect: {
            options: {
                port:8000,
                hostname:'*',
                debug:true,
                livereload:3000
            },
            server: {
                options: {
                    open:true,
                    base:''
                }
            }
        },
        watch: {
            concat: {
                files:['src/**/*.js'],
                tasks:['concat']
            },
            uglify: {
                files:['src/**/*.js'],
                tasks:['uglify']
            },
            compass: {
                files:['src/**/*.scss'],
                tasks:['compass']
            },
            htmlmin: {
                files:['src/**/*.html'],
                tasks:['htmlmin']
            },
            livereload: {
                options: {
                    livereload:'<%=connect.options.livereload%>'
                },
                files: [
                    '*.html',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js'
                ]
            }
        }
    });

    grunt.registerTask('default', ['uglify','concat','compass','htmlmin','imagemin']);
    grunt.registerTask('server',['connect','watch']);
};