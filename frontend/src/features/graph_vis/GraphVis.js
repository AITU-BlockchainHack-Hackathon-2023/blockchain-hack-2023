import React, {useEffect, useState} from 'react';
import Graphin, {Behaviors} from '@antv/graphin';

export default function GraphVis({ data = [] }) {

    const [nodes, setNodes] = useState([])
    const [edges, setEdges] = useState([])

    const {
        DragCanvas,
        ZoomCanvas,
        DragNode,
        ActivateRelations
    } = Behaviors;

    const layout = {
        type: 'graphin-force',
        preset: {
            type: 'concentric',
        },
        animation: true,
        // defSpringLen: defSpreingLen,
    };

    useEffect(() => {

        setNodes(prevData =>
            [...prevData, {
                id: '0xB3764761E297D6f121e79C32A65829Cd1dDb4D32',
                label: '0xB3764761E297D6f121e79C32A65829Cd1dDb4D32',
                style: {
                    keyshape: {
                        fill: '#91d5ff',
                        stroke: '#40a9ff',
                    },
                },
            }]
        );
        data.map(transaction => {
            // if (transaction.is_sender) {
            //
            // }

            setEdges(prevData =>
                [...prevData,
                    {
                        source: transaction.is_sender ? '0xB3764761E297D6f121e79C32A65829Cd1dDb4D32' : transaction.with,
                        target: transaction.is_sender ? transaction.with : '0xB3764761E297D6f121e79C32A65829Cd1dDb4D32',
                        label: transaction.hash,
                    }
                ]
            );

            setNodes(prevData =>
                [...prevData, {
                    id: transaction.with,
                    label: transaction.with,
                    style: {
                        keyshape: {
                            fill: '#91d5ff',
                            stroke: '#40a9ff',
                        },
                    },
                }]
            );
        })
    }, [data]);

    return (<>
        <Graphin
            data={{nodes, edges}}
            layout={layout}
            // theme={{ mode: 'dark' }}
        >
            <ZoomCanvas enableOptimize />
            <DragNode />
            <ActivateRelations trigger="click" />
        </Graphin>
    </>);
};

