module.exports = {
    default: {
        require: [
            'features/step-definitions/**/*.js',
            'features/support/**/*.js',
        ],
        paths: ['features/**/*.feature'],
        format: ['progress'],
    },
};
