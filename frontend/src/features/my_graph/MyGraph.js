import React, {useEffect} from "react";
import {Graph} from "./lib/graph";
import {TooltipManager} from "./lib/tooltipManager";
import {ForceDirectedGraph} from "./lib/graphLayout";

export default function MyGraph({transactionsData=[], address=''}) {


    const api_url = `http://159.223.225.226:8080/api/v1/`

    async function fetchTransactionsAndBuildGraph(clickedNode, graph, url=api_url) {
        // console.log('FEETCH')
        try {
            const response = await fetch(url+`transaction/${clickedNode.id}/group?blockchain=ethereum&filter=with`);
            if (!response.ok) {
                // throw new Error(`HTTP error! status: ${response.status}`);
            }
            const transactions = await response.json();
            // console.log('FEETCH transactions', transactions)

            // Call the function to build the graph with the fetched transactions
            buildGraphFromTransactions(transactions, graph, clickedNode);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    function buildGraphFromTransactions(transactions, graph, nodeRoot) {
        graph.addNode(nodeRoot)
        transactions.forEach(day => {
            let edgeWeight = day.receive_sum;
            let sourceNode, targetNode;
            let transactionsArray = []

            const txNode = {
                id: day.transactions[0].with,
                size: (day.receive_sum ? day.receive_sum : 0) + (day.send_sum ? day.send_sum : 0)
            }

            day.transactions.forEach(tx => {
                transactionsArray.push(tx); // Or select specific properties
                sourceNode = tx.is_sender ? nodeRoot : txNode;
                targetNode = tx.is_sender ? txNode : nodeRoot;
            });

            graph.addNode(txNode);

            graph.addDirectedEdge(sourceNode, targetNode, edgeWeight, {
                transactions_count: day.transactions.length,
                transactions: transactionsArray
            });

        });
    }

    useEffect(() => {
        if (address === '') {
            console.log('GRAPH NOT START')
            return
        }
        console.log('GRAPH START')
        const myGraph = new Graph();
        const canvas = document.getElementById("graphCanvas");
        const tooltip = document.getElementById("tooltip");
        const tooltipManager = new TooltipManager(tooltip);
        const visualization = new ForceDirectedGraph(myGraph, canvas, tooltipManager);

        // buildGraphFromTransactions(transactionsData, myGraph, {id: address})
        // visualization.runForceLayout();
        (async () => {
            try {
                // buildGraphFromTransactions(transactionsData, myGraph, {id: address})
                await fetchTransactionsAndBuildGraph({id: address}, myGraph);
                // this.runForceLayout();

                visualization.runForceLayout();
            } catch (error) {
                console.error('Error in graph initialization:', error);
            }
        })();

        visualization.on('nodeDragStart', (node) => {
            (async () => {
                try {
                    await fetchTransactionsAndBuildGraph(node, myGraph);
                    // this.runForceLayout();

                    visualization.updateSimulation()
                } catch (error) {
                    console.error('Error in graph initialization:', error);
                }
            })();
        });
    }, [transactionsData])

    return (<>
        <canvas id='graphCanvas'></canvas>
        <div id="tooltip" className="tooltip">Tooltip content</div>
    </>)

}