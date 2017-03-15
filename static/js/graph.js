queue()
   .defer(d3.json, "/IndeedJobSearch/IJS")
   .await(makeGraphs);


function makeGraphs(error, projectsJson) {

   // //Clean projectsJson data
    var IndeedJobSearch = projectsJson;
    var dateFormat = d3.time.format("%a, %d %b %Y %H:%M:%S GMT");
    IndeedJobSearch.forEach(function (d) {
        d["date"] = dateFormat.parse(d["date"]);
    });

   //Create a Crossfilter instance
   var ndx = crossfilter(IndeedJobSearch);

   //Define Dimensions
   var dateDim = ndx.dimension(function (d) {
       return d["date"];
   });
   var cityDim = ndx.dimension(function (d) {
       return d["city"];
   });
   var roleDim = ndx.dimension(function (d){
      return d['jobCategory'];
   });
   var levelDim = ndx.dimension(function (d){
       return d['level'];
   });
   var companyDim = ndx.dimension(function (d) {
       return d["company"];
   });
   var jobkeyDim = ndx.dimension(function (d) {
       return d["jobkey"];
   });
   var industryDim = ndx.dimension(function (d){
       return d["Industry"];
   });
   var urlDim = ndx.dimension(function (d){
      return d["url"];
   });
   var stationsDim = ndx.dimension(function (d){
      return d["stations"];
   });
   //Calculate metrics
   var numJobsbyDate = dateDim.group();
   var numJobsbyCity = cityDim.group();
   var numJobsbyRole = roleDim.group();
   var numJobsbyLevel = levelDim.group();
   var numJobsbyCompany = companyDim.group();
   var numJobsbyIndustry = industryDim.group();

   var all = ndx.groupAll();
   var totalJavaHits = ndx.groupAll().reduceSum(function (d) {
       return d["Java"];
   });
   var totalPHPHits = ndx.groupAll().reduceSum(function (d) {
       return d["PHP"];
   });
   var totalJavaScriptHits = ndx.groupAll().reduceSum(function (d) {
       return d["JavaScript"];
   });
   var totalSQLHits = ndx.groupAll().reduceSum(function (d) {
       return d["SQL"];
   });
    var totalPythonHits = ndx.groupAll().reduceSum(function (d) {
       return d["Python"];
   });
    var totalNetHits = ndx.groupAll().reduceSum(function (d) {
       return d["NET"];
   });
    var totalAWSHits = ndx.groupAll().reduceSum(function (d){
       return d["AWS"]
    });
    var totalAngularHits = ndx.groupAll().reduceSum(function (d) {
       return d["Angular"];
   });
    var totalWordPressHits = ndx.groupAll().reduceSum(function (d) {
       return d["Wordpress"];
   });
    var totalCHits = ndx.groupAll().reduceSum(function (d) {
       return d["C#"];
   });
    var totalCSSHits = ndx.groupAll().reduceSum(function (d) {
       return d["CSS"];
   });
    var totalHTMLHits = ndx.groupAll().reduceSum(function (d) {
       return d["HTML"];
   });
    var totalnoSQLHits = ndx.groupAll().reduceSum(function (d) {
       return d["NoSQL"];
   });
    var totalRubyHits = ndx.groupAll().reduceSum(function (d) {
       return d["Ruby"];
   });
    var totalGitHits = ndx.groupAll().reduceSum(function (d) {
       return d["git"];
   });
    var totalJobPosts = ndx.groupAll().reduceCount(function (d){
       return d["jobkey"];
    });

   // //Define values (to be used in charts)
   var minDate = dateDim.bottom(1)[0]["date"];
   var maxDate = dateDim.top(1)[0]["date"];

   //Charts
   var locationPieChart = dc.pieChart("#location-pie-chart");
   var levelBarChart = dc.barChart("#level-bar-chart");
   var roleRowChart = dc.rowChart("#role-row-chart");
   var companyRow = dc.rowChart("#company-row-chart");
   var IndustryPieChart = dc.pieChart("#industry-pie-chart");
   var TimeChart = dc.lineChart("#Posts-row-chart");
   var JavaHits = dc.numberDisplay("#java-hits");
   var phpHits = dc.numberDisplay("#php-hits");
   var JavaScriptHits = dc.numberDisplay("#javascript-hits");
   var sqlHits = dc.numberDisplay("#sql-hits");
   var pythonHits = dc.numberDisplay("#python-hits");
   var netHits = dc.numberDisplay("#net-hits");
   var awsHits = dc.numberDisplay("#aws-hits");
   var angularHits = dc.numberDisplay("#angular-hits");
   var wordpressHits = dc.numberDisplay("#wordpress-hits");
   var cHits = dc.numberDisplay("#c-hits");
   var cssHits = dc.numberDisplay("#css-hits");
   var htmlHits = dc.numberDisplay("#html-hits");
   var nosqlHits = dc.numberDisplay("#nosql-hits");
   var rubyHits = dc.numberDisplay("#ruby-hits");
   var gitHits = dc.numberDisplay("#git-hits");
   var jobHits = dc.numberDisplay("#total-hits");
   var datatable = dc.dataTable("#results-table");
   var fullresults = dc.dataTable("#FullResultsTable");


   datatable
   .dimension(jobkeyDim)
   .group(function (d) {
       return "<span id='LinkToFullResults'>This list shows the top 10 results only. Full list of jobs available "+"<a href='#FullResults'> here</a></span>";
   })
       .size(10)
   // create the columns dynamically
   .columns([
       function (d) {return ""
           +d.company
           +" are looking for a "
           +"<b>"
           +d.jobtitle
           +"."
           +"</b>"
           +"<br>"
           +"<i>"+"<a href='"+d.url+"'>"+"Click here to view the full advert "+"</a>"
           +"</i>";},
   ])
   ;
   fullresults
   .dimension(jobkeyDim)
   .group(function (d) {
       return '';
   })
       .size(232)
   // create the columns dynamically
   .columns([
       function (d) {return ''
           +d.company
           +' are looking for a '
           +'<b>'
           +d.jobtitle
           +'.'
           +'</b>'
           +'<p>'
           +'<a href="'
           +d.url
           +'"'
           +'target=_blank>'
           +'Click here to view the full advert '
           +'</a></p>';}
   ])
   ;
    locationPieChart
       .height(190)
       .radius(95)
       .transitionDuration(1500)
       .dimension(cityDim)
       .group(numJobsbyCity);


    roleRowChart
        .width(350)
        .height(190)
        .dimension(roleDim)
        .group(numJobsbyRole)
        .xAxis().ticks(5)
   roleRowChart.ordering(function (d) { return -d.value});


    levelBarChart
       .height(190)
       .width(300)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)
       .brushOn(false)
       .transitionDuration(1500)
       .dimension(levelDim)
       .group(numJobsbyLevel);

    IndustryPieChart
       .height(190)
       .radius(95)
       .transitionDuration(1500)
       .dimension(industryDim)
       .group(numJobsbyIndustry);


   companyRow
       .width(350)
       .height(360)
       .dimension(companyDim)
       .group(numJobsbyCompany)
       .xAxis().ticks(5)
   companyRow.ordering(function (d) { return -d.value})
   companyRow.rowsCap(10)
   companyRow.othersGrouper(false);

   TimeChart
       .width(1400)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(numJobsbyDate)
       .renderArea(true)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .xAxis().ticks(10);

   JavaHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalJavaHits);

   phpHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalPHPHits);

    JavaScriptHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalJavaScriptHits);

        sqlHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalSQLHits);

    pythonHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalPythonHits);

    netHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalNetHits);

    awsHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalAWSHits);

    angularHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalAngularHits);

    wordpressHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalWordPressHits);

    cHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalCHits);

    cssHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalCSSHits);

    htmlHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
        .group(totalHTMLHits);

    nosqlHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalnoSQLHits);

    rubyHits
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalRubyHits);

    gitHits
        .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalGitHits);

    jobHits
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d){
            return d;
        })
        .group(totalJobPosts)

   dc.renderAll();
}

