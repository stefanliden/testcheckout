import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import 'chartjs-plugin-streaming';

declare var require: any
const moment = require('moment');
moment.suppressDeprecationWarnings = true;

var primary = localStorage.getItem('primary_color') || '#E4326B';


// Chart 4 Financial chartist chart
export var finance: Chart = {
	type: 'Bar',
	data: {
		labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
		series: [
			[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
		]
	},
	options: {
		high: 10,
		low: -10,
		showArea: true,
		showLine: true,
		showPoint: true,
		axisX: {
			showLabel: true,
			showGrid: true
    },
    axisY: {
			showLabel: true,
			showGrid: true
		},
		height: 250,
	}
};

export var production: Chart = {
	type: 'Line',
	data: {
		labels: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2011 Q5', '2011 Q6', '2011 Q7'],
		series: [
			[2,5, 2, 5, 3, 5, 2]
		]
	},
	options: {
		chartPadding: {
      top: 10,
        bottom: 0,
        right: 0,
        left: 0,
  },
		showArea: true,
		showLine: true,
    showPoint: true,
    colors:"#a24efe",
		axisX: {
			showLabel: false,
			showGrid: false
    },
    axisY: {
			showLabel: false,
			showGrid: false
		},
		height: 150,
	}
};

export var productListing: Chart = {
	type: 'Bar',
	data: {
		labels: ['2011 Q1', '2011 Q2', '2011 Q3', '2011 Q4', '2011 Q5', '2011 Q6', '2011 Q7','2011 Q8','2011 Q9','2011 Q10','2011 Q11'],
		series: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11],
      [1, 2, 2, 3, 3, 3, 4, 5, 6, 6,7],
      [1, 1, 1, 2, 2, 2, 2, 3, 3, 4,5]
		]
	},
	options: {
    seriesBarDistance: 4,
    stackBars:true,
		showArea: true,
		showLine: true,
		showPoint: true,
		axisX: {
			showLabel: false,
			showGrid: false
    },
    axisY: {
			showLabel: false,
			showGrid: false
		},
		height: 286,
	}
};




export var productionChartColors: Array<any> = [{
  fill: false,
  borderColor: primary,
  borderWidth: 2.5,
  pointBackgroundColor: primary,
  pointBorderColor: primary
}];
export var productionChartLegend = false;




//dought chart
export var doughnutChartLabels: string[] = ['Selling', 'Marketing', 'Production','Holiday'];
export var doughnutChartData: number[] = [300, 300, 200,300];
export var doughnutChartColors: any[] = [{ backgroundColor: ["#88D563", "#5C37FB", "#E4326B","#A052FD"] }];
export var doughnutChartType = 'doughnut';
export var doughnutChartOptions: any = {
  doughnutChartLabels:false,
  legend:{
    display:false,
    position:'bottom'
  },
  responsive: true,
  doughnutChartAnimations:true,
  maintainAspectRatio: false
};


// Line chart
export var mouseSpeedChartType = 'line';
export var mouseSpeedChartLabels: Array<any> = ["", "2009", "2010", "2011", "2012", "2013", "2014"];
export var mouseSpeedChartData: Array<any> = [{
  data: []
}, {
  data: []
}];
export var mouseSpeedChartOptions: any = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 0
    }
  },
  scales: {
    xAxes: [{
      display: false,
      type: 'realtime',
      realtime: {
        onRefresh: function (chart: any) {
          chart.data.datasets.forEach(function (dataset: any) {
            dataset.data.push({
              x: Date.now(),
              y: (Math.random() > 0.1 ? 1.0 : 1.0) * Math.round(Math.random() * 100)
            });
          });
        },
        delay: 500,
        duration: 10000,
        refresh: 500,
      },
    }],
    yAxes: [{
      display: false,
      ticks: {
        beginAtZero: true,
        fixedStepSize: 1,
        precision: 5
      }
    }]
  }
};
export var mouseSpeedChartColors: Array<any> = [{
  fill: true,
  backgroundColor: "rgba(253,243,246)",
  borderColor: primary,
  borderWidth: 1.5,
  pointBackgroundColor: primary,
  pointBorderColor: primary,
  pointBorderWidth: 0,
  lineTension: 0,
}];

export var mouseSpeedChartLegend = false;


//Vertical stacked chart option
export var sales_report_chart =
    [
        {
            "name": "January",
            "series": [
                {
                    "name": "y",
                    "value": 40
                },
                {
                    "name": "z",
                    "value": 10
                }]
        },
        {
            "name": "February",
            "series": [
                {
                    "name": "y",
                    "value": 30
                },
                {
                    "name": "z",
                    "value": 50
                }]
        },
        {
            "name": "March",
            "series": [
                {
                    "name": "y",
                    "value": 30
                },
                {
                    "name": "z",
                    "value": 2
                }]
        },
        {
            "name": "April",
            "series": [
                {
                    "name": "y",
                    "value": 40
                },
                {
                    "name": "z",
                    "value": 4
                }]
        },
        {
            "name": "May",
            "series": [
                {
                    "name": "y",
                    "value": 50
                },
                {
                    "name": "z",
                    "value": 6
                }]
        },
        {
            "name": "June",
            "series": [
                {
                    "name": "y",
                    "value": 80
                },
                {
                    "name": "z",
                    "value": 20
                }]
        },
        {
            "name": "Julay",
            "series": [
                {
                    "name": "y",
                    "value": 50
                },
                {
                    "name": "z",
                    "value": 1
                }]
        },
        {
            "name": "August",
            "series": [
                {
                    "name": "y",
                    "value": 85
                },
                {
                    "name": "z",
                    "value": 5
                }]
        }
    ]

export var showXAxis = false;
export var showYAxis = false;
export var gradient = false;
export var showLegend = false;
export var showXAxisLabel = false;
export var showYAxisLabel = false;
export var showGridLines = true;

export var barChartview = [170, 140];

export var colorScheme = {
    domain: ["#88D563", "#F5F5F5" ,"#88D563" ,"#F5F5F5" ,"#88D563", "#F5F5F5" ,"#88D563"]
};


  // Widget Line Chart
  export var WidgetLineChart1: Chart = {
    type: 'Line', 
    data: {
	  series: [
      [100,25, 50, 75, 100, 65, 0]
      ]	
    },
    options: {
      labels:["2012","2013","2014","2015","2016","2017"],
      tooltips: {
        enabled: true,
      },
        axisX: {
          showGrid: false,
          showLabel: true,
          offset: 0,
        },
        axisY: {
          showGrid: false,
          low: 0,
          showLabel: true,
          offset: 0,
        },
        chartPadding: {
		   top:30,
		   left:30,
		   right:30,
		   bottom:30
		},
        showArea: false,
        fullWidth: true,
        height:181,
        colors:[{
          fillColor: "rgba(228, 50, 107)",
          strokeColor: "rgba(228, 50, 107)"
      }]
    },
  };


//chart 2
export var colorScheme1 = {
    domain: ["#FF5370", "#ddd", "#FF5370", "#ddd", "#FF5370", "#ddd", "#FF5370"]
};

export var colorScheme2 = {
    domain: ["#26c6da", "#ddd", "#26c6da", "#ddd", "#26c6da", "#ddd", "#26c6da"]
};

export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}



