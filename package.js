Package.describe({
    name: 'jaaaco:editable',
    version: '0.0.3',
    // Brief, one-line summary of the package.
    summary: 'Form inputs that automagically save data to collection',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/jaaaco/editable.git',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('jquery');
    api.addFiles('editable.js', ['client']);
});
