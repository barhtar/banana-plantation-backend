# banana-plantation-backend

This repository contains a serverless function deployed on AWS using aws-sam.
The template.yaml file contains the necessary infrastructure to use the endpoint /position : lambda function, api gateway and the iam role.
In order to deploy, you need to configure the AWS CLI on your local.

How to run:

At the beginning, you need to run: "yarn install" in order to install all the necessary dependencies.

In order to run the lambda locally, you need to run your docker daemon and execute: "yarn start:api"

In order to deploy on AWS, run the command: "yarn deploy"

In order to execute unit tests, run: "yarn test"

WHat does this endpoint return:

The /position returns the new position of the tractor based on his actual position and also a list of instruction.
For example, if the tractor is in the (2, 1, E) and the instructions are: AGAADDADA, the new position will be (2, 2, O)
