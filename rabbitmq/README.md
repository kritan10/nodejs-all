# Rabbit MQ Basics

Basic implementation of Rabbit MQ features using a AMQP client.
They are all based on the [official rabbitMQ tutorials](https://www.rabbitmq.com/getstarted.html)

## Table of Contents

1. hello-world
2. work-queues
3. rpc-pattern

### hello-world

-   implementation of producer-consumer pattern
-   a basic implementation of rabbitMQ
-   based on [tutorial 1](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html)

### work-queues

-   implementation of producer-consumer pattern
-   used for distributing task between multiple workers
-   based on [tutorial 2](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html)

### rpc-pattern

-   implementation of remote procedure call
-   use of different concepts like request/reply pattern and correlation_id
-   based on [tutorial 6](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html)
