import React, {useEffect, useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


// export const options = {
//     responsive: true,
//     plugins: {
//         legend: {
//             position: 'top' as const,
//         },
//         title: {
//             display: true,
//             text: 'Chart.js Line Chart',
//         },
//     },
// };

export default function TimelineChart({transactionsData=[]}) {

    const [activityData, setActivityData] = useState([])

    // useEffect(() => {
    //     console.log(transactionsData)
    // }, [transactionsData]);

    useEffect(() => {
        console.log(transactionsData)
        // transactionsData.map(dayData => {
        //     const receive_sum = parseFloat(dayData?.send_sum ? dayData?.send_sum : 0 )
        //     const send_sum = parseFloat(dayData?.receive_sum ? dayData?.receive_sum : 0)
        //     const sum = receive_sum + send_sum
        //     console.log(sum)
        //     // dayData.transactions.map(transaction => {
        //     //     // console.log(dayData)
        //     //     console.log(sum)
        //     // })
        //     setActivityData(prevData =>
        //         [...prevData, {date: new Date(dayData.day), value: sum }]
        //     );
        // })
        transactionsData.map(transaction => {
            setActivityData(prevData =>
                [...prevData, {date: new Date(transaction.date), value: parseFloat(transaction.usd_price) }]
            );
        })
    }, [transactionsData])

    useEffect(() => {

        console.log(activityData)
    }, [activityData]);

    const options =  {
        responsive: true,
        scales: {
            x: {
                type: 'category', // Использование категорийной оси
                labels: activityData.map(d => d.date), // Используйте только даты из вашего набора данных
                ticks: {
                    display: false,
                    autoSkip: false // Отключает автоматическое пропускание меток
                }
                // type: 'time',
                // time: {
                //     unit: 'day',
                //     displayFormats: {
                //         day: 'yyyy-MM-dd'
                //     }
                // }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Сумма транзакции'
                }
            }
        },
        elements: {
            line: {
                tension: 0,
                stepped: true
            }
        },
        // elements: {
        //     line: {
        //         tension: 0 // Отключает изгиб линий
        //     }
        // },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        // Измените формат вывода в соответствии с вашими требованиями
                        return `Значение: ${context.parsed.y}`;
                    }
                }
            },
            // tooltip: {
            //     callbacks: {
            //         label: (context) => {
            //             return `Сумма: ${context.raw.y}`;
            //         }
            //     }
            // },
            legend: {
                display: false
            }
            // legend: {
            //     position: 'top',
            // },
            // title: {
            //     display: true,
            //     text: 'Chart.js Line Chart',
            // },
        },
    };

    const chartData = {
        datasets: [
            {
                type: 'bar',
                label: 'Транзакции',
                data: activityData.map(d => ({
                    x: d.date,
                    y: d.value
                })),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                stepped: true // Включает ступенчатое отображение
            },
        ],
    };

    return (<>
        <Line data={chartData} options={options} />
    </>)
}