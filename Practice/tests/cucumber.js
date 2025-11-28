// const hooks = require('./hooks');
// module.exports = {
//     default: `--require features/step-definitions/**/*.js --publish-quiet`,
// };

const hooks = require('./hooks');
module.exports = {
  default: `--require tests/step-definitions/**/*.js tests/features/**/*.feature --publish-quiet`
};