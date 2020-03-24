var filters={
    'age':{
        tag:'age',
        title:'Age',
        select:{
            'age47':{'tag':'age-4-7',name:"4-7"},
            'age79':{'tag':'age-7-9',name:"7-9"},
            'age911':{'tag':'age-9-11',name:"9-11"},
            'age1114':{'tag':'age-11-14',name:"11-14"},
            'age1416':{'tag':'age-14-16',name:"14-16"},
            'age1618':{'tag':'age-16-18',name:"16-18"},
            'agegt18':{'tag':'age-gt18',name:"&gt;18"}}
    }
}
function makeFilters(){
    fH=$('#filter-holder');
    fH.append('<h2 class="filter-title">Filters</h2>');
    for (filt in filters){
        console.log(filt);
        var ftag=filters[filt].tag;
        $('#filter-holder').append('<div class="filter" id="filter-'+ftag+'"><h3 class="filter-name">'+filters[filt].title+'</h3></div>')
        for (s in filters[filt].select){
            var stag=filters[filt].select[s].tag;
            console.log(s);
            $('#filter-'+ftag+'.filter').append('<input type="checkbox" id="filt-'+stag+'" name="filt-'+stag+'" checked=true>');
            $('#filter-'+ftag+'.filter').append('<label class="filt-item '+stag+'" for="filt-'+stag+'" id="filt-'+stag+'_label">'+filters[filt].select[s].name+'</label>');
        }
    }
}

function updateFilters(){
    $('.block-item').each(function(){
        $(this).addClass('hidden');
    });
    for (filt in filters){
        for (s in filters[filt].select){
            var stag=filters[filt].select[s].tag;
            var isvis=$('input#filt-'+stag).prop('checked');
            console.log(stag,isvis);
            if (isvis){
                $('.block-item.'+stag).each(function(){
                    $(this).removeClass('hidden');
                })
            }

        }
    }
}