| **Action**                        | **Command**                              | **Notes**                                            |
| --------------------------------- | ---------------------------------------- | ---------------------------------------------------- |
| ✅ List running containers         | `docker ps`                              | Shows active containers only                         |
| 📋 List all containers            | `docker ps -a`                           | Includes stopped containers                          |
| 📦 List all images                | `docker images`                          | Shows all Docker images on your system               |
| ⏹ Stop a running container        | `docker stop festive_euclid`             | Replace `festive_euclid` with your container name/ID |
| ▶️ Start a stopped container      | `docker start festive_euclid`            |                                                      |
| 🔄 Restart a container            | `docker restart festive_euclid`          |                                                      |
| 🗑 Remove a container             | `docker rm festive_euclid`               | Must stop it first                                   |
| 🧼 Remove an image                | `docker rmi shoe-store-api`              | Must remove container using it first                 |
| 🛠 Build an image from Dockerfile | `docker build -t shoe-store-api .`       | Run in directory with `Dockerfile`                   |
| 🧪 Run a container (one-off)      | `docker run -p 5000:5000 shoe-store-api` | For quick testing without naming                     |
| 📂 View logs of a container       | `docker logs festive_euclid`             | See console output inside container                  |



| **Step** | **Action**                                        | **What We’ll Do**                                                                                       |
| -------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1️⃣      | **Stop & Remove Current Container**               | Gracefully shut down the running container                                                              |
| 2️⃣      | **Create `.dockerignore`**                        | Prevent unnecessary files (like `node_modules`, `logs`, `.env`) from being copied into the Docker image |
| 3️⃣      | **Use Environment Variables Securely**            | Ensure `.env` is not baked into the image, but passed at runtime                                        |
| 4️⃣      | **Refine Dockerfile** (if needed)                 | Double-check it's efficient (we’re already using Node + Alpine, so we’re good)                          |
| 5️⃣      | **Use Docker Compose** (optional but recommended) | So you can run MongoDB + Node API together seamlessly                                                   |
| 6️⃣      | **Rebuild Clean Image**                           | Using improved setup                                                                                    |
| 7️⃣      | **Start Up Again**                                | With everything clean and streamlined                                                                   |



# used at runtime
docker run --env-file .env -p 5000:5000 shoe-store-api

# These files should be committed to Git:
| File                              | Reason                                                       |
| --------------------------------- | ------------------------------------------------------------ |
| `Dockerfile`                      | Defines how to build the container image.                    |
| `.dockerignore`                   | Prevents unnecessary files from being copied into the image. |
| `docker-compose.yml` *(if using)* | Manages multi-container setups (DB, backend, etc.).          |

# What to include in .gitignore
| File/Folder     | Reason                                                      |
| --------------- | ----------------------------------------------------------- |
| `node_modules/` | Rebuilt during Docker build; unnecessary in Git.            |
| `.env`          | Contains secrets (JWT secret, DB credentials, etc.).        |
| `*.log`         | Avoid committing log files like `error.log`, `combined.log` |
| `*.local`       | If you use any local overrides                              |

# When do I need to rebuild the image?
| Change Made                          | Rebuild Required? | Why                                       |
| ------------------------------------ | ----------------- | ----------------------------------------- |
| You changed **code files**           | ✅ Yes             | Code is baked into the image              |
| You updated `package.json`           | ✅ Yes             | New dependencies must be installed        |
| You changed `.env` or runtime config | ❌ No (usually)    | These are injected at runtime (not built) |
| You only changed **data**, not code  | ❌ No              | Restart the container instead             |

# Rebuild command
docker build -t shoe-store-api .

# ⚡ Bonus: Docker Workflow Tip
For fast dev cycles:

# 1. Stop the current container
docker stop <container_id_or_name>

# 2. Remove it (optional, especially if reusing name)
docker rm <container_id_or_name>

# 3. Rebuild image
docker build -t shoe-store-api .

# 4. Start container
docker run -p 5000:5000 --name shoe-store shoe-store-api

# 🔄 Commands you'll frequently use:
| Task                         | Command                                    |
| ---------------------------- | ------------------------------------------ |
| Build everything             | `docker compose build`                     |
| Start all containers         | `docker compose up`                        |
| Start in background          | `docker compose up -d`                     |
| Stop containers              | `docker compose down`                      |
| View logs                    | `docker compose logs -f`                   |
| Remove all containers/images | `docker system prune -a` (⚠️ destructive!) |


# ✅ Development
Your local .env file has:

Debug-friendly settings (e.g., NODE_ENV=development)

Long-lived JWT tokens

Logging to console

Possibly relaxed security (e.g., no HTTPS)

Used while actively coding.

# ✅ Production
You need stricter, optimized, and secure settings:

NODE_ENV=production

Shorter JWT expiries

Logging to files or services

Secure services (HTTPS, rate limiting, CORS)

Optimized images, minified code (for frontend)
