import tftp from "tftp";

export function send(configFile, host, options) {
  const client = tftp.createClient ({
    host: host,
    port: 69
  });
  const key = `config${options.configNo}/${options.adminpass}`;

  const opts = {
    userExtensions: {
      [key]: ""
    }
  };

  client.put (configFile, opts, error => {
    if (error) {
      return console.error (error);
    }
  });
}