/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg : grunt.file.readJSON( 'package.json' ),
		banner : '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - '
			+ '<%= grunt.template.today("yyyy-mm-dd") %>\n'
			+ '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>'
			+ '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;'
			+ ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		// Task configuration.
		
//		// Copy files
//		copy: {
//			// Copy Font Awesome files to /fonts directory
//			fonts: {
//				expand: true,
//				cwd: 'bower_components/components-font-awesome/fonts',
//				src: [ '**/*' ],
//		        dest: 'fonts',
//		        filter: 'isFile'
//			}
//		},
//		
//		// Concat js and css files
//		concat: {
//			// bootstrap js
//			bootstrapjs: {
//				options: {
//					stripBanners : true,
//					separator: ";\n"
//				},
//				src: [
//				      'bower_components/bootstrap/js/transition.js',
//				      'bower_components/bootstrap/js/tab.js'
//				  ],
//			    dest: 'src/js/bootstrap.js'
//			}
//		},
//		
//		// Uglify files
//		uglify: {
//			options: {
//				mangle: false
//			},
//			// Bootstrap files
//			bootstrapjs: {
//				files: {
//					'js/bootstrap.js': ['src/js/bootstrap.js']
//				}
//			}
//		},
//		
//		// Compile less
//		less: {
//			bootstrapcss: {
//				options: {
//					cleancss: true,
//					report: 'min'
//				},
//				files: {
//					'src/css/bootstrap.css': [
//                          //'bower_components/bootstrap/less/mixins/responsive-visibility.less',
//	                      'bower_components/bootstrap/less/responsive-embed.less',
//	                      //'bower_components/bootstrap/less/responsive-utilities.less',
//					      //'bower_components/bootstrap/less/variables.less',
//                      	  //'bower_components/bootstrap/less/mixins.less',
//                      	  
//                      ]
//				}
//			}
//		}
		
	});

//	// These plugins provide necessary tasks.
//	grunt.loadNpmTasks( 'grunt-contrib-copy' )
//	grunt.loadNpmTasks( 'grunt-contrib-concat' )
//	grunt.loadNpmTasks( 'grunt-contrib-uglify' )
//	grunt.loadNpmTasks( 'grunt-contrib-less' )
//
//	// Default task.
//	grunt.registerTask( 'default', [ 'copy', 'concat', 'uglify', 'less' ] );

};
