### Setup of https://explorer.fcash.cash on Ubuntu 16.04

    apt update
    apt upgrade
    apt install git python-software-properties software-properties-common nginx
    curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    npm install pm2 --global
    add-apt-repository ppa:certbot/certbot
    apt update
    apt upgrade
    apt install python-certbot-nginx
    
Copy content from [./explorer.fcash.cash.conf](./explorer.fcash.cash.conf) into `/etc/nginx/sites/explorer.fcash.cash.conf`

    certbot --nginx -d explorer.fcash.cash
    cd /etc/ssl/certs
    openssl dhparam -out dhparam.pem 4096
    cd /home/fcash
    git clone https://github.com/fcash-project/explorer.git
    cd /home/fcash/fcash-explorer
    npm install
    pm2 start bin/www --name "fcash-explorer"
