$(function() 
{
  var navLink = $('ul a');
  var devLink = $('.contents');
  var navArray = [];
  var navDivArray = [];
  var scrollStartFlag= 0;

//push id and href value of nav into array
  for(var i = 0; i < navLink.length; i++) 
  {
  
    var aChild = navLink[i];
    var nChild = devLink[i];
    var navTitle = $(nChild).attr('id');
    var navLinkContent = $(aChild).attr('href');
  
    navArray.push(navLinkContent);
    navDivArray.push(navTitle);
  
  }

//if no scroll happended and if window is at top make nav big and highlight home in nav
  if(scrollStartFlag==0)
  {
    $(".positionIndicator").addClass("navBig");
    $("a[href=#home]").addClass("highlight");
  }
  else
  {
    $(".positionIndicator").removeClass("navBig"); 
    $("a[href=#home']").removeClass("highlight");
  }

//when scroll detected
  $(window).scroll(function()
  {
    //calculate current position and length of full document
    var windowHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    var documentHeight = $(document).height();
    //if any scroll happens change scroll flag
    scrollStartFlag=1;
  
  //in scroll check which section window is located in 
    for(var i = 0; i < navLink.length; i++) 
    {  
      var divID = navDivArray[i];
      var navID = navArray[i];
      //calculate location in full document and height of section
      var divTop = $("#"+divID).offset().top;
      var divHeight = $("#"+divID).height();
    
      //if it's within some section, highlight the section and make that part of nav big
      if(scrollHeight >= divTop && scrollHeight <(divTop+divHeight))
      {
        $("a[href='" + navID + "']").addClass("highlight");
      
      }
      else
      {
        //if it's not in some section and it's below zero than make home to be highlighted
        if(scrollHeight<0)
        {
          $("a[href='" + navArray[0] + "']").addClass("highlight");
        }
        else
        {
          //if the location is not inthe section that we check in the for loop, remove the highlight
          $("a[href='" + navID + "']").removeClass("highlight");
        }
      }
    }

    //after scroll if window is relatively on top, make nav bigger -> nav resize
    if(scrollHeight < 30)
    {
      $(".positionIndicator").addClass("navBig");
    }
    else
    {
      $(".positionIndicator").removeClass("navBig"); 
    }
  });

  //smooth scrolling part
  $("nav a").click(function(event){
    event.preventDefault();
    //if the section is clicked in nav, window focus moves to the section
    $('html, body').animate({scrollTop: $(this.hash).offset().top}, 1000);
  });

  //carousel part

  //initial status
  var carouselIndex = 1;
  carouselFunction(carouselIndex);
  //when left arrow is clicked
  $(".prev").click(function(event){
      carouselIndexCalculate(-1);
    });
  //when right arrow is clicked
  $(".next").click(function(event){
      carouselIndexCalculate(1);
    });

//increase or decrease index depends on its input value
  function carouselIndexCalculate(num) {
    carouselFunction(carouselIndex += num);
  }

//main condition function that determines showing contents in carousel
  function carouselFunction(index) {
    var i;
    //get contents of img 
    var carouselContent = document.getElementsByClassName("carousel-img");
    //if index is higher that its length then initialize again
    if (index > carouselContent.length) 
    {
      carouselIndex = 1;
    } 
    //if index is smaller that initial value then make it to last value 
    if (index < 1) 
    {
      carouselIndex = carouselContent.length;
    }
    //if no edge cases, add or subtract with input value and cancel display previous content img
    for (i = 0; i < carouselContent.length; i++) 
    {
      carouselContent[i].style.display = "none"; 
    }
    //display current image with updated index
    carouselContent[carouselIndex-1].style.display = "block"; 
    
  }
    
})();
