# npm i
node-sass <!--? read sass files -->
react-test-renderer <!--? for snapshots -->

# npm i -D

# eslintrc.yml

# Vercel
<!--? basic setup -->
{
  "version": 2,
  "routes": [
    {
      "src": "^/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": ".*",
      "dest": "/index.html"
    }
  ]
}

# Dockerfile
FROM node:alpine <!--? smallest size distro -->

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./

CMD ["npm", "start"]