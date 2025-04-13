# Flowgen Frontend

## Quick Start

### Prerequisites

- Node.js (v22.14.0+)
- pnpm (v10.6.2+) as package manager

### Configuration

Create a `.env` file in the project root and configure the following environment variables:

- `NEXT_PUBLIC_API_URL`: The URL of the Flowgen API.

It's always a good idea to start with the given example file, and edit the `.env` file with your own values:

```bash
cp .env.example .env
```

### Installation

First, start the Python server

```bash
# Install dependencies
pnpm install

# Run the project in development mode
pnpm dev
```

Then open your browser and navigate to http://localhost:3000

## Docker

You can also run this project with Docker.

First, you need make sure `.env` file is ready.

Second, to build a Docker image of your own web server:

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=YOUR_FLOWGEN_API -t flowgen-web .
```

Final, start up a docker container running the web server:

```bash
# Replace flowgen-web-app with your preferred container name
docker run -d -t -p 3000:3000 --env-file .env --name flowgen-web-app flowgen-web

# stop the server
docker stop flowgen-web-app
```

### Docker Compose

You can also setup this project with the docker compose:

```bash
# building docker image
docker compose build

# start the server
docker compose up
```
