FROM node:18-slim AS react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

FROM nginx:1.23.3-perl
COPY nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=react-build /app/build /usr/share/nginx/html

ENV PORT 5000
ENV HOST 0.0.0.0
EXPOSE 5000
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
