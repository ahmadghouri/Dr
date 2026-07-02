#!/bin/bash
 
echo "=================================="
echo "Starting Deployment..."
echo "=================================="
 
PROJECT_DIR="/var/www/Dr"
 
# Latest Code
cd $PROJECT_DIR || exit
git pull origin main
 
#####################################
# Backend
#####################################
 
echo "Installing Backend Dependencies..."
 
cd $PROJECT_DIR/server || exit
npm install
 
echo "Restarting Backend..."
 
pm2 restart Dr-api || pm2 start index.js --name Dr-api
 
#####################################
# Frontend
#####################################
 
echo "Installing Frontend Dependencies..."
 
cd $PROJECT_DIR/client || exit
npm install
 
echo "Building Frontend..."
 
npm run build
 
#####################################
# Nginx
#####################################
 
echo "Reloading Nginx..."
 
sudo nginx -t && sudo systemctl reload nginx
 
#####################################
# Save PM2
#####################################
 
pm2 save
 
echo "=================================="
echo "Deployment Completed Successfully!"
echo "=================================="
 
pm2 list