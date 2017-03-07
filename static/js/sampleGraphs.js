/**
 * Created by nakita on 03/03/2017.
 */
queue()
   .defer(d3.json, "/IndeedJobSearch/IJS")
   .await(makeGraphs);


function makeGraphs(error, projectsJson) {

   //Clean projectsJson data
   var IndeedJobSearch = projectsJson;
   // var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
   // IndeedJobSearch.forEach(function (d) {
   //     d["date"] = dateFormat.parse(d["date"]);
   //     d["date"].setDate(1);
   //     // d["total_donations"] = +d["total_donations"];
   // });

   //Create a Crossfilter instance
   var ndx = crossfilter(IndeedJobSearch);

   //Define Dimensions
   var dateDim = ndx.dimension(function (d) {
       return d["date"];
   });
   var companyDim = ndx.dimension(function (d) {
       return d["company"];
   });
   var cityDim = ndx.dimension(function (d) {
       return d["city"];
   });
   var formattedRelativeTimeDim = ndx.dimension(function (d) {
       return d["formattedRelativeTime"];
   });
   var jobtitleDim = ndx.dimension(function (d) {
       return d["jobtitle"];
   });

   var jobkeyDim = ndx.dimension(function (d) {
       return d["jobkey"];
   });


   //Calculate metrics
   var numJobsbyDate = dateDim.group();
   var numJobsbyCompany = companyDim.group();
   var numJobsbyCity = cityDim.group();
   var numNewJobsPostedbyDay = formattedRelativeTimeDim.group();
   var numJobsbyJobTitle = jobtitleDim.group();
   // var totalDonationsByState = stateDim.group().reduceSum(function (d) {
   //     return d["total_donations"];
   // });


   var all = ndx.groupAll();
   var totalJavaHits = ndx.groupAll().reduceSum(function (d) {
       return d["Java"];
   });
   //
   // var max_state = totalDonationsByState.top(1)[0].value;

   //Define values (to be used in charts)
   var minDate = dateDim.bottom(1)[0]["date"];
   var maxDate = dateDim.top(1)[0]["date"];

   //Charts
   var timeChart = dc.barChart("#time-chart");
   // var companyChart = dc.rowChart("#resource-type-row-chart");
   // var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
   // var numberProjectsND = dc.numberDisplay("#number-projects-nd");
   // var totalDonationsND = dc.numberDisplay("#total-donations-nd");
   var companyChart = dc.pieChart("#funding-chart");
   // var FocusAreaChart = dc.rowChart("#primary-area-of-focus-row-chart");
   //
   //
   // selectField = dc.selectMenu('#menu-select')
   //     .dimension(stateDim)
   //     .group(stateGroup);
   //
   //
   // numberProjectsND
   //     .formatNumber(d3.format("d"))
   //     .valueAccessor(function (d) {
   //         return d;
   //     })
   //     .group(all);
   //
   // totalDonationsND
   //     .formatNumber(d3.format("d"))
   //     .valueAccessor(function (d) {
   //         return d;
   //     })
   //     .group(totalDonations)
   //     .formatNumber(d3.format(".3s"));

 timeChart
       .width(800)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(formattedRelativeTimeDim)
       .group(numNewJobsPostedbyDay)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4);

   // companyChart
   //     .width(300)
   //     .height(250)
   //     .dimension(companyDim)
   //     .group(numJobsbyCompany)
   //     .xAxis().ticks(4);

   // povertyLevelChart
   //     .width(300)
   //     .height(250)
   //     .dimension(povertyLevelDim)
   //     .group(numProjectsByPovertyLevel)
   //     .xAxis().ticks(4);
   //
   companyChart
       .height(800)
       .width(600)
       .radius(350)
       .transitionDuration(1500)
       .dimension(companyDim)
       .group(numJobsbyCompany)
       .slicesCap(40);

   // FocusAreaChart
   //     .width(300)
   //     .height(250)
   //     .dimension(primaryAreaOfFocusDim)
   //     .group(numProjectsByFocusArea)
   //     .xAxis().ticks(4);

   dc.renderAll();
}

