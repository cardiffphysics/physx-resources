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
            'agegt18':{'tag':'age-gt18',name:"&gt;18"}
        },
    },'domain':{
        tag:'dom',
        title:'Subject Area',
        select:{
            'Astronomy':{'tag':'dom-astronomy',name:"Astronomy",icon:'astro.svg'},
            'GravWaves':{'tag':'dom-gravitational-waves',name:"Gravitational Waves",icon:'gw.svg'},
            'Physics':{'tag':'dom-physics',name:"Physics",icon:'phys.svg'},
            'Maths':{'tag':'dom-maths',name:"Maths",icon:'maths.svg'}
        }
    }
}
var dirs={
    img:'../img'
}
function initPage(){
    $('#filter-button').click(function(){
        console.log('filter-button clicked');
        if ($(this).hasClass('closed')){
            $(this).removeClass('closed')
            $('#filter-holder').removeClass('closed')
        }else{
            $(this).addClass('closed')
            $('#filter-holder').addClass('closed')
        }
    })
    makeFilters();
    updateFilters();
}

function makeFilters(){
    fH=$('#filter-holder');
    fH.append('<h2 class="filter-title">Filters</h2>');
    for (filt in filters){
        // console.log(filt);
        var ftag=filters[filt].tag;
        $('#filter-holder').append('<div class="filter open" id="filter-'+ftag+'"><h3 class="filter-name">'+filters[filt].title+'</h3></div>')
        for (s in filters[filt].select){
            var stag=filters[filt].select[s].tag;
            // console.log(s);
            $('#filter-'+ftag+'.filter').append('<div class="filt-option '+stag+'" id="filt-'+stag+'_option"></div>')
            $('#filt-'+stag+'_option').append('<input type="checkbox" id="filt-'+stag+'" name="filt-'+stag+'" checked=true>');
            if (filters[filt].select[s].icon){
                $('#filt-'+stag+'_option').append('<div class="icon icon-'+stag+'"></div>');
            }
            $('#filt-'+stag+'_option').append('<label class="filt-item '+ftag+' '+stag+'" for="filt-'+stag+'" id="filt-'+stag+'_label"><span class="filt-name">'+filters[filt].select[s].name+'</span> (<span class="filt-count"></span>)</label>');
            $('#filt-'+stag).change(function(){
                updateFilters();
            })
        }
    }
    $('.filter-name').each(function(){
        $(this).click(function(){
            if ($(this).parent().hasClass("open")){
                $(this).parent().removeClass("open");
                $(this).parent().addClass("closed");
            }else{
                $(this).parent().removeClass("closed");
                $(this).parent().addClass("open");
            }
        })
    })
    // updateFilters();
}

function updateFilters(){
    for (filt in filters){
        for (s in filters[filt].select){
            filters[filt].select[s].nactive=0;
        }
    }
    $('.block-item').each(function(){
        var filtTotal=1;
        var filtSub={};
        for (filt in filters){
            filtSub[filt]=0;
            for (s in filters[filt].select){
                var stag=filters[filt].select[s].tag;
                if($('input#filt-'+stag).prop('checked')){
                    if ($(this).hasClass(stag)){
                        filtSub[filt]+=1;
                        filters[filt].select[s].nactive+=1;
                    }
                }
            }
            filtTotal*=filtSub[filt]
        }
        // console.log($(this).find('h3 > a').html(),filtSub,filtTotal)
        if (filtTotal==0){
            $(this).addClass('hidden');
        }else{
            $(this).removeClass('hidden');
        }
    });
    for (filt in filters){
        for (s in filters[filt].select){
            var stag=filters[filt].select[s].tag;
            $('#filt-'+stag+'_label > .filt-count').html(filters[filt].select[s].nactive);
        }
    }
}