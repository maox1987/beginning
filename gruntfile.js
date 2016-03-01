/**
 * Created by MaoX on 2016/3/1.
 */
module.exports = function(grunt){
    grunt.initConfig({
        watch:{
            jade:{
                files:['app/views'],
                options:{
                    livereload:true

                }
            },
            js:{
                files:['public/js/**','app/**'],
                options:{
                    livereload:true
                }
            }
        },
        nodemon:{
            dev:{
                options:{
                    file:'app.js',
                    args:[],
                    ignore:['README.md','node_modules/**','.DS_Store','public/**'],
                    ext:'js',
                    watch:['app','config','routes','app.js'],
                    debug:true,
                    delay:1,
                    env:{
                        PORT:3000
                    },
                    cwd:__dirname
                }
            }
        },
        concurrent:{
            tasks:['nodemon','watch'],
            options:{
                logConcurrentOutput:true
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.option('force',true);

    grunt.registerTask('default',['concurrent']);

};