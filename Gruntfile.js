module.exports = grunt => {
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'client/public/minBundle.js': ['client/public/bundle.js'],
        }
      }
    },

    shell: {
      addAndDeploy: {
        command: mess => ['grunt uglify', 'git add .', 'git commit -m' + mess, 'git push heroku master -f'].join('&&')
      }
    },
    cssmin: {
      target: {
        files: {
          'client/public/style/styleMin.css': ['client/public/style/style.css'],
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // grunt shell:addAndDeploy:Message_Here

  grunt.registerTask('ugly', ['uglify', 'cssmin']);
}
