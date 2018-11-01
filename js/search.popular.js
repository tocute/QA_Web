var onBtnQueryPopular = function (e)
{      
  $.ajax
  (
    {
      type: "GET",
      url: "https://staging.threal3d.com/api/v3/search/tags/popular?number_of_stories=6",
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {
        var str = "";
        console.log(data.length);

        for (var z = 0 ; z < data.length ; z++)
        {
          console.log(data[z]);
          var jump_url_with_id = "search_tag.html?keyword=" + data[z]["tag"];
          str += '<div class="panel panel-info">';
          str += '<div class="panel-heading">';
          str += "<a href=\"" + jump_url_with_id + " \">"; 
          str += data[z]["tag"];
          str += '</a>'
          str += '</div>';
          str += '<div class="panel-body">';
          for (var i = 0; i < data[z]["stories"].length; i++) 
          {
            str += "<img src=\""+ data[z]["stories"][i]["color"]["fit_160"] +"\" width = 150 height = 150>"
          }
          str += '</div>';
          str += '</div>';
        }
        

        $("#panel_query_result").append(str);
        
        //alert(data);
      },

      error: function(jqXHR, textStatus, errorThrown) 
      { 
          console.log(errorThrown) ;//alert('Failed!'); 
      }

    }
  );
}
// 在文档加载后激活函数：
$(document).ready 
(
  function()
  { 
    onBtnQueryPopular();
    //$("#btn_query_popular").on("click", BtnQueryPopular);
  }
);