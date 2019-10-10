FROM node:12-slim

LABEL "com.github.actions.name"="Mark As Spam"
LABEL "com.github.actions.description"="Mark GitHub issues as spam"
LABEL "com.github.actions.icon"="slash"
LABEL "com.github.actions.color"="purple"
LABEL "repository"="https://github.com/balevine/mark-as-spam"
LABEL "homepage"="https://github.com/balevine/mark-as-spam"
LABEL "maintainer"="balevine"

COPY . .

RUN npm install --production

ENTRYPOINT ["node", "/main.js"]
