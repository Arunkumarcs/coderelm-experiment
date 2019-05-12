const _ = require("lodash");

class Writeing {

  // Copying default files and folders.
  static folders(generator) {
    generator.fs.copy(
      generator.sourceRoot() + "/default",
      generator.destinationRoot()
    );
  }

  // Package.json
  static packageJson(generator) {
    let project = generator.props;
    generator.fs.copyTpl(
      generator.templatePath("package.json"),
      generator.destinationPath("package.json"),
      {
        projectName: _.kebabCase(project.name),
        projectVersion: project.version,
        projectDescription: project.description,
        projectRepository: project.repository,
        projectAuthor: project.author,
        projectLicense: project.license
      }
    );
  }

  // Ecosystem.config.js
  static pm2Ecosystem(generator) {
    let project = generator.props;
    generator.fs.copyTpl(
      generator.templatePath("ecosystem.config.js"),
      generator.destinationPath("ecosystem.config.js"),
      { projectName: _.kebabCase(project.name) }
    );
  }

  // Config/config.js
  static config(generator) {  
    let project = generator.props;
    generator.fs.copyTpl(
      generator.templatePath() + "/config/default.json",
      generator.destinationPath() + "/config/default.json",
      {
        appSecret: "dsfsdfgdgdf",
        storageSecret: "34675867uthgfdfefrerg",
        sessionStorageSecret: "regnmj756y5t4reqw"
      }
    );
  }
}

module.exports = async generator => {
  Writeing.folders(generator)
  Writeing.packageJson(generator)
  Writeing.pm2Ecosystem(generator)
  Writeing.config(generator)
};
