module.exports = {
    default: {
        require: ['./steps/**/*.js'],
        format: ['json:./reports/cucumber-report.json', 'html:./reports/cucumber-report.html'],
        publishQuiet: true
    }
};
