# CaptionAI

A fullstack, computer vision and natural language processing web application that allows users, authenticated or otherwise, to automatically caption images and view them immediately online, either publicly or privately.

## General architecture

This project has been separated into three separate repositories:

- [frontend](https://github.com/Kyle1297/image-captioning-frontend)
- [backend](https://github.com/Kyle1297/image-captioning-backend)
- [image-captioning AI](https://github.com/Kyle1297/image-captioning-ai)

It is currently hosted on AWS using serval services:

- S3 -> to store media and static files, i.e. images, frontend and backend static files
- lambda -> to run the image captioner (cost-effective, deployed as docker container, automatically triggered by image upload to S3 bucket). Soon, an image compression function will be added
- ECR -> for storage of AI and backend docker containers
- SNS -> used to capture result of the captioner lambda function and send back to server
- EC2 -> single instance to host server
- RDS -> to host postgres SQL database
- CloudWatch -> to send lambda event trigger (every 15 minutes) to captioner lambda function to limit lambda cold starts
- CloudFront -> content delivery network (CDN) to host and cache static content from S3 and link the backend api and admin

### Frontend technologies

- React with Typescript and Websockets
- Redux -> state management
- Material UI -> primary stylling library
- GitHub Actions -> frontend CI for automated testing and deployment

### Backend technologies

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

### Image caption AI infrastructure

Essentially, an Attentive Transformer network is employed to build the model. There exists an encoder block with two sub-layers, a multi-head self-attention mechanism layer with a simple, position-wise fully-connected feed-forward network layer. The following decoder layer also employs multi-head attention.

The model is also built off the Flickr8k database, currently having only been trained with a small subset of about 40000 images and captions. This is quite small and as such, the model only performs moderately well. If a larger database was used (including access to powerful GPUs), there would be a significant improvement in the results.

Key technologies and libraries utilised:

- Attentive Transformer model
- Docker-Compose and Docker - ease of deployment and robostness
- Poetry for dependency management
- Juptyer notebook, Python
- Numpy, Keras, Tensorflow, Sklearn, nltk, matplotlib, pandas
- Subset of the Flickr8k database -> around 40000 images and captions

* Large credits goes to [Tensorflow](https://www.tensorflow.org/tutorials/text/image_captioning)

### Features to come

- Compress all images upon upload to S3 through lambda function
- Add Kubernetes deployment config
- Train AI model on much larger database
- Set-up guest read-only AWS IAM credentials for external users
- Split Daphne to only handle websocket while gunicorn handles HTT
