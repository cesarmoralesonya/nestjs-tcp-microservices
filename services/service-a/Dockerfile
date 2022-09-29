# Arguments:
ARG NODE_VERSION=16.15.0

FROM node:${NODE_VERSION} as builder

WORKDIR /source

# Install dependencies
COPY package.json ./
COPY host.tsconfig.json ./
RUN npm install

# Build the app
COPY ./src ./src
RUN npm run build:host

#Pruning dev modules from the build
RUN npm prune --production

FROM node:${NODE_VERSION}-alpine3.15 as runtime

LABEL version="1.0.0"
LABEL description="Docker image of runtime for service a"
LABEL maintainer="Cesar Morales <cesarmoralesonya@gmail.com>"

WORKDIR /app

ARG NODE_ENV=production
ARG NODE_PORT=3000
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${NODE_PORT}

# Create group app and user app
RUN addgroup --gid 2000 -S app && adduser --uid 2000 -S app -G app
# Set permissions for app user for the WORKDIR    
RUN chown -R app:app /app
# Switch to the created user
USER app

#Copy modules to the runtime
COPY --from=builder /source/node_modules ./node_modules
#Copy javascript files to the runtime
COPY --from=builder /source/dist ./dist

EXPOSE ${NODE_PORT}

CMD [ "node","dist/main" ]