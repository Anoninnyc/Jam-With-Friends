module.exports = grunt => {
  grunt.initConfig({
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

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // grunt shell:addAndDeploy:Message_Here

  grunt.registerTask('default', ['cssmin']);
}
