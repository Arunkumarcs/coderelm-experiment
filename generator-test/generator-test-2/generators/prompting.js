const yosay = require("yosay");
const chalk = require("chalk");

module.exports = async generator => {
  let props = {};

  // Have Yeoman greet the user.
  generator.log(
    yosay(
      `Welcome to the coderelm ${chalk.red(
        "generator-coderelm-express-mvc"
      )} generator!`
    )
  );

  const name = [
    {
      type: "input",
      name: "name",
      message: "Provide Application Name:",
      default: generator.appname
    }
  ];

  const version = [
    {
      type: "input",
      name: "version",
      message: "Provide Application Version:",
      default: "1.0.0"
    }
  ];

  const description = [
    {
      type: "input",
      name: "description",
      message: "Provide Application Description:",
      default: "Coderelm Express MVC Setup."
    }
  ];

  const repository = [
    {
      type: "input",
      name: "repository",
      message: "Provide Application Repository:",
      default: ""
    }
  ];

  const author = [
    {
      type: "input",
      name: "author",
      message: "Provide Application Author 'nanem <email@gmail.com>':",
      default: ""
    }
  ];

  const license = [
    {
      type: "input",
      name: "license",
      message: "Provide Application License:",
      default: "MIT"
    }
  ];

  props.name = await generator.prompt(name);
  props.version = await generator.prompt(version);
  props.description = await generator.prompt(description);
  props.repository = await generator.prompt(repository);
  props.author = await generator.prompt(author);
  props.license = await generator.prompt(license);

  return {
    name: props.name.name,
    version: props.version.version,
    description: props.description.description,
    repository: props.repository.repository,
    author: props.author.author,
    license: props.license.license
  };
};
