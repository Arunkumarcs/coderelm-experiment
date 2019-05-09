'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  /**
   * 1. initializing
   * Your initialization methods (checking current project state, getting configs, etc)
   */
  initializing() {
    console.log('1. initializing')
  }

  /**
   * 2. prompting
   * Where you prompt users for options (where you’d call this.prompt())
   */
  prompting() {
    console.log('2. prompting')

    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the kryptonian ${chalk.red('generator-test-2')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * 3. configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
   */
  configuring() {
    console.log('3. configuring')
  }

  /**
   * 4. default - If the method name doesn’t match a priority, it will be pushed to this group.
   */
  default() {
    console.log('4. default')
  }

  /**
   * 5. writing - Where you write the generator specific files (routes, controllers, etc)
   * https://yeoman.io/authoring/file-system.html
   */
  writing() {
    console.log('5. writing')
    // console.log(this.appname)
    // console.log(this.config)
    // console.log(this.props)
    // console.log(this.contextRoot)

    this.fs.copy(
      // this.templatePath('dummyfile.txt'),
      // this.destinationPath('dummyfile.txt')
      this.sourceRoot(),
      this.destinationRoot()
    );
  }

  /**
   * 6. conflicts - Where conflicts are handled (used internally)
   */
  // conflicts() {}

  /**
   * 7. install - Where installations are run (npm, bower)
   * https://yeoman.github.io/generator/actions_install.html
   */
  install() {
    console.log('7. install')
    // this.installDependencies();
    this.yarnInstall()
  }

  /**
   * 8. end - Called last, cleanup, say good bye, etc
   */
  end() {
    console.log('8. end')
  }
};
