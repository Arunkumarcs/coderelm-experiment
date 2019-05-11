const _ = require("lodash");

module.exports = async generator => {
  let project = generator.props;

  /**
   * Copying default files and folders.
   */
  generator.fs.copy(
    generator.sourceRoot() + "/default",
    generator.destinationRoot()
  );

  // Package.json
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
  // Ecosystem.config.js
  generator.fs.copyTpl(
    generator.templatePath("ecosystem.config.js"),
    generator.destinationPath("ecosystem.config.js"),
    { projectName: _.kebabCase(project.name) }
  );
  // Config/config.js
  generator.fs.copyTpl(
    generator.templatePath() + "/config/default.json",
    generator.destinationPath() + "/config/default.json",
    {
      appSecret: "dsfsdfgdgdf",
      storageSecret: "34675867uthgfdfefrerg",
      sessionStorageSecret: "regnmj756y5t4reqw"
    }
  );
};
