# Galae

Galae is a fork of [mailcow-dockerized](https://github.com/mailcow/mailcow-dockerized). Upstream releases are merged into `master` by hand (see the `master-upstream` merge commits).

Avoid editing upstream mailcow files unless you need to: every change can cause a conflict at the next upstream merge.

## Database connections: TCP, not the Unix socket

Galae reaches MariaDB over TCP, using the `DBHOST`/`DBPORT` environment variables, not the mysql Unix socket. The deployment sets those variables, not this repo's `docker-compose.yml`, so don't flag them as missing there.

Upstream merges can add new socket-based DB connections. Git won't report them as conflicts, so after each upstream merge:

- Search for new socket usages and port them to host/port:
  `grep -rnE 'unix_socket|mysqld.sock|database_sock' --exclude-dir=.git .`
- Exceptions, which stay as they are:
  - `data/Dockerfiles/watchdog/check_mysql_slavestatus.sh` (the caller already passes the right values)
  - `helper-scripts/backup_and_restore.sh` (Galae doesn't use it)
  - `helper-scripts/docker-compose.override.yml.d/EXTERNAL_MYSQL_SOCKET/` (an upstream template)

## No `update.sh`

Galae doesn't run mailcow's `update.sh`. Apply any upstream migration step it would have done by hand, for example new `mailcow.conf` options. Check the upstream release notes and the `update.sh`/`generate_config.sh` diff at each merge.

## Patched container scripts

Galae doesn't build its own images: patched scripts under `data/Dockerfiles/*` are mounted over the files in the upstream images. If an upstream merge renames or moves a script (check the `COPY` paths in the Dockerfiles), the deployment mounts must follow, or the patch is silently dropped.
