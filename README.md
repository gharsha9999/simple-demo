# MovieHub — Static Frontend Demo

A simple movie dashboard built with HTML, CSS, and JavaScript.

## Features
- Language dropdown: Telugu, Tamil, Malayalam, Hindi, Korean
- Search sample movie titles
- Demo wishlist and completed sections
- Responsive dark cinematic design
- No backend, database, API, or build tools required

## Run locally
Open `index.html` in your browser, or use VS Code's Live Server extension.

## Deploy on Ubuntu EC2 with Apache
1. Install Apache:
   ```bash
   sudo apt update
   sudo apt install -y apache2 git
   ```
2. Clone your GitHub repository:
   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```
3. Copy the site files to Apache's document root (replace `moviehub` with your cloned folder name):
   ```bash
   sudo cp -r moviehub/. /var/www/html/
   ```
4. Open inbound TCP port 80 in the EC2 security group, preferably restricted to your IP for a demo.
5. Visit `http://YOUR_EC2_PUBLIC_IP`.

On Amazon Linux, the package/service are usually named `httpd`:
```bash
sudo dnf install -y httpd git
sudo systemctl enable --now httpd
```
Then copy the files into `/var/www/html/` and allow inbound TCP port 80 in the security group.

## Demo limitation
Wishlist and Completed selections are held in JavaScript memory only. They reset when the page is refreshed. This is intentional for a frontend-only demo.
=======
# simple-demo
Deploy a simple static website on AWS Server
>>>>>>> 816630658189d9dc928858fbb33741fdd78d5b5c
