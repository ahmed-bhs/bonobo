
$("#ajax-loader").hide();
is_processing = false;
last_page = false;
page=1;
 
function removeFriend(id,check=false) {


    swal({
        title: "Confirmer",
        text: "Êtes vous certain de retirer cet ami ? ",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Oui, retirer.",
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
    },
    function(){

        $.ajax({
            url: Routing.generate('bonobo_remove_friend'),
            type: "DELETE",
            data: 'id='+id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            success: function (data) {
                swal("Deleted!", "Votre ami a été retiré.", "success");
            if(check){
                $("#remove"+id).hide();
                $("#add"+id).show();

            }   else $("#div"+id).fadeOut();


            },
            error : function(xhr, textStatus, errorThrown ) {
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }
            return;
        }
        if (xhr.status == 500) {
            $.ajax(this);
        } else {
            $.ajax(this);
        }
    }
    });

    });

}


function addFriend(id) {


    swal({
        title: "Voulez-vous ajouter ce bonobo à votre liste d'amis ?",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        showLoaderOnConfirm: true,
    },
    function(){

        $.ajax({
            url: Routing.generate('bonobo_add_friend'),
            type: "POST",
            data: 'id='+id,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},

            success: function (data) {

                swal("Success","Vous etes amis maintenant!",   "success");

                $("#add"+id).hide();
                $("#remove"+id).show();


            },
   /*         error : function(xhr, textStatus, errorThrown ) {
                if (textStatus == 'timeout') {
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                                //try again
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                        if (xhr.status == 500) {
                           $.ajax(this);
                       } else {
                        $.ajax(this);
                    }
                }*/
            });


    });


}





function addMoreElements(check=false) { 
    var info='';
    is_processing = true;
    $("#ajax-loader").show();
    $.ajax({
        type: "GET",
        //FOS Routing
        url: Routing.generate('bonobo_list_scroller', {page: page}),
        success: function(object) {   $("#ajax-loader").hide();
            if (object.length > 0 && !object.last_page) { 
                if(check) { 
                            $.each( object, function( key, bonobo ) {  
                                var id=bonobo.id;
                                var username=bonobo.username?bonobo.username:'';
                                var name=bonobo.name?bonobo.name:'';
                                var age=bonobo.age?bonobo.age:'';
                                var famille=bonobo.famille?bonobo.famille:'';
                                var race=bonobo.race?bonobo.race:'';
                                var nouriture=bonobo.nouriture?bonobo.nouriture:'';
                                var fileName=bonobo.fileName?'/projet/test/web/app/img/'+bonobo.fileName:'/projet/test/web/app/img/avatar1.jpg';
             
                                info=info+   '<div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6" id="div'+id+'" ><div class="ui-block"><div class="friend-item"><div class="friend-header-thumb"></div><div class="friend-item-content"><div class="friend-avatar"><div class="author-thumb"><img src="'+fileName+'" alt="author" width="100px" height="100px" > </div> <div class="author-content"> <a href="#" class="h5 author-name">'+username+'</a> <div class="country">'+name+'</div> </div> </div> <div class="control-block-button" data-swiper-parallax="-100" style="margin-bottom:20px;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"><div id="add'+id+'" ' ;
                                      if(  bonobo.friend  )  info=info + 'style="display:none;"'; 
                              
                                      info=info +  '><a href="#add" onclick="addFriend('+id+')"    class="btn btn-control bg-blue"><i class="fa fa-plus" aria-hidden="true"></i></a></div><div id="remove'+id+'" ' ; 
                                      if(  !bonobo.friend  ) info=info + 'style="display:none;"'; 
                              
                                      info=info +  ' ><a href="#remove" onclick="removeFriend('+id+','+check+')" class="btn btn-control " style="background-color:rgb(221, 107, 85)"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div> <div class="swiper-container" data-slide="fade"> <div class="swiper-wrapper"> <div class="swiper-slide"> <div class="friend-count" data-swiper-parallax="-500"> <a href="#" class="friend-count-item"> <div class="h6">'+age+'</div> <div class="title">Age</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+famille+'</div> <div class="title">Famille</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+race+'</div> <div class="title">Race</div> </a> </div> </div> </div> <div class="author-content"> <a href="#" class="h5 author-name">Nourriture</a>  <div class="country">'+ nouriture+'</div> </div> <!-- If we need pagination --> <div class="swiper-pagination"></div> </div> </div> </div> </div> </div>';
                              
                          
        });  }

                else{

                            $.each( object, function( key, bonobo ) {  
                            if(  bonobo.friend  )    
                              {                               var id=bonobo.id;
                                                              var username=bonobo.username?bonobo.username:'';
                                                              var name=bonobo.name?bonobo.name:'';
                                                              var age=bonobo.age?bonobo.age:'';
                                                              var famille=bonobo.famille?bonobo.famille:'';
                                                              var race=bonobo.race?bonobo.race:'';
                                                              var nouriture=bonobo.nouriture?bonobo.nouriture:'';
                                                              var fileName=bonobo.fileName?'/projet/test/web/app/img/'+bonobo.fileName:'/projet/test/web/app/img/avatar1.jpg';
                                           
                                                              info=info+   '<div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6" id="div'+id+'" ><div class="ui-block"><div class="friend-item"><div class="friend-header-thumb"></div><div class="friend-item-content"><div class="friend-avatar"><div class="author-thumb"><img src="'+fileName+'" alt="author" width="100px" height="100px" > </div> <div class="author-content"> <a href="#" class="h5 author-name">'+username+'</a> <div class="country">'+name+'</div> </div> </div> <div class="control-block-button" data-swiper-parallax="-100" style="margin-bottom:20px;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"><div id="add'+id+'" ' ;
                                                                    if(  bonobo.friend  )  info=info + 'style="display:none;"'; 
                                                            
                                                                    info=info +  '><a href="#add" onclick="addFriend('+id+')"    class="btn btn-control bg-blue"><i class="fa fa-plus" aria-hidden="true"></i></a></div><div id="remove'+id+'" ' ; 
                                                                    if(  !bonobo.friend  ) info=info + 'style="display:none;"'; 
                                                            
                                                                    info=info +  ' ><a href="#remove" onclick="removeFriend('+id+','+check+')" class="btn btn-control " style="background-color:rgb(221, 107, 85)"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div> <div class="swiper-container" data-slide="fade"> <div class="swiper-wrapper"> <div class="swiper-slide"> <div class="friend-count" data-swiper-parallax="-500"> <a href="#" class="friend-count-item"> <div class="h6">'+age+'</div> <div class="title">Age</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+famille+'</div> <div class="title">Famille</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+race+'</div> <div class="title">Race</div> </a> </div> </div> </div> <div class="author-content"> <a href="#" class="h5 author-name">Nourriture</a>  <div class="country">'+ nouriture+'</div> </div> <!-- If we need pagination --> <div class="swiper-pagination"></div> </div> </div> </div> </div> </div>';
                                                            }
                          
        });








                }





            if (!last_page ) {}    $('.selector').append(info ); page = page + 1;
                //The server can answer saying it's the last page so that the browser doesn't make anymore calls
                last_page = object.last_page;
            } else {
                last_page = true;
            }
            is_processing = false;
        },
        error: function(data) {
            is_processing = false;
        }
    });
}
 
























function addMoreFriends(check=false) { 
    var info='';
    is_processing = true;
    $("#ajax-loader").show();
    $.ajax({
        type: "GET",
        //FOS Routing
        url: Routing.generate('bonobo_friend_scroller', {page: page}),
        success: function(object) {   $("#ajax-loader").hide();
            if (object.length > 0 && !object.last_page) { 
                if(check) { 
                            $.each( object, function( key, bonobo ) {  
                                var id=bonobo.id;
                                var username=bonobo.username?bonobo.username:'';
                                var name=bonobo.name?bonobo.name:'';
                                var age=bonobo.age?bonobo.age:'';
                                var famille=bonobo.famille?bonobo.famille:'';
                                var race=bonobo.race?bonobo.race:'';
                                var nouriture=bonobo.nouriture?bonobo.nouriture:'';
                                var fileName=bonobo.fileName?'/projet/test/web/app/img/'+bonobo.fileName:'/projet/test/web/app/img/avatar1.jpg';
             
                                info=info+   '<div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6" id="div'+id+'" ><div class="ui-block"><div class="friend-item"><div class="friend-header-thumb"></div><div class="friend-item-content"><div class="friend-avatar"><div class="author-thumb"><img src="'+fileName+'" alt="author" width="100px" height="100px" > </div> <div class="author-content"> <a href="#" class="h5 author-name">'+username+'</a> <div class="country">'+name+'</div> </div> </div> <div class="control-block-button" data-swiper-parallax="-100" style="margin-bottom:20px;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"><div id="add'+id+'" ' ;
                                      if(  bonobo.friend  )  info=info + 'style="display:none;"'; 
                              
                                      info=info +  '><a href="#add" onclick="addFriend('+id+')"    class="btn btn-control bg-blue"><i class="fa fa-plus" aria-hidden="true"></i></a></div><div id="remove'+id+'" ' ; 
                                      if(  !bonobo.friend  ) info=info + 'style="display:none;"'; 
                              
                                      info=info +  ' ><a href="#remove" onclick="removeFriend('+id+','+check+')" class="btn btn-control " style="background-color:rgb(221, 107, 85)"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div> <div class="swiper-container" data-slide="fade"> <div class="swiper-wrapper"> <div class="swiper-slide"> <div class="friend-count" data-swiper-parallax="-500"> <a href="#" class="friend-count-item"> <div class="h6">'+age+'</div> <div class="title">Age</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+famille+'</div> <div class="title">Famille</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+race+'</div> <div class="title">Race</div> </a> </div> </div> </div> <div class="author-content"> <a href="#" class="h5 author-name">Nourriture</a>  <div class="country">'+ nouriture+'</div> </div> <!-- If we need pagination --> <div class="swiper-pagination"></div> </div> </div> </div> </div> </div>';
                              
                          
        });  }

                else{

                            $.each( object, function( key, bonobo ) {  
                                                var id=bonobo.id;
                                                              var username=bonobo.username?bonobo.username:'';
                                                              var name=bonobo.name?bonobo.name:'';
                                                              var age=bonobo.age?bonobo.age:'';
                                                              var famille=bonobo.famille?bonobo.famille:'';
                                                              var race=bonobo.race?bonobo.race:'';
                                                              var nouriture=bonobo.nouriture?bonobo.nouriture:'';
                                                              var fileName=bonobo.fileName?'/projet/test/web/app/img/'+bonobo.fileName:'/projet/test/web/app/img/avatar1.jpg';
                                           
                                                              info=info+   '<div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-6" id="div'+id+'" ><div class="ui-block"><div class="friend-item"><div class="friend-header-thumb"></div><div class="friend-item-content"><div class="friend-avatar"><div class="author-thumb"><img src="'+fileName+'" alt="author" width="100px" height="100px" > </div> <div class="author-content"> <a href="#" class="h5 author-name">'+username+'</a> <div class="country">'+name+'</div> </div> </div> <div class="control-block-button" data-swiper-parallax="-100" style="margin-bottom:20px;transform: translate3d(0px, 0px, 0px); transition-duration: 0ms;"><div id="add'+id+'" ' ;
                                                                    if(  bonobo.friend  )  info=info + 'style="display:none;"'; 
                                                            
                                                                    info=info +  '><a href="#add" onclick="addFriend('+id+')"    class="btn btn-control bg-blue"><i class="fa fa-plus" aria-hidden="true"></i></a></div><div id="remove'+id+'" ' ; 
                                                                    if(  !bonobo.friend  ) info=info + 'style="display:none;"'; 
                                                            
                                                                    info=info +  ' ><a href="#remove" onclick="removeFriend('+id+','+check+')" class="btn btn-control " style="background-color:rgb(221, 107, 85)"><i class="fa fa-trash-o" aria-hidden="true"></i></a></div></div> <div class="swiper-container" data-slide="fade"> <div class="swiper-wrapper"> <div class="swiper-slide"> <div class="friend-count" data-swiper-parallax="-500"> <a href="#" class="friend-count-item"> <div class="h6">'+age+'</div> <div class="title">Age</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+famille+'</div> <div class="title">Famille</div> </a> <a href="#" class="friend-count-item"> <div class="h6">'+race+'</div> <div class="title">Race</div> </a> </div> </div> </div> <div class="author-content"> <a href="#" class="h5 author-name">Nourriture</a>  <div class="country">'+ nouriture+'</div> </div> <!-- If we need pagination --> <div class="swiper-pagination"></div> </div> </div> </div> </div> </div>';
                                                      

                          
        });





                }





            if (!last_page ) {}    $('.selector').append(info ); page = page + 1;
                //The server can answer saying it's the last page so that the browser doesn't make anymore calls
                last_page = object.last_page;
            } else {
                last_page = true;
            }
            is_processing = false;
        },
        error: function(data) {
            is_processing = false;
        }
    });
}

 