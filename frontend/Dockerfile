FROM httpd:2.4

# Copy Angular build output into Apache document root
COPY ./public-html/ /usr/local/apache2/htdocs/

# Custom Apache config to be added later if desired
# COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# Apache listens on port 80 inside the container
EXPOSE 80
