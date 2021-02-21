# pull official base image
FROM node:15.8.0-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Installs all node packages
RUN yarn install
RUN yarn global add react-scripts@4.0.2

# add app
COPY . ./

# Uses port which is used by the actual application
EXPOSE 3000

# start app
CMD ["yarn", "start"]