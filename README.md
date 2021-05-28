# CaptionAI

A fullstack, computer vision and natural language processing web application that allows users, authenticated or otherwise, to automatically caption images and view them immediately online, either publicly or privately.

www.techwithkyle.com

## General architecture

This project has been separated into three repositories:

- [frontend](https://github.com/Kyle1297/image-captioning-frontend)
- [backend](https://github.com/Kyle1297/image-captioning-backend)
- [image captioning AI](https://github.com/Kyle1297/image-captioning-ai)

It is currently hosted on AWS using the following services:

- S3 -> to store media and static files, i.e. images, frontend and backend static files
- Lambda -> to run the image captioner (cost-effective, deployed as docker container, automatically triggered by image upload to S3 bucket). Soon, an image compression function will be added
- ECR -> for storage of AI and backend docker containers
- SNS -> used to capture result of the captioner lambda function and send back to server
- EC2 -> single instance to host server
- RDS -> to host postgres SQL database
- CloudWatch -> to send lambda event trigger (every 15 minutes) to captioner lambda function to limit lambda cold starts
- CloudFront -> content delivery network (CDN) to host and cache static content from S3 and link the backend api and admin

## Infrastructure and technologies

### Frontend

- React with Typescript and Websockets
- Redux -> state management
- Material UI -> primary styling library
- GitHub Actions -> frontend CI for automated testing and deployment

### Backend

- Django (including Django Admin)
- Django channels -> websockets for immediate capture of response (i.e. image caption) from SNS and the lambda captioner function
- Docker-Compose and Docker - ease of deployment and robostness
- Redis -> act as channel layer for websocket. Could also be used as cache
- Nginx - reverse proxy
- Daphne - to handle HTTP and Websocket connections (in future, will split with gunicorn)
- Certbot - HTTPS config and automatic certificate renewals
- Postgres - SQL database
- GitHub Actions -> backend CI for automated testing and deployment
- Poetry for dependency management

### Image caption AI

Essentially, an Attentive Transformer network is employed to build the model. There exists an encoder block with two sub-layers, a multi-head self-attention mechanism layer with a simple, position-wise fully-connected feed-forward network layer. The decoder layer also employs multi-head attention.

The model is built off the Flickr8k database, currently having only been trained with a small subset of about 40000 images and captions. This is quite small and as such, the model only performs moderately well. If a larger database was used, there would be a significant improvement in the results.

Key technologies and libraries utilised:

- Attentive Transformer model
- Docker-Compose and Docker - ease of deployment and robostness
- Poetry for dependency management
- Juptyer notebook, Python
- Numpy, Keras, Tensorflow, Sklearn, nltk, matplotlib, pandas
- Subset of the Flickr8k database -> around 40000 images and captions

Large credits go to [Tensorflow](https://www.tensorflow.org/tutorials/text/image_captioning).

## Notes

The project is already configured for development and production environments.

\*\* Note, you will need to remove 'sample' from the respective .env files, and if you like, update them.

### Development

For development, simply fork the frontend repository and perform "npm install" and "npm start" to start the react development server. Then, fork the backend repository and perform "make dev-up". This is will set up the API server and admin site.

#### Database

Any changes to the dev database will not persist upon container restart. This is intentional to allow developers to be as disruptive as they like to the dev database without lasting consequences (perfect for development and testing).

To set-up a dev database from pre-existing data, simply place a postgres sql backup file in the 'dev/db_db_backup/' folder, labeled as 'db_backup.sql'. This database file will then be used as the starting dev database on every container restart.

#### Image upload and captioner

If you intend to upload images and caption them, you need to configure the relevant S3 buckets, AI lambda function (with its associated AI docker container) and SNS topic. Please use the provided guest AWS IAM credientials to review their configuration on AWS.

This is provided you have successfully trained the AI model and generated the model weights, tokenizer and image_features_extract_model - and placed them in their respective file locations. Please use the provided lambda_function.py file for guidance. For reference, these files could not be uploaded due to GitHub's size limitations. Refer to this Kaggle project to access the [Flickr8k data](https://www.kaggle.com/shadabhussain/automated-image-captioning-flickr8/data).

In addition, you will need to set up a 'fake' testing server/domain. Ngrok may be of use here. Currently, you cannot subscribe to an SNS topic from your localhost. Once you set up this up, replace the now useless ngrok.io host in the ALLOWED_HOSTS varialbe of the .env file with your own. While you are there, also change the USE_S3 variable to True.

### Production

Refer to the provided notes above and the guest AWS IAM credientials to review and set up the correct AWS configuration. Make sure you have updated your .env variables.

Once set up, follow the below steps.

#### Frontend

In the package.json file, replace the S3 bucket name in the s3-deploy script with your own frontend S3 bucket name.

Then, run 'npm run deploy' to build and deploy the frontend to your S3 bucket. You can then correctly set-up your AWS CloudFront service.

#### Backend

First, you will need to open the 'init-letsencrypt.sh' file and update the domains, email and staging fields on lines 8-12. Then, navigate to the prod/data/nginx/app.conf file and change all instances of 'techwithkyle.com' with your own domain.

Next, run 'make prod-build' to build your backend containers, which can then be deployed to ECR. The 'aws ecr' commands in the provided Makefile will be helpful here.

Following this, run 'make scp-transfer' using your EC2 instance's .pem file to transfer the relevant backend files to your server. Then, use 'make ssh-login' to log into the server. Here, you can update your server's packages, install docker-compose, pull your backend container from ECR, and run the 'init-letsencrypt.sh' file to generate a HTTPS certificate.

Once successful, run 'docker-compose up -d' to start your production backend. Assuming AWS is configured correctly, your website should now be available on the internet at your specified domain.

## Features to come

- Compress all images upon upload to S3 through lambda function
- Add Kubernetes deployment config
- Train AI model on much larger database
- Set-up guest read-only AWS IAM credentials for external users
- Split Daphne to only handle websocket while gunicorn handles HTTP
- More thorough testing
