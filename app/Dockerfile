FROM node:18.14.2-alpine as base
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S client
RUN chown -R client /opt/app
COPY package.json ./
COPY gulpfile.js ./
COPY yarn.lock ./

# DEVELOPMENT app PROFILE
FROM base as development
ENV NODE_ENV=development
RUN yarn install
# && npm cache clean --force
COPY . ./
EXPOSE 3000
RUN ls -l -a
CMD ["npm", "run", "dev"]
