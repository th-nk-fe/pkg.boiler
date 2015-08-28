module.exports = function(grunt) {

	require('time-grunt')(grunt);
	var app_config = grunt.file.readJSON('grunt_tasks.json');
	var watchers = app_config.watchers;

	var webpbinpath = app_config.images.tasks["newer:webp"] ? require('webp-bin').path : "";//
	var pcssprocessor = app_config.images.tasks["newer:postcss"] ? [require('autoprefixer-core')({browsers: ['last 1 version']})] : [];

	var bower_json = grunt.file.readJSON('bower.json').dependencies;
	var bower_deps = [];

	for(key in bower_json){
		bower_deps.push(key+"/**");
	};

	var conf = {
    	pkg: grunt.file.readJSON('package.json'),
		/**
		base
		*/
		connect :{
			docs: {
		        options: {
		            port: 3001,
					keepalive:false,
		            base: './docs'
		        }
		    },
			server: {
		        options: {
		            port: 8080,
					keepalive:false,
		            base: './public'
		        }
		    }
		},
		clean: {
			build: ['./docs','./lib','./public/assets/components'],
		},
		karma: {
            unit: {
                configFile: 'grunt_config/karma.conf.js'
                /*singleRun: true,
                reporters: ['progress'] //continuousIntegrationMode ? ['teamcity'] : ['progress']*/
            }
        },
		copy: {
			webworkers: {
		        cwd: 'src/js/webworkers',
		        src:['**/*'],
				dest: 'public/assets/js/webworkers',
		        expand: true
		    },
			dependancies: {
				files:[{expand: true, cwd:'lib/components/', src: bower_deps, dest: 'public/assets/components'}]
			},
			styleguide: {
				files:[{expand: true, cwd:'public/assets/', src: ['js/styleguide.js','icons/**'], dest: 'docs/styleguide/section/assets'}]
			}
		},
		/**
		codestyle
		*/
		jscs: {
			main:{
				src: ['src/js/**/*.js'],
				options: {
					config: 'grunt_config/.jscsrc',
					esnext: true,
					verbose: true,
					fix:true
				}
			}
		},
		'sass-convert': {
			build:{
				options: {
					indent: 4
				},
				files: [{
					src: ['src/scss/**/*.scss']
				}]
			}
		},
		/**
		minify
		*/
		imagemin:{
			dynamic: {                       
				options: {                      
				optimizationLevel: 1
				},
				files: [{
					expand: true,
					cwd: 'src/images/', 
					src: ['**.{png,jpg,gif}'], 
					dest: 'public/assets/images/', 
				},{
					expand: true,
					cwd: 'src/scss/images/', 
					src: ['**.{png,jpg,gif}'], 
					dest: 'public/assets/css/images/', 
				}]
			}
		},
		cssmin:{
			combine: {
				files: {
					'public/assets/css/site.min.css': ['public/assets/css/site.css']
				}
			}
		},
		uglify:{
			js: {
		        src: 'public/assets/js/app.js',
		        dest: 'public/assets/js/app.min.js'
		    },
			webworkers: {
				files: [{
					expand: true,
					cwd: 'public/assets/js/webworkers/',
					src: '**/*.js',
					dest: 'public/assets/js/webworkers/',
					ext: '.js'
				}]
		    }
		},
		/**
		images
		*/
		webp: {
	        dynamic: {
	            files: [{
	                expand: true,
	                cwd: 'src/images/',
	                src: '**.{png,jpg,gif}',
	                dest: 'public/assets/images/'
	            },
	            {
	                expand: true,
	                cwd: 'src/scss/images/',
	                src: '**.{png,jpg,gif}',
	                dest: 'public/assets/css/images/'
	            }],
	            options: {
	                binpath: webpbinpath,
	                preset: 'photo',
	                verbose: true,
	                quality: 100,
	                alphaQuality: 100,
	                compressionMethod: 6,
	                segments: 4,
	                psnr: 42,
	                sns: 50,
	                filterStrength: 40,
	                filterSharpness: 3,
	                simpleFilter: true,
	                partitionLimit: 50,
	                analysisPass: 6,
	                multiThreading: true,
	                lowMemory: false,
	                alphaMethod: 0,
	                alphaFilter: 'best',
	                alphaCleanup: true,
	                noAlpha: false,
	                lossless: false,
	            }
	        }
	    },
		grunticon: {
			build: {
				files: [{
					expand: true,
					cwd: 'src/icons/src',
					src: ['*.*'],
					dest: 'public/assets/icons'
				}],
				options: {
					enhanceSVG: true,
					compressPNG: true
				}
			}
		},
		svgmin: {
			options: grunt.file.readJSON('grunt_config/svgmin.json'),
		    icons: {
		        files: [
		            {
		                expand: true,
		                cwd: "src/icons/svgs",
		                src: ["*.svg"],
		                dest: "src/icons/src"
		            }

		        ]
		    }
		},
		/**
		validate
		*/
		eslint: {
			target: ['.src/js/**/*.js'],
		    options: {
		   		configFile: 'grunt_config/.eslintrc'
			}
		},
		csslint: {
			options: {
		        force: true
		    },
		    lax: {
		        options: {
		            force: true,
		            import: false,
		            csslintrc: 'grunt_config/rules.csslintrc'
		        },
		        src: ['public/assets/css/site.css']
		    }
		},
		htmlhintplus: {
			options: {
		        htmlhintrc: 'grunt_config/.htmlhintrc'
		    },
		    html: {
		        src: ['public/**/*.html']
		    }
		},
		phantomcss:{
			test: {
				options: {
					screenshots: './test/cssregression/baselines',
					results: './test/cssregression/results',
					mismatchTolerance: 0.05
				},
				src: [
					'test/cssregression/phantomcss.js'
				]
			}
		},
		/**
		css
		*/
		sass :{
			options: {
		        sourceMap: false
		    },
			dist: {
		        files: {
					'public/assets/css/site.css': 'src/scss/site.scss'
		        }
			}/*,
			styleguide:{
				files: [{
					expand: true,
					cwd: 'src/scss',
					src: ['*.scss'],
					dest: 'public/assets/css',
					ext: '.css'
				}]
			}*/
		},
		//https://github.com/postcss/postcss
		postcss: {
			options: {
				map: true,
				processors: pcssprocessor
			},
			dist: {
				src: 'public/assets/css/site.css'
			}
		},
		asset_cachebuster: {
			options: {
				buster: "<%= pkg.version %>"+ "." + Date.now().toString(),
				ignore: []
			},
			build: {
		        files: {
		            'public/assets/css/site.min.css':['public/assets/css/site.min.css']
		        }
    		}
		},
		stripmq: {
			legacy:{
				options: {
					// Include only styles for a screen 800px wide
					width: 1024,
					type: 'screen',
					//'device-width': int
					//height: int,
					//'device-height': int,
					//resolution: '1dppx',
					//orientation : 'landscape',
					//'aspect-ratio' : int
					//color
				},
				files: {
					'public/assets/css/site.legacy.css': 'public/assets/css/site.css'
				}
			},
			mobile:{
				options: {
					width: 600,
					type: 'screen'
				},
				files: {
					'public/assets/css/site.mobile.css': 'public/assets/css/site.css'
				}
			}
		},
		modernizr: {	    
		    dist: {
		        devFile : "./lib/components/modernizr/modernizr.js",
		        outputFile : "./lib/components/modernizr/modernizr-custom.js",
		        extra : {
		            shiv : true,
		            printshiv : false,
		            load : true,
		            mq : false,
		            cssclasses : true
		        },
		        extensibility : {
		            addtest : false,
		            prefixed : false,
		            teststyles : false,
		            testprops : false,
		            testallprops : false,
		            hasevents : false,
		            prefixes : false,
		            domprefixes : false,
		            cssclassprefix: ""
		        },
		        uglify : true,
		        tests : grunt.file.readJSON('grunt_config/modernizr.json').tests,
		        parseFiles : false,
		        matchCommunityTests : false,
		        customTests : [
		        	// "dev/custom-tests/ios.js",
		        	// "dev/custom-tests/mobile.js"
		        ]
		    }	 	
		},
		/**
		js
		*/
		browserify: {
			babel: {
		        options: {
		           transform: [
		              ["babelify", {
		                 loose: "all"
		              }]
		           ],
		          modules:"common"
		        },
		        files: [/*{
		           "./public/assets/js/app.js": ["./src/js/app.js"]
		        },*/
				{
		           "./docs/styleguide/section/assets/js/styleguide.js": ["./src/js/styleguide.js"]
		        }]
		    }
		},
		/**
		docs
		*/
		jsdoc:{
			dist : {
		        src: ['public/assets/js/app.js'], 
		        options: {
		            destination: 'docs/jsdoc'
		        }
		    }
		},
		phantomas: {
			site : {
				options : {
					indexPath : './docs/performance/',
					options   : {},
					url       : 'public/index.html',
					buildUi   : true
				}
			}
		},
		/**
		html
		*/
		zetzer: {
			prototype: {
				options: {
					env: {
						title: "<%= pkg.name %> <%= pkg.version %>",
						pageurl: "public"
					},
					partials: "src/html/partials",
					templates: "src/html/templates",
					dot_template_settings: { 
						strip: false,
						varname: 'it'
					}
				},
				files: [{
					expand: true,
					cwd: "src/html/pages/",
					src: "**/*.html",
					dest: "public",
					ext: ".html",
					flatten: false
				}]
			}
		},
		cacheBust: {
			assets: {
				files: [{   
					expand: true,
					cwd: 'public/',
					baseDir: 'public/',
					src: ['**/*.html']
				}]
			} 
		},
		/**
		ops
		*/
		wiredep: {
			task: {
				directory: './lib/components',
				src: [
					'public/**/*.html',
				],
        		ignorePath: /..\/lib/,
				options: {
					devDependencies: false,
					exclude: [ ]
				},
				fileTypes: {
					html: {
					  replace: {
					    js: '<script src="assets{{filePath}}"></script>',
					    css: '<link rel="stylesheet" href="assets{{filePath}}" />'
					  }
					}
				}
			}
		},
		real_favicon: {
			my_icon: {
				src: 'src/favicon/favicon.png',
				dest: 'public/assets/favicons',
				icons_path: '/assets/favicons',
				html: ['src/html/partials/favicons.html'],
				design: {
					ios: {
						//picture_aspect: 'background_and_margin',
						//background_color: '#654321',
						//margin: 4
					},
					windows: {
						//picture_aspect: 'white_silhouette',
						//background_color: '#123456'
					}
				},
				settings: {
					compression: 5,
					scaling_algorithm: 'NearestNeighbor'
				}
			}
		},
		"bower-install-simple": {
	        options: {
	        },
	        dev: {
	            options: {
	                production: false
	            }
	        }
	    },
		exec: {
			styleguide: {
				command: 'start gulp watch &'
			},
			js: {
				command: 'start gulp watchjs &'
			},
			importmodules: {
				command: 'node importmodules.js'
			}
		},
		watch:{
			css:{
				files: ['src/scss/**/*.scss','lib/components/**/*.scss'],
			    tasks: ['sass'],
			    options: {
			      spawn: false,
			    },
			},
			js:{
				files: ['./src/js/styleguide.js'],
			    tasks: ['browserify:babel'],
			    options: {
			      spawn: false,
			    },
			},
			html:{
				files: ['./src/html/**/*.html'],
			    tasks: ['zetzer'],
			    options: {
			      spawn: false,
			    },
			},
			deps:{
				files: ['public/**/*.html'],
			    tasks: ['wiredep'],
			    options: {
			      spawn: false,
			    },
			},
			favicon:{
				files: ['./src/favicon/*.*'],
			    tasks: ['real_favicon'],
			    options: {
			      spawn: false,
			    }
			},
			svgmin: {
				files: ["src/icons/svgs/*.svg"],
				tasks: ["svgmin:icons"]
			},
			grunticon: {
				files: ["src/icons/src/*.*"],
				tasks: ["grunticon:build"]
			}
		},
		open : {
			dist : {
				path: 'http://localhost:8080/'
			},
			styleguide : {
				path: 'http://localhost:3000/'
			},
			jsdoc : {
				path: 'http://localhost:3001/jsdoc'
			},
			perf : {
				path: 'http://localhost:3001/performance'
			},
			sassdoc : {
				path: 'http://localhost:3001/sassdoc'
			}
		},
		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			watch: {
				tasks: watchers
			}
		}
	};

	grunt.initConfig(conf);
	require('jit-grunt')(grunt);
	
	/**
	registerTask handled from app_config file
	allows for yeoman integration
	*/
	var config_tasks = {
		"builddev":[],
		"buildserver":[]
	};
	function _regsiterConfigTasks(name,section){
		if(!!section){
			var arr = [];
			for(var key in section.tasks) {
				if(section.tasks[key]) {
					arr.push(key);
					if(typeof section.tasks[key] !== "boolean") grunt.loadNpmTasks(section.tasks[key].package);
				}
			};

			if(arr.length > 0) {
				grunt.registerTask(name, arr);
				config_tasks["builddev"].push(name);
				if(!section["devonly"]) {
					config_tasks["buildserver"].push(name);
				}
			}
		};
	};
	for(var section in app_config){
		if(section !== "watchers") {
			var section_obj = app_config[section];
			_regsiterConfigTasks(section,section_obj);
		}
	};

	/**
	load standalone task
	*/
    grunt.loadNpmTasks("grunt-asset-cachebuster");

    grunt.registerTask('builddev', config_tasks['builddev']);
    grunt.registerTask('buildserver', config_tasks['buildserver']);
    grunt.registerTask('conn', ['connect','open','concurrent:watch'])
    grunt.registerTask('default', ['builddev','exec:importmodules','connect','open','concurrent:watch']);
};
