# Submitted to HackSMU VI
### Link to Devpost: https://devpost.com/software/ibm-please-hire-us

## What it does
Help you! The goal of Ebby is to provide a one-stop-shop for your general well-being. Whether that means mental or physical health, we've got you covered.

## How we built it
Our project has three main components:

### 1. Ebby, your personal health assistant
Ebby is intended to answer any questions students have about their personal wellness and provide guidance using resources provided by the university.

### 2. Peer Support Groups
If you are struggling with your mental health, know you aren't alone. Our customized support groups recommend communities for students who may be struggling. We give them an anonymized platform to talk to others who are going through the same thing.

### 3. Fitness Tracking
Using computer vision models, we track your exercises and form, letting you maintain your physical health in addition to your mental health.

## Challenges we ran into
Figuring out how to make sure the AI assistant gave information that was specific to SMU students. Our solution was to use web scraping and Retrieval Augmented Generation (RAG) with ChromaDB to prevent hallucinations and provide relative info. Another challenge we faced was how to make multiple websocket connections and maintain speed in the application.

## Accomplishments that we're proud of
The entirety of this project!! We all worked very hard to bring this idea together, and we hope it can be helpful for someone somewhere. Also, our design expert Veer did an amazing job with the graphics and visuals, we are very proud of him!

## What we learned
OpenAI API, OpenCV, Terraform, Web Socket, Flask, and many other technologies. Learned a lot about the intricacies of mental health issues.

## What's next for Ebby?
We would like to add moderation for the peer group text features to make sure it is always safe and appropriate for all users. We also want to develop the physical fitness feature with more details and variety of exercises. Originally we wanted to implement a scheduling feature with the chatbot assistant, that would analyze your calendar and a suggest times to make healthy decisions such as take a walk, drink water, exercise, or take medication. We ultimately did not have time to implement this feature, but that is something we would like to expand upon. We also used web scraping and RAG to increase the specificity of our health assistant, but ultimately didn't have time to integrate it into our frontend. Next, we intend to gamify the fitness portion of Ebby.
