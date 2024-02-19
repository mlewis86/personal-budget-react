import React, { useEffect } from "react";
import Chart from 'chart.js/auto';
import axios from "axios";

const Chartjs = () => {
    useEffect(() => {
        getBudget();
    }, );

    
    let myChart;
    function createChart(data){
        if (myChart) {
            myChart.destroy();
            myChart = null;
        }
        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
            maintainAspectRatio: false,
            }
        });
    };

    const getBudget = () => {
        axios.get('http://localhost:3000/budget')
            .then(function (res) {
                console.log(res.data);
                const dataSource = {
                    datasets: [
                        {
                            data: res.data.myBudget.map(item => item.budget),
                            backgroundColor: [
                                '#ffcd56',
                                '#ff6384',
                                '#36a2eb',
                                '#fd6b19',
                                '#74382b',
                                '#7f1a93',
                                '#1a9346'
                            ]
                        }
                    ],
                    labels: res.data.myBudget.map(item => item.title)
                };
                createChart(dataSource);
            })
            .catch(function (error) {
                console.error('Error', error.message);
            });
    };

    return (
        <div className="Chart-con">
           <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    );
};

export default Chartjs;