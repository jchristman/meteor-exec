Package.describe({
  name: 'jchristman:exec',
  summary: 'A simple API for executing server-side commands and w/ stdout/stdin reading',
  version: '1.0.0',
  git: 'https://github.com/jchristman/meteor-exec'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.addFiles('exec.js',['server','client']);
  api.export('Exec',['server','client']);
});
