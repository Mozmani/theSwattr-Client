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

# Create New Component shell script
<!-- Paste this into .bashrc or preferred shell profile -->
# open terminal in root and enter: rnc [compName] [CompName]
rnc() {
  mkdir src/components/"$1" ; cd src/components/"$1" ;
  touch "$1".scss "$1".js "$1".test.js ; .. ;
  echo "export { default as $2 } from './$1/$1';" >> index.js ; .. ; ..
;}
