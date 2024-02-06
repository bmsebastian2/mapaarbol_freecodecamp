
document.addEventListener('DOMContentLoaded',()=>{

    let titulo =(text)=>`<h2>${text}</h2>`
    const elementMyData = document.getElementById('titles');
  document.getElementById('1').onclick=()=>resolveJson(1)
  document.getElementById('2').onclick=()=>resolveJson(2)
   document.getElementById('3').onclick=()=>resolveJson(3)
    let contenteGrafioc =document.getElementById('my_dataviz')
    const menu = {
                    1:{html:titulo('KickStarted'),json:'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'},
                    1:{html:titulo('Movies🎞'),json:'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'},
                    3:{html:titulo('Game♥'),json:'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'
                }}

    const tooltip = d3.select('#tooltip');

    const resolveJson = (selectItem=1)=>{

        elementMyData.innerHTML=menu[selectItem].html
        promiseJson(menu[selectItem].json).then(data=>{

            contenteGrafioc.innerHTML=''
            const margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = window.innerWidth-200 - margin.left - margin.right,
            height = window.innerHeight-200 - margin.top - margin.bottom;null
    
            const svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",`translate(${margin.left}, ${margin.top})`);
            
            const root = d3.hierarchy(data).sum(function(d){ return d.value}) 
            d3.treemap()
                .size([width, height])
                .padding(2)
            (root)
            let categories = data.children.map((d) => d.category)
        
            let customColors = [
                        "#555E7B", "#B7D968", "#B576AD", "#E04644", "#FDE47F",
                        "#7CCCE5", "#343838", "#343838", "#91204D", "#00A0B0",
                        "#2A044A", "#655643", "#DAD8A7", "#FFD3B5", "#A8E6CE",
                        "#c49c94", "#f7b6d2", "#c7c7c7", "#dbdb8d", "#9edae5",
                    ]

            
            const color = d3.scaleOrdinal()
                    .domain(categories)
                    .range(customColors)
      
            svg
                .selectAll("rect")
                .data(root.leaves())
                .join("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .attr('class','legend-item')
                .style("stroke", "black")
                .style('overflow','hidden')                
                .style("fill", d=>color(d.data.category))
            
            svg
                .selectAll("text")
                .data(root.leaves())
                .join("text")
                .attr("x", function(d){ return d.x0+2})    // +10 to adjust position (more right)
                .attr("y", function(d){ return d.y0+15})    // +20 to adjust position (lower)
                .text(function(d){ return  d.data.category  })
                
                .attr("font-size", "8px")
                .attr('class','title')
                .attr('width')

                    
            
            let listDoc = document.getElementsByClassName('legend-item')
            // console.log(listDoc);

            for (const key in listDoc) {
                if (Object.hasOwnProperty.call(listDoc, key)) {
                    const element = listDoc[key];
                            console.log(element);
                            element.appendChild('<p>s</p>')
                    
                }
            }
            


            // console.log(data)
        }).catch(err=>console.log(err))


    }


    resolveJson()




})


function promiseJson(json){
    return new Promise((resolve,reject)=>{
        try {
            resolve(d3.json(json))
        } catch (error) {
            reject(error)
        }
    })             
}