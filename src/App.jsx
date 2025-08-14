import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';
import { ArrowUpRight, DollarSign, ShoppingCart, Users, Download, Calendar, MoreVertical, Star, Clock, Building } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const analyticsData = {
    revenueOverTime: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        data: [1850000, 2100000, 2550000, 2900000, 3450000],
    },
    salesByFlavor: {
        labels: ['Classic Buttermilk', 'Cheese & Chive', 'Lemon & Poppy Seed', 'White Choc & Raspberry', 'Biltong & Peppadew', 'Wholewheat & Date', 'Rosewater & Pistachio'],
        data: [35, 25, 18, 12, 6, 3, 1],
    },
    salesByChannel: {
        labels: ['In-Store', 'Catering', 'Online Orders'],
        data: [60, 25, 15],
    },
    peakHours: {
        labels: ['07-09 AM', '09-11 AM', '11-01 PM', '01-03 PM', '03-05 PM'],
        data: [28, 35, 20, 12, 5],
    },
    customerSatisfaction: {
        score: 4.8,
        reviews: 1258,
    },
    topCorporateClients: [
        { name: 'Sandton Law Firm Inc.', lastOrder: '2024-08-12', value: 150000 },
        { name: 'Gauteng Investment Bank', lastOrder: '2024-08-10', value: 125000 },
        { name: 'JSE Tech Solutions', lastOrder: '2024-08-11', value: 95000 },
    ],
    keyMetrics: {
        totalRevenue: 'R 3.45M',
        yoyGrowth: '+18.9%',
        totalOrders: '45,210',
        avgOrderValue: 'R 76.31',
    }
};

const formatCurrency = (value) => `R ${value.toLocaleString('en-ZA')}`;

const Card = ({ children, className = '' }) => (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 ${className}`}>
        {children}
    </div>
);

const MetricCard = ({ title, value, change, icon: Icon }) => (
    <Card>
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="mt-2">
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
            {change && (
                <div className="flex items-center text-sm mt-1">
                    <span className={`flex items-center font-semibold ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        <ArrowUpRight className={`h-4 w-4 mr-1 ${change.startsWith('+') ? '' : 'transform rotate-180'}`} />
                        {change}
                    </span>
                    <span className="text-gray-500 ml-1">vs last year</span>
                </div>
            )}
        </div>
    </Card>
);

const ChartCard = ({ title, children, onExport }) => (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            <button onClick={onExport} className="p-2 rounded-md hover:bg-gray-100">
                <Download className="h-5 w-5 text-gray-500" />
            </button>
        </div>
        {children}
    </Card>
);

const ReportCard = ({ title, children }) => (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            <button className="p-2 rounded-md hover:bg-gray-100">
                <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
        </div>
        {children}
    </Card>
);

const App = () => {
    const [timeRange, setTimeRange] = useState('Last 30 Days');

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                    font: {
                        size: 12,
                    }
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return 'R ' + (value / 1000) + 'k';
                    },
                    font: { size: 10 }
                },
                grid: {
                    drawBorder: false,
                    color: '#e5e7eb',
                }
            },
            x: {
                ticks: { font: { size: 10 } },
                grid: {
                    display: false,
                }
            }
        }
    };
    
    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 12,
                    padding: 15,
                    font: {
                        size: 12,
                    }
                }
            },
        },
    };

    const handleExport = (chartName) => {
        alert(`Exporting ${chartName} data... (Feature simulation)`);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Mnguni Bakeries</h1>
                        <p className="text-gray-600 mt-1">Analytics Dashboard</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                            <select
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="bg-transparent focus:outline-none"
                            >
                                <option>Last 24 Hours</option>
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 12 Months</option>
                            </select>
                        </div>
                        <button onClick={() => alert('Generating report...')} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-semibold">
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <MetricCard title="Total Revenue" value={analyticsData.keyMetrics.totalRevenue} change={analyticsData.keyMetrics.yoyGrowth} icon={DollarSign} />
                    <MetricCard title="Total Orders" value={analyticsData.keyMetrics.totalOrders} icon={ShoppingCart} />
                    <MetricCard title="Avg. Order Value" value={analyticsData.keyMetrics.avgOrderValue} icon={Users} />
                     <Card>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-500">Customer Satisfaction</p>
                            <Star className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="mt-2">
                            <h3 className="text-2xl font-bold text-gray-800">{analyticsData.customerSatisfaction.score} / 5.0</h3>
                            <p className="text-sm text-gray-500 mt-1">Based on {analyticsData.customerSatisfaction.reviews} reviews</p>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <ChartCard title="Annual Revenue (ZAR)" onExport={() => handleExport('Annual Revenue')}>
                            <div className="h-80">
                                <Line 
                                    data={{
                                        labels: analyticsData.revenueOverTime.labels,
                                        datasets: [{
                                            label: 'Revenue',
                                            data: analyticsData.revenueOverTime.data,
                                            borderColor: '#3b82f6',
                                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                            fill: true,
                                            tension: 0.4,
                                        }]
                                    }}
                                    options={chartOptions}
                                />
                            </div>
                        </ChartCard>
                    </div>

                    <ChartCard title="Scone Sales by Flavor" onExport={() => handleExport('Sales by Flavor')}>
                       <div className="h-80">
                            <Doughnut 
                                data={{
                                    labels: analyticsData.salesByFlavor.labels,
                                    datasets: [{
                                        data: analyticsData.salesByFlavor.data,
                                        backgroundColor: ['#3b82f6', '#10b981', '#f97316', '#ef4444', '#8b5cf6', '#f59e0b', '#ec4899'],
                                        hoverOffset: 4,
                                    }]
                                }}
                                options={pieChartOptions}
                            />
                        </div>
                    </ChartCard>
                    
                    <div className="lg:col-span-1 grid grid-cols-1 gap-6">
                         <ChartCard title="Sales by Channel" onExport={() => handleExport('Sales by Channel')}>
                            <div className="h-64">
                                <Pie 
                                    data={{
                                        labels: analyticsData.salesByChannel.labels,
                                        datasets: [{
                                            data: analyticsData.salesByChannel.data,
                                            backgroundColor: ['#3b82f6', '#10b981', '#f97316'],
                                            hoverOffset: 4,
                                        }]
                                    }}
                                    options={{...pieChartOptions, plugins: { legend: { position: 'bottom' }}}}
                                />
                            </div>
                        </ChartCard>
                    </div>

                    <div className="lg:col-span-2">
                         <ChartCard title="Peak Sales Hours" onExport={() => handleExport('Peak Sales Hours')}>
                            <div className="h-64">
                                <Bar 
                                    data={{
                                        labels: analyticsData.peakHours.labels,
                                        datasets: [{
                                            label: 'Sales Volume',
                                            data: analyticsData.peakHours.data,
                                            backgroundColor: '#3b82f6',
                                            borderRadius: 4,
                                        }]
                                    }}
                                    options={{...chartOptions, scales: { y: { ticks: { callback: (value) => `${value}%` }}}}}
                                />
                            </div>
                        </ChartCard>
                    </div>

                    <div className="lg:col-span-3">
                        <ReportCard title="Top Corporate Clients Report">
                            <p className="text-sm text-gray-500 mb-4">
                                A significant portion of our revenue comes from corporate catering. This report highlights our most valuable clients based on total order value this year.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Client Name</th>
                                            <th scope="col" className="px-6 py-3">Last Order Date</th>
                                            <th scope="col" className="px-6 py-3 text-right">Total Value (YTD)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analyticsData.topCorporateClients.map((client, index) => (
                                            <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                                                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                                                    {client.name}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {client.lastOrder}
                                                </td>
                                                <td className="px-6 py-4 text-right font-semibold text-gray-800">
                                                    {formatCurrency(client.value)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                             <div className="mt-4 text-center">
                                <button className="text-sm font-semibold text-blue-600 hover:underline">
                                    View Full Corporate Report
                                </button>
                            </div>
                        </ReportCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
