var g_class_names = [ "bowl", "brush", "bucket", "cup", "glove", "hockeytape", "measuringtape", "pig", "puzzle", "shoe", "stapler" ]

function setBINGOCardSize()
{
    var bingo_card_width = document.documentElement.clientWidth - 60;

    var card_entry_width = Math.floor( ( bingo_card_width - 30 ) / 3 );

    if( card_entry_width < 50 )
    {
        bingo_card_width = 180;
        card_entry_width = 50;
    }

    if( card_entry_width < 120 )
    {
        document.getElementById( "bingo_card_div" ).style.width = bingo_card_width + "px";

        var divs = document.getElementsByClassName( "bingo_entry_div" );
        for( var i = 0; i < divs.length; i++ )
        {
            divs[i].style.width  = card_entry_width + "px";
            divs[i].style.height = card_entry_width + "px";
            divs[i].style.fontSize = Math.floor( card_entry_width / 2 ) + "px";
        }
    }
}


function populateBINGOCardEntries()
{
    var indexes = generateImageIndexes();
    var image_num = 0;
    for( var i = 0; i < indexes.length; i++ )
    {
        image_num = indexes[i];
        if( -1 == image_num )
        {
            document.getElementById( "bingo_" + i ).style.backgroundImage = "url('images/exemplars/free.png')";
        }
        else
        {
            document.getElementById( "bingo_" + i ).style.backgroundImage = "url('images/exemplars/" + g_class_names[image_num] + ".png')";
        }
        document.getElementById( "bingo_" + i ).style.backgroundRepeat = "no-repeat";
        document.getElementById( "bingo_" + i ).style.backgroundPosition = "center center";
        document.getElementById( "bingo_" + i ).style.backgroundSize = "90%";
    }
}

function randomClassesIndex()
{
    return Math.round( Math.random() * ( g_class_names.length - 1 ) );
}

function generateImageIndexes()
{
    // One of the BINGO card entries is free
    var free_index = randomClassesIndex();
    
    // <max_duplicates> images may appear up to twice in the BINGO card
    var max_duplicates = 1;
    var duplicates_arr = [];
    
    var indexes = [];
    var index = 0;
    while( indexes.length < 9 )
    {
        if( indexes.length == free_index )
        {
            indexes.push( -1 );
        }
        
        index = randomClassesIndex();
        
        if( indexes.includes( index ) )
        {
            if( duplicates_arr.length < max_duplicates )
            {
                if( !duplicates_arr.includes( index ) )
                {
                    indexes.push( index );
                    duplicates_arr.push( index );
                }
            }
        }
        else
        {
            indexes.push( index );
        }
    }
    
    return indexes;
}


function addCheckmark( top_class )
{
    var added = false
    var divs = document.getElementsByClassName( "bingo_entry_div" );
    for( var i = 0; i < divs.length; i++ )
    {
        if( ( divs[i].style.backgroundImage.match( top_class ) ) && ( !divs[i].innerHTML.match( "1004" ) ) )
        {
            added = true;
            
            if( !divs[i].innerHTML.match( "1004" ) )
            {
                divs[i].innerHTML = "<p>&#10004;&#xFE0E;</p>";
            }
        }
    }
    
    return added;
}

function loadAudio()
{
    document.getElementById( "bell" ).load();
    document.getElementById( "honk" ).load();
}

function playBell()
{
    document.getElementById( "bell" ).play();    
}

function playHonk()
{
    document.getElementById( "honk" ).play();
}

