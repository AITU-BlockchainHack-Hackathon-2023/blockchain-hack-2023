# Astana IT University: Blockchain Hack 2023 

## Project name

[Project name]

## Selected problem
### Oraclus
Cryptocurrency network mapping tool: dynamic visualization of wallet interactions and transaction patterns

## Team name

Koresha

## Participants

* Full name: Ayan Ualiev. Email: 212345@astanait.edu.kz
* Full name: Pavel Kim. Email: 212397@astanait.edu.kz


## Abstract

We have created a web application that allows you to view transactions in different blockchains and the connections between senders and recipients within them

## Demo video

[Link to a demo video showcasing your project, if any. Ensure it is less than 3 minutes long.]

## How to run

### Prerequisites:

- Docker

### Running

[Provide specific commands and environment for building and running your project, preferably in a containerized environment.]

Basic example:
```bash
# Clone the repository
git clone https://github.com/Levap123/blockchain-hack-2023.git

# Navigate to the project directory
cd blockchain hack

# Run frontend
make run_frontend_dev
```

Then go to https://localhost:9000

```bash
# you can run the backend locally
make run_backend
# but this is not required, since the frontend accesses the deployed API
```

## Inspirations

Our team is deeply inspired by the emerging environment of the web3 domain, an area that represents the next generation of Internet applications and services based on blockchain technology, decentralization and the token-based economy. Along with this, we are passionate about the art of graphically representing information. The ability to visually represent data to simplify complex concepts, identify patterns, and make data more accessible is the cornerstone of our project. 

We were very inspired by these products:
- https://anvaka.github.io/map-of-github
- https://anvaka.github.io/ngraph.path.demo
- https://anvaka.github.io/city-roads/

Namely, how the authors make excellent use of graphical display in order to make information simple and clear

## Technology stack and organization

- Golang for backend
- Zap for logs
- Oraclus, Ethplorer API
- React
- Docker

## Solutions and features implemented

Our solution is built on displaying some information about accounts on various blockchains, as well as a graph display of the progress of transactions between accounts, creating connections between them. You can also see groups of transactions for certain days, and the history of transactions between accounts

Our application works with Bitcoin like blockchains and Ethereum.
The principle is:
- You enter the account address in the search bar
- This account appears on the map with its latest transactions as a graph
- In separate windows there will be his transaction history for a certain period of time

## Challenges faced

- It was difficult to choose which API to receive data from and how we would collect it, but we quickly solved this problem, and quite successfully


## Lessons learned

- We have studied what types of APIs there are for obtaining statistical information from blockchains 
- Studied the display of graphs


## Future work

Our project is very flexible for additions and extensions.
- You can add several options for displaying transaction progress
- Increase the number of supported blockchains
- Also, since all data is prepared on the backend, additional logic can be added, such as analyzing transactions for fraud and mixing

