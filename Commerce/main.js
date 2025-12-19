// --- Global Data Store ---
const initialTickets = [
    { id: 'TICKET-4501', subject: 'Payment Inquiry', priority: 'High', color: 'red' },
    { id: 'TICKET-4499', subject: 'Delivery Delay', priority: 'Medium', color: 'yellow' },
    { id: 'TICKET-4498', subject: 'Product Info Request', priority: 'Low', color: 'green' }
];
let currentTickets = [...initialTickets]; 

// --- Language Data ---
const textContent = {
    en: {
        title: "E-Commerce Analytics Dashboard",
        metric1Title: "Total Impressions",
        metric2Title: "Total Clicks",
        metric3Title: "Average CPC",
        metric4Title: "All Conversions",
        metric5Title: "Conversion Rate",
        chartHeaderTrend: "Revenue and Cost Trend",
        chartHeaderGeo: "Sales by Region",
        tableHeader: "Top 5 Products by Revenue",
        colProduct: "Product Name",
        colRevenue: "Revenue",
        colUnits: "Units",
        colROAS: "ROAS",
        colStatus: "Status",
        successMessage: "Data refreshed successfully!",
        loading: "Loading...",
        buttonText: "Refresh Data"
    }
};
const lang = textContent.en;

// --- Utility Functions ---
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatCurrency(num) {
    return `₹${(num / 100000).toFixed(2)} L`;
}

// --- Data Generation Helpers ---
function generateTopProductsData(count = 5) {
    const productNames = ["Elite Noise-Cancelling Headphones", "4K Smart Streaming Stick", "Eco-Friendly Water Bottle", "Premium Leather Laptop Bag", "Smart LED Desk Lamp"];
    const data = [];
    for (let i = 0; i < count; i++) {
        const roas = (Math.random() * (4.5 - 1.2) + 1.2).toFixed(1);
        const status = roas > 3.0 ? 'High ROI' : (roas > 2.0 ? 'Active' : 'Review');
        data.push({
            name: productNames[i % productNames.length],
            revenue: getRandomInt(800000, 2000000),
            units: getRandomInt(1000, 5000),
            roas: roas,
            status: status
        });
    }
    return data.sort((a, b) => b.revenue - a.revenue);
}

function generateOrderList(count = 8) {
    const statuses = [{name: 'Pending', color: 'yellow'}, {name: 'Shipped', color: 'indigo'}, {name: 'Delivered', color: 'green'}, {name: 'Failed', color: 'red'}];
    const data = [];
    for (let i = 0; i < count; i++) {
        const status = statuses[getRandomInt(0, statuses.length - 1)];
        data.push({
            id: `ORD-${getRandomInt(1000, 9999)}`,
            amount: getRandomInt(500, 5000),
            status: status.name,
            color: status.color,
            date: new Date(Date.now() - getRandomInt(0, 100000000)).toLocaleDateString()
        });
    }
    return data;
}

function generateCustomerList(count = 6) {
    const names = ["Priya Sharma", "Rahul Verma", "Neha Singh", "Amit Kumar", "Sanjay Yadav", "Geeta Rao", "Vikram Malhotra", "Anjali Gupta"];
    const data = [];
    for (let i = 0; i < count; i++) {
        data.push({
            name: names[i % names.length],
            email: `user${getRandomInt(100,999)}@example.com`,
            spend: getRandomInt(5000, 50000),
            orders: getRandomInt(5, 50)
        });
    }
    return data.sort((a, b) => b.spend - a.spend);
}

function generateCampaignData(count = 4) {
    const names = ["Diwali Sale Blast", "Summer Collection", "New User Promo", "Retargeting Q4"];
    return names.map(name => ({
        name: name,
        budget: getRandomInt(50000, 200000),
        spent: getRandomInt(10000, 45000),
        clicks: getRandomInt(1000, 5000),
        roas: (Math.random() * 5 + 1).toFixed(1)
    }));
}

function generateRevenueCostData() {
    const data = [];
    for (let i = 0; i < 15; i++) {
        data.push({
            day: i + 1,
            revenue: getRandomInt(20000, 40000) + Math.round(Math.sin(i * 0.5) * 10000),
            cost: getRandomInt(10000, 20000) + Math.round(Math.cos(i * 0.3) * 5000)
        });
    }
    return data;
}

function generateRegionSalesData() {
    return [
        { region: 'North', sales: getRandomInt(500000, 2500000) },
        { region: 'South', sales: getRandomInt(700000, 3000000) },
        { region: 'East', sales: getRandomInt(300000, 1500000) },
        { region: 'West', sales: getRandomInt(1000000, 4000000) }
    ];
}

// --- Responsive Helper: Mobile Sidebar Toggle ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const body = document.body;

    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        if(window.innerWidth < 768) body.style.overflow = 'hidden';
    } else {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        body.style.overflow = '';
    }
}

// --- Cursor Effect (Mouse Only) ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;
let circleX = 0, circleY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    dotX = mouseX;
    dotY = mouseY;
    if (cursorDot) cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    if (cursorCircle) cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    
    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

// --- 3D Tilt Effect ---
function applyTiltEffects() {
    if (window.innerWidth < 768) return; 

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const container = card.closest('.card-container');
        if (!container) return;

        container.onmousemove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * -5;
            const rotateX = ((y - centerY) / centerY) * 5;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        };
        container.onmouseleave = () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        };
    });
}

// --- D3 Charts ---
function renderRegionPieChart(salesData) {
    const containerId = '#map-container';
    d3.select(containerId).html('');
    const container = document.querySelector(containerId);
    if (!container || container.clientWidth === 0) return; 

    const width = container.clientWidth;
    const height = Math.min(width, 300); 
    const radius = Math.min(width, height) / 2 - 10;

    const svg = d3.select(containerId).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
        .domain(salesData.map(d => d.region))
        .range(['#a855f7', '#3b82f6', '#10b981', '#fcd34d']);

    const pie = d3.pie().value(d => d.sales).sort(null);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
    const tooltip = d3.select('#chart-tooltip');

    svg.selectAll("path")
        .data(pie(salesData))
        .join("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.region))
        .attr("class", "cursor-pointer")
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1).style("display", "block")
                .html(`<strong>${d.data.region}</strong><br>₹${(d.data.sales/1000).toFixed(0)}K`)
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));
        
    const legend = d3.select(containerId).append("div")
        .attr("class", "absolute top-2 right-2 bg-black/50 p-2 rounded text-xs pointer-events-none");
        
    legend.selectAll("div")
        .data(salesData)
        .join("div")
        .html(d => `<span style="display:inline-block;width:8px;height:8px;background:${color(d.region)};margin-right:5px;border-radius:50%"></span>${d.region}`);
}

function renderRevenueCostChart(data) {
    const containerId = '#line-chart-container';
    d3.select(containerId).html('');
    const container = document.querySelector(containerId);
    if (!container || container.clientWidth === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = container.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(containerId).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain(d3.extent(data, d => d.day)).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => Math.max(d.revenue, d.cost)) * 1.1]).range([height, 0]);

    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(5));
    svg.append("g").call(d3.axisLeft(y).ticks(5).tickFormat(d => d/1000 + 'k'));

    const lineRev = d3.line().x(d => x(d.day)).y(d => y(d.revenue));
    const lineCost = d3.line().x(d => x(d.day)).y(d => y(d.cost));

    svg.append("path").datum(data).attr("fill", "none").attr("stroke", "#a855f7").attr("stroke-width", 3).attr("d", lineRev);
    svg.append("path").datum(data).attr("fill", "none").attr("stroke", "#f97316").attr("stroke-width", 3).attr("d", lineCost);
}

// --- View Generators (ALL FUNCTIONAL NOW) ---

function generateOverviewHTML(data = null) {
    const impressions = data?.impressions || '40.3K';
    const topProducts = data?.topProducts || generateTopProductsData(5);
    
    const productRows = topProducts.map(p => `
        <div class="flex flex-col sm:flex-row sm:items-center text-sm p-3 bg-white/5 rounded-lg mb-2">
            <span class="font-medium text-white sm:w-1/3 mb-1 sm:mb-0 truncate">${p.name}</span>
            <div class="flex justify-between w-full sm:w-2/3">
                <span class="text-yellow-400 w-1/4 text-right">₹${(p.revenue / 100000).toFixed(2)}L</span>
                <span class="text-gray-300 w-1/4 text-right">${p.units}</span>
                <span class="${p.roas > 3.0 ? 'text-green-400' : 'text-yellow-400'} w-1/4 text-right">${p.roas}x</span>
            </div>
        </div>
    `).join('');

    return `
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div class="card-container"><div class="card p-4 rounded-xl"><p class="text-gray-400 text-sm">Impressions</p><h3 class="text-2xl font-bold text-blue-400">${impressions}</h3><div class="sparkline-placeholder mt-2"></div></div></div>
            <div class="card-container"><div class="card p-4 rounded-xl"><p class="text-gray-400 text-sm">Clicks</p><h3 class="text-2xl font-bold text-green-400">2.6K</h3><div class="sparkline-placeholder mt-2"></div></div></div>
            <div class="card-container"><div class="card p-4 rounded-xl"><p class="text-gray-400 text-sm">Avg CPC</p><h3 class="text-2xl font-bold text-yellow-400">₹2.38</h3><div class="sparkline-placeholder mt-2"></div></div></div>
            <div class="card-container"><div class="card p-4 rounded-xl"><p class="text-gray-400 text-sm">Conversions</p><h3 class="text-2xl font-bold text-indigo-400">285</h3><div class="sparkline-placeholder mt-2"></div></div></div>
            <div class="card-container"><div class="card p-4 rounded-xl"><p class="text-gray-400 text-sm">Conv. Rate</p><h3 class="text-2xl font-bold text-pink-400">10.7%</h3><div class="sparkline-placeholder mt-2"></div></div></div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div class="lg:col-span-2 card p-4 md:p-6 rounded-2xl min-h-[350px]">
                <h3 class="text-xl font-bold mb-4">Revenue Trend</h3>
                <div id="line-chart-container" class="w-full h-[300px]"></div>
            </div>
            <div class="card p-4 md:p-6 rounded-2xl min-h-[350px]">
                <h3 class="text-xl font-bold mb-4">Regional Sales</h3>
                <div id="map-container" class="w-full h-[300px] flex items-center justify-center relative"></div>
            </div>
        </div>

        <div class="card p-4 md:p-6 rounded-2xl">
            <h3 class="text-xl font-bold mb-4">Top Products</h3>
            <div class="hidden sm:flex font-semibold text-sm text-gray-400 border-b border-gray-700 pb-2 mb-2">
                <span class="w-1/3">Product</span>
                <span class="w-1/6 text-right">Revenue</span>
                <span class="w-1/6 text-right">Units</span>
                <span class="w-1/6 text-right">ROAS</span>
            </div>
            <div id="top-products-table" class="space-y-2 pt-2">
                ${productRows}
            </div>
        </div>
    `;
}

function generateProductsHTML() {
    const inventory = [
        {name: 'Wireless Headphones', count: 75, status: 'In Stock', color: 'green'},
        {name: 'Smartwatch Series 5', count: 12, status: 'Low Stock', color: 'red'},
        {name: 'Fast Charger 20W', count: 150, status: 'In Stock', color: 'green'},
        {name: 'Laptop Sleeve', count: 15, status: 'Low Stock', color: 'red'},
        {name: 'Gaming Mouse', count: 200, status: 'In Stock', color: 'green'},
        {name: 'USB-C Cable', count: 0, status: 'Out of Stock', color: 'gray'},
        {name: 'Mechanical Keyboard', count: 45, status: 'In Stock', color: 'green'}
    ];
    
    return `
        <div class="grid grid-cols-1 gap-6">
            <div class="card p-5 md:p-6 rounded-2xl">
                <h3 class="text-2xl font-bold mb-2">Inventory Management</h3>
                <p class="text-gray-400 text-sm mb-6">Real-time stock levels across all warehouses.</p>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div class="card p-4 rounded-xl bg-blue-900/10 border border-blue-600/30 text-center sm:text-left">
                        <p class="text-xs text-gray-400">Total SKUs</p>
                        <h4 class="text-2xl font-bold text-blue-400">752</h4>
                    </div>
                    <div class="card p-4 rounded-xl bg-red-900/10 border border-red-600/30 text-center sm:text-left">
                        <p class="text-xs text-gray-400">Low Stock Alerts</p>
                        <h4 class="text-2xl font-bold text-red-400">18</h4>
                    </div>
                    <div class="card p-4 rounded-xl bg-green-900/10 border border-green-600/30 text-center sm:text-left">
                        <p class="text-xs text-gray-400">Top Seller</p>
                        <h4 class="text-lg font-bold text-green-400 truncate">Smartwatch S5</h4>
                    </div>
                </div>

                <h4 class="text-lg font-bold mb-3">Product List</h4>
                <div class="space-y-2">
                    ${inventory.map(item => `
                        <div class="flex justify-between items-center p-3 border-b border-gray-700/50 bg-gray-800/30 hover:bg-gray-800 transition rounded-lg">
                            <div class="flex flex-col">
                                <span class="font-medium text-white text-sm">${item.name}</span>
                                <span class="text-xs text-gray-500 md:hidden">${item.status}</span>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="text-sm font-mono text-gray-300">${item.count} units</span>
                                <span class="hidden md:inline-block text-xs bg-${item.color}-900/40 text-${item.color}-300 px-2 py-1 rounded border border-${item.color}-800">
                                    ${item.status}
                                </span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function generateOrdersHTML() {
    const orderList = generateOrderList(10);
    return `
        <div class="card p-5 md:p-6 rounded-2xl">
            <h3 class="text-xl font-bold mb-4">Recent Orders</h3>
            <div class="space-y-3">
                ${orderList.map(order => `
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800/30 border border-gray-700/30 rounded-lg hover:bg-gray-800/50 transition">
                        <div class="flex justify-between sm:block mb-2 sm:mb-0">
                            <span class="font-bold text-white text-sm block">${order.id}</span>
                            <span class="text-xs text-gray-400 block">${order.date}</span>
                        </div>
                        <div class="flex justify-between items-center gap-4">
                            <div class="font-mono text-gray-200 text-sm">₹${order.amount.toLocaleString()}</div>
                            <span class="px-3 py-1 text-xs rounded-full bg-${order.color}-900/60 text-${order.color}-300 border border-${order.color}-700/50 min-w-[80px] text-center">
                                ${order.status}
                            </span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateCustomersHTML() {
    const customers = generateCustomerList(6);
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="card p-6 rounded-2xl">
                <h3 class="text-xl font-bold mb-4">Customer Demographics</h3>
                <div class="h-48 bg-gray-800/50 rounded-xl flex flex-col items-center justify-center border border-gray-700 border-dashed p-4 text-center">
                    <span class="text-4xl mb-2">👥</span>
                    <span class="text-gray-400 text-sm">Gender/Age Distribution Chart</span>
                    <span class="text-xs text-gray-600 mt-1">(Data visualization placeholder)</span>
                </div>
            </div>
             <div class="card p-6 rounded-2xl">
                <h3 class="text-xl font-bold mb-4">Top Spenders</h3>
                <div class="space-y-3">
                    ${customers.map(c => `
                        <div class="flex justify-between items-center p-3 bg-gray-800/40 rounded-lg border border-gray-700/30">
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                                    ${c.name.charAt(0)}
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-sm font-medium text-gray-200">${c.name}</span>
                                    <span class="text-[10px] text-gray-500">${c.orders} orders</span>
                                </div>
                            </div>
                            <span class="text-sm font-bold text-green-400">₹${(c.spend/1000).toFixed(1)}k</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function generateCampaignsHTML() {
    const campaigns = generateCampaignData();
    return `
        <div class="space-y-6">
            <div class="card p-6 rounded-2xl">
                <h3 class="text-2xl font-bold mb-2">Marketing Campaigns</h3>
                <p class="text-gray-400 text-sm">Performance metrics for active ad campaigns.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${campaigns.map(camp => `
                    <div class="card p-5 rounded-xl border-l-4 ${Number(camp.roas) > 3 ? 'border-green-500' : 'border-yellow-500'}">
                        <div class="flex justify-between items-start mb-4">
                            <h4 class="font-bold text-lg">${camp.name}</h4>
                            <span class="text-xs bg-gray-700 px-2 py-1 rounded">Active</span>
                        </div>
                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p class="text-gray-500 text-xs">Budget</p>
                                <p class="font-mono">₹${(camp.budget/1000).toFixed(1)}k</p>
                            </div>
                            <div>
                                <p class="text-gray-500 text-xs">Spent</p>
                                <p class="font-mono">₹${(camp.spent/1000).toFixed(1)}k</p>
                            </div>
                            <div>
                                <p class="text-gray-500 text-xs">Clicks</p>
                                <p class="text-blue-400 font-bold">${camp.clicks}</p>
                            </div>
                            <div>
                                <p class="text-gray-500 text-xs">ROAS</p>
                                <p class="${Number(camp.roas) > 3 ? 'text-green-400' : 'text-yellow-400'} font-bold">${camp.roas}x</p>
                            </div>
                        </div>
                        <div class="w-full bg-gray-700 h-1.5 rounded-full mt-4 overflow-hidden">
                            <div class="bg-blue-500 h-full" style="width: ${(camp.spent / camp.budget * 100)}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function generateSupportHTML() {
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="card p-6 rounded-2xl">
                <h3 class="text-2xl font-bold mb-4">Support Dashboard</h3>
                <div class="grid grid-cols-2 gap-4 mb-6">
                    <div class="bg-pink-900/20 p-4 rounded-lg border border-pink-500/30">
                        <span class="text-gray-400 block text-xs">Open Tickets</span>
                        <span class="text-2xl font-bold text-pink-400">${currentTickets.length}</span>
                    </div>
                    <div class="bg-cyan-900/20 p-4 rounded-lg border border-cyan-500/30">
                        <span class="text-gray-400 block text-xs">Avg Response</span>
                        <span class="text-2xl font-bold text-cyan-400">2.4h</span>
                    </div>
                </div>
                <div class="space-y-2">
                    ${currentTickets.map(t => `
                        <div class="bg-slate-800 p-3 rounded flex justify-between items-center text-sm border border-gray-700/50">
                            <span class="truncate mr-2">#${t.id}: ${t.subject}</span>
                            <span class="text-${t.color}-400 whitespace-nowrap text-xs px-2 py-1 bg-white/5 rounded border border-${t.color}-900">${t.priority}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="card p-6 rounded-2xl">
                <h3 class="text-2xl font-bold mb-4">New Ticket</h3>
                <form onsubmit="handleTicketSubmit(event)" class="space-y-4">
                    <select id="ticket-subject" class="w-full p-3 rounded bg-slate-700 border border-gray-600 text-white focus:border-orange-500 outline-none">
                        <option>Shipping Issue</option>
                        <option>Payment Error</option>
                        <option>Technical Support</option>
                    </select>
                    <select id="ticket-priority" class="w-full p-3 rounded bg-slate-700 border border-gray-600 text-white focus:border-orange-500 outline-none">
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                    <textarea id="ticket-description" rows="4" class="w-full p-3 rounded bg-slate-700 border border-gray-600 text-white focus:border-orange-500 outline-none" placeholder="Describe the issue..."></textarea>
                    <button type="submit" class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition">Submit Ticket</button>
                </form>
            </div>
        </div>
    `;
}

function generateContactHTML() {
    return `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="card p-6 rounded-2xl lg:col-span-2">
                <h3 class="text-2xl font-bold mb-6">Contact Us</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div class="bg-slate-800 p-4 rounded-xl border border-indigo-500/30 text-center">
                        <div class="text-2xl mb-2">🏢</div>
                        <h4 class="font-bold">Headquarters</h4>
                        <p class="text-sm text-gray-400">New Delhi, India</p>
                    </div>
                    <div class="bg-slate-800 p-4 rounded-xl border border-yellow-500/30 text-center">
                        <div class="text-2xl mb-2">📞</div>
                        <h4 class="font-bold">Phone</h4>
                        <p class="text-sm text-gray-400">+91 98765 43210</p>
                    </div>
                    <div class="bg-slate-800 p-4 rounded-xl border border-green-500/30 text-center">
                        <div class="text-2xl mb-2">📧</div>
                        <h4 class="font-bold">Email</h4>
                        <p class="text-sm text-gray-400">admin@shop.com</p>
                    </div>
                </div>
                <form onsubmit="event.preventDefault(); showMessage('Message Sent!');" class="space-y-4 max-w-2xl mx-auto">
                    <input type="text" placeholder="Your Name" class="w-full p-3 rounded bg-slate-700 border border-gray-600 outline-none text-white">
                    <input type="email" placeholder="Email Address" class="w-full p-3 rounded bg-slate-700 border border-gray-600 outline-none text-white">
                    <textarea rows="4" placeholder="Message" class="w-full p-3 rounded bg-slate-700 border border-gray-600 outline-none text-white"></textarea>
                    <button class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-bold transition">Send Message</button>
                </form>
            </div>
        </div>
    `;
}

// --- Main Render Logic (Updated with Real Views) ---
const views = {
    overview: generateOverviewHTML,
    products: generateProductsHTML,
    orders: generateOrdersHTML,
    customers: generateCustomersHTML,
    campaigns: generateCampaignsHTML,
    support: generateSupportHTML,
    contact: generateContactHTML
};

function renderView(viewName) {
    const container = document.getElementById('content-container');
    const title = document.getElementById('header-title');
    
    // Update Sidebar Active State
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-blue-600');
        if (el.dataset.view === viewName) el.classList.add('bg-blue-600');
    });

    // Update Header Title
    title.textContent = viewName.charAt(0).toUpperCase() + viewName.slice(1);

    // Render Content
    if (views[viewName]) {
        container.innerHTML = views[viewName]();
    }

    // Initialize View Specifics
    if (viewName === 'overview') {
        setTimeout(() => {
            renderRevenueCostChart(generateRevenueCostData());
            renderRegionPieChart(generateRegionSalesData());
            applyTiltEffects();
        }, 50); 
    }

    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 768) {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar.classList.contains('-translate-x-full')) {
            toggleSidebar();
        }
    }
}

// --- Interaction Handlers ---
function handleTicketSubmit(e) {
    e.preventDefault();
    const subject = document.getElementById('ticket-subject').value;
    const priority = document.getElementById('ticket-priority').value;
    
    const colors = { 'High': 'red', 'Medium': 'yellow', 'Low': 'green' };
    currentTickets.unshift({
        id: `TICKET-${Math.floor(Math.random()*9000)+1000}`,
        subject: subject,
        priority: priority,
        color: colors[priority]
    });
    
    document.getElementById('successModal').classList.remove('hidden');
    document.getElementById('successModal').classList.add('modal-visible');
    renderView('support'); 
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('modal-visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// Message Box
function showMessage(msg) {
    const box = document.createElement('div');
    box.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-xl z-[100] transition-opacity duration-500';
    box.textContent = msg;
    document.body.appendChild(box);
    setTimeout(() => { box.style.opacity = '0'; setTimeout(() => box.remove(), 500); }, 3000);
}

// Refresh Button
document.getElementById('refreshButton').addEventListener('click', () => {
    const btn = document.getElementById('refreshButton');
    const txt = document.getElementById('buttonText');
    
    btn.disabled = true;
    txt.textContent = "Loading...";
    
    setTimeout(() => {
        btn.disabled = false;
        txt.textContent = "Refresh Data";
        const currentView = document.querySelector('.nav-item.bg-blue-600').dataset.view;
        renderView(currentView);
        showMessage("Data Refreshed!");
    }, 1500);
});

// Profile Dropdown
document.getElementById('profileDropdownBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = document.getElementById('profileDropdown');
    if (dd.classList.contains('dropdown-hidden')) {
        dd.classList.remove('dropdown-hidden');
        dd.classList.add('dropdown-visible');
    } else {
        dd.classList.add('dropdown-hidden');
        dd.classList.remove('dropdown-visible');
    }
});

document.addEventListener('click', () => {
    const dd = document.getElementById('profileDropdown');
    dd.classList.add('dropdown-hidden');
    dd.classList.remove('dropdown-visible');
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Nav Click Listeners
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            renderView(link.dataset.view);
        });
    });

    // Resize Listener for Charts
    window.addEventListener('resize', () => {
        const currentView = document.querySelector('.nav-item.bg-blue-600')?.dataset.view;
        if (currentView === 'overview') {
            renderRevenueCostChart(generateRevenueCostData());
            renderRegionPieChart(generateRegionSalesData());
        }
    });

    // Initial Load
    renderView('overview');
});