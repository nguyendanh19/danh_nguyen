// Cucumber config for the LEGACY suite (original hand-written cases).
// Run from the Demowebshop/ folder:  npx cucumber-js --config legacy/cucumber.js
module.exports = {
    default: {
        require: [
            'legacy/features/step-definitions/**/*.js',
            'legacy/features/support/**/*.js',
        ],
        paths: ['legacy/features/**/*.feature'],
        format: ['progress'],
    },
};
