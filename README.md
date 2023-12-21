# Astana IT University: Blockchain Hack 2023 

## Project name

CryptoInt (Crypto Intelligence)

## Selected problem
### Oraclus
Cryptocurrency network mapping tool: dynamic visualization of wallet interactions and transaction patterns

## Team name

Koresha

## Participants

* Full name: Ayan Ualiev. Email: 212345@astanait.edu.kz
* Full name: Pavel Kim. Email: 212397@astanait.edu.kz


## Abstract

We have created a web application that allows you to view transactions in Ethereum and the connections between senders and recipients within them

## Demo 

Our project is launched at this link: http://159.223.225.226:9000/

## Demo video

Video, how CryptoInt works: https://youtu.be/BYRH7m9ludg

## How to run

### Prerequisites:

- Docker

### Running

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

## Our team developed a visualization engine for oriented graphs especially for the project.

LINK: https://github.com/ualiyevvv/graph-visualizer

The library for visualizing graphs contains the following functionality:
- panning, zooming canvas
- graph structure management
- graph layout using the forced-directed method
- dynamic change in the graph structure and subsequent visualization
- animation of arrows in the directions of the edges

**We are very proud of this project and of course we will actively refine it!**


## Solutions and features implemented

Our solution is built on displaying some information about accounts on various blockchains, as well as a graph display of the progress of transactions between accounts, creating connections between them. You can also see groups of transactions for certain days, and the history of transactions between accounts

Our application works with Ethereum.
The principle is:
- You enter the account address in the search bar
- This account appears on the map with its latest transactions as a graph
- In separate windows there will be his transaction history for a certain period of time

## Challenges faced

- The main challenge we faced on the front end was to develop our own library for visualizing graphs. Of course, quality is far from large open source projects, but the library will be actively developed and acquired with new features
- It was difficult to choose which API to receive data from and how we would collect it, but we quickly solved this problem, and quite successfully
- Also, an API was written to work with Bitcoin like blockchains, but unfortunately, we did not have time to write the frontend on time

## Lessons learned

- We have studied what types of APIs there are for obtaining statistical information from blockchains 
- Studied the display of graphs


## Future work

Our project is very flexible for additions and extensions.
- You can add several options for displaying transaction progress
- Increase the number of supported blockchains
- Also, since all data is prepared on the backend, additional logic can be added, such as analyzing transactions for fraud and mixing

## Additional Sources 

- https://habr.com/ru/articles/719640/
- https://habr.com/ru/companies/bitfury/articles/434282/
- https://telegra.ph/Money-flow-Lovim-skamera-cherez-otslezhivanie-kriptovalyuty-11-09
- https://telegra.ph/Gid-po-rassledovaniyu-Bitcoin-tranzakcij-12-28
- https://habr.com/ru/articles/567198/
- https://habr.com/ru/companies/ods/articles/464715/

Platforms for visualizing graphs:
- platform.arkhamintelligence.com
- shard.ru
- ethtective.com
- platform.spotonchain.ai
- breadcrumbs.app