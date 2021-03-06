// Must add "src="https://www.google.com/jsapi" @_Layout.cshtml
// Load Visualization API and chart package
google.load("visualization", "1.0", { packages: ["corechart"] });

$(document).ready(function() {
  $.ajax({
    // Changed for Partial View
    // url: '@Url.Action("PopulationChart2","Home")',
    url: "/Home/PopulationChart3",
    dataType: "json",
    type: "GET",
    error: function(xhr, status, error) {
      var err = eval("(" + xhr.responseText + ")");
      toastr.error(err.message);
    },
    success: function(data) {
      PopulationChart(data);
      return false;
    }
  });
});

function PopulationChart(data) {
  var dataArray = [["City", "2010 Population", "2000 Population"]];
  $.each(data, function(i, item) {
    dataArray.push([
      item.cityName,
      parseInt(item.populationYear2010),
      parseInt(item.populationYear2000)
    ]);
  });
  var data = google.visualization.arrayToDataTable(dataArray);
  var options = {
    title: "Population of Largest U.S. Cities",
    chartArea: {
      width: "50%"
    },
    colors: ["#b0120a", "#ffab91"],
    hAxis: {
      title: "Total Population",
      minValue: 0
    },
    vAxis: {
      title: "City"
    }
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
