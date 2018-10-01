//http://tarruda.github.io/bootstrap-datetimepicker/

var onBtnQueryPopular = function (e){      
  $.ajax({
    type: "GET",
    url: "https://staging.threal3d.com/api/v3/search/tags/popular?number_of_stories=6",
    //contentType: 'application/json; charset=UTF-8', 
    success: function(data, status, jqXHR) {
        var str = "";
        for (var i = 0; i < data[0]["stories"].length; i++) {
          if(i % 5 == 0)
            str += "<tr>";

          str += "<td>";
          str += "<img src=\""+ data[0]["stories"][i]["color"]["fit_160"] +"\" width = 150 height = 150>"
          //str += "<img src=\""+ data[i]["depth"]["original"] +"\">"
          str += "</td>";
          
          if(i % 5 == 4 || i == data.length -1)
            str += "</tr>";
        }

        $("#table_query_result").append(str);
        console.log(data[i]);
        //alert(data);
      },
    error: function(jqXHR, textStatus, errorThrown) { 
        console.log(errorThrown) ;//alert('Failed!'); 
      }
    });
}

$(document).ready(function(){ 
    $("#btn_query_popular").on("click", onBtnQueryPopular);
});