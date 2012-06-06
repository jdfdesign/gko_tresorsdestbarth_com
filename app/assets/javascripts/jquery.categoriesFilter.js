function init_categories_filters() {  
  
    // Setting up our variables  
	var $filterList = $('.categories .nav');
    var $filter = 'all'; // Set our filter  
    var $container = $('ul.grid');  // Set our container 
    var $containerClone;  
    var $filteredItems  
  
 	$filterList.prepend($("<li id='all'><a href='#'>Toutes</a></li>"));
  	// Adding a data-id attribute. Required by the Quicksand plugin:
	$container.find('li').each(function(i){
		$(this).attr('data-id',i); 
	});
    // Clone our container  
    $containerClone = $container.clone();  
  
    // Apply our Quicksand to work on a click function  
    // for each of the filter li link elements  
    $('.categories .nav li a').on('click',function(e)  
    {  
		e.preventDefault();

		// Remove the active class  
        $('.categories .nav li').removeClass('active');  
  
        // Split each of the filter elements and override our filter  
        $filter = $(this).parent().attr('id');  
  		console.log('filter ' + $filter);
        // Apply the 'active' class to the clicked link  
        $(this).parent().addClass('active');  
  
        // If 'all' is selected, display all elements  
        // else output all items referenced by the data-type  
        if ($filter == 'all') {  
			console.log('OK ' + $filter);
            $filteredItems = $containerClone.find('li');  
        }  
        else {  
            $filteredItems = $containerClone.find('li[data-categories~=' + $filter + ']');  
        }  
        // Finally call the Quicksand function  
        $container.quicksand($filteredItems,  
        {  
            // The duration for the animation  
            duration: 750,  
            // The easing effect when animating  
            easing: 'easeInOutCirc',  
            // Height adjustment set to dynamic  
            adjustHeight: 'dynamic'  
        });  
    });  
}  
