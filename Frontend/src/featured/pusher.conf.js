const Pusher = require('pusher-js');
export const initPusher = (environment="prod") => {
    var env_key = "4f777716babc57b94acb";
    // Pusher.logToConsole = environment === "dev";
    Pusher.logToConsole = true;
    if (environment === "prod") {
        env_key = "badc896ad3819312d807"
        Pusher.logToConsole = false;
    }
    return new Pusher(env_key, {
        cluster: 'eu',
        forceTLS: true
    });
}