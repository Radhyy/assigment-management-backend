# Backend Auto Deploy

Use these GitHub repository secrets:

- `DEPLOY_SSH_HOST`
- `DEPLOY_SSH_USER`
- `DEPLOY_SSH_PASSWORD`
- `DEPLOY_PATH`
- `DEPLOY_SERVICE_NAME` (optional)

`DEPLOY_PATH` must point to the backend repo directory on the VM. The workflow runs `npm ci --omit=dev` after pull. If `DEPLOY_SERVICE_NAME` is set and `systemctl` exists, it restarts that service; otherwise it restarts the Node process with `nohup`.
