FROM node:18.14.2-alpine as base
RUN mkdir -p /opt/app
WORKDIR /opt/app
RUN adduser -S app
RUN chown -R app /opt/app
COPY package*.json ./
COPY yarn.lock ./

# DEVELOPMENT app PROFILE
FROM base as development
ENV NODE_ENV=development
RUN npm install --global yarn@1.22.19
RUN yarn install && npm cache clean --force
COPY . ./
EXPOSE 3000
CMD ["yarn", "dev"]
