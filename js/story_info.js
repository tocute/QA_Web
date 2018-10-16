//http://tarruda.github.io/bootstrap-datetimepicker/

var page = 1 ;

var queryInfo = function (story_id)
{      

  $.ajax
  (
    {
      type: "GET",  //拿取下面網頁資料
      url: "https://staging.threal3d.com/api/v3/guest/stories/" + story_id ,
      //contentType: 'application/json; charset=UTF-8', 

      success: function(data, status, jqXHR) 
      {
        var str = "";
        str += "<img src=\" "+ data["color"]["fit_160"] + " \"  width=150; height=150;>";
        str += "<img src=\" "+ data["depth"]["original"] + " \"  width=150; height=150;>";

        $("#query_result").append(str);
        console.log(data);
        //alert(data);
      },
      error: function(jqXHR, textStatus, errorThrown)
      { 
          console.log(errorThrown) ; 
          alert('Failed!'); 
      }
    }
  );
}

$(document).ready
(
    function()
    { 
      var getPara, ParaVal;
      var aryPara = [];
      var strUrl = location.search;
      var story_id = "";
      if (strUrl.indexOf("?") != -1) {
        var getSearch = strUrl.split("?");
        getPara = getSearch[1].split("&");
        for (i = 0; i < getPara.length; i++) {
          ParaVal = getPara[i].split("=");
          if(ParaVal[0] == "story_id")
          {
            story_id = ParaVal[1];
          }          
        }
        queryInfo(story_id);
      }
    }
);