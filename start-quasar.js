const args = [ 'dev' ];
const opts = { stdio: 'inherit', cwd: 'client/quasar', shell: true };
require('child_process').spawn('quasar', args, opts);
