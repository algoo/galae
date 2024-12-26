import os
import subprocess
from jinja2 import Environment, FileSystemLoader


def sites_default_conf(env, template_vars):
  config_name = "sites-default.conf"
  template = env.get_template(f"{config_name}.j2")
  config = template.render(template_vars)

  with open(f"/etc/nginx/includes/{config_name}", "w") as f:
    f.write(config)

def nginx_conf(env, template_vars):
  config_name = "nginx.conf"
  template = env.get_template(f"{config_name}.j2")
  config = template.render(template_vars)

  with open(f"/etc/nginx/{config_name}", "w") as f:
    f.write(config)

def prepare_template_vars():
  template_vars = {
    'IPV4_NETWORK': os.getenv("IPV4_NETWORK", "172.22.1"),
    'TRUSTED_NETWORK': os.getenv("TRUSTED_NETWORK", False),
    'SKIP_RSPAMD': os.getenv("SKIP_RSPAMD", "n").lower() in ("y", "yes"),
    'SKIP_SOGO': os.getenv("SKIP_SOGO", "n").lower() in ("y", "yes"),
    'NGINX_USE_PROXY_PROTOCOL': os.getenv("NGINX_USE_PROXY_PROTOCOL", "n").lower() in ("y", "yes"),
    'MAILCOW_HOSTNAME': os.getenv("MAILCOW_HOSTNAME", ""),
    'ADDITIONAL_SERVER_NAMES': os.getenv("ADDITIONAL_SERVER_NAMES", "").replace(',', ' '),
    'HTTP_PORT': os.getenv("HTTP_PORT", "80"),
    'HTTPS_PORT': os.getenv("HTTPS_PORT", "443"),
    'SOGOHOST': os.getenv("SOGOHOST", "sogo-mailcow"),
    'RSPAMDHOST': os.getenv("RSPAMDHOST", "rspamd-mailcow"),
    'PHPFPMHOST': os.getenv("PHPFPMHOST", "php-fpm-mailcow"),
  }

  ssl_dir = '/etc/ssl/mail/'
  template_vars['valid_cert_dirs'] = []
  for d in os.listdir(ssl_dir):
    full_path = os.path.join(ssl_dir, d)
    if not os.path.isdir(full_path):
      continue

    cert_path = os.path.join(full_path, 'cert.pem')
    key_path = os.path.join(full_path, 'key.pem')
    domains_path = os.path.join(full_path, 'domains')

    if os.path.isfile(cert_path) and os.path.isfile(key_path) and os.path.isfile(domains_path):
      with open(domains_path, 'r') as file:
        domains = file.read().strip()
      domains_list = domains.split()
      if domains_list and template_vars["MAILCOW_HOSTNAME"] not in domains_list:
        template_vars['valid_cert_dirs'].append({
          'cert_path': full_path + '/',
          'domains': domains
        })

  return template_vars

def main():
  env = Environment(loader=FileSystemLoader('./etc/nginx/conf.d'))

  # Render config
  print("Render config")
  template_vars = prepare_template_vars()
  sites_default_conf(env, template_vars)
  nginx_conf(env, template_vars)

  # Validate config
  print("Validate config")
  subprocess.run(["nginx", "-qt"])


if __name__ == "__main__":
  main()
