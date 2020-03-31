var filters={
    'age':{
        tag:'age',
        title:'Age',
        type:'normal',
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
        type:'normal',
        select:{
            'Astronomy':{'tag':'dom-astronomy',name:"Astronomy",icon:'dom-astro.svg'},
            'GravWaves':{'tag':'dom-gravitational-waves',name:"Gravitational Waves",icon:'dom-gw.svg'},
            'Physics':{'tag':'dom-physics',name:"Physics",icon:'dom-phys.svg'},
            'Maths':{'tag':'dom-maths',name:"Maths",icon:'dom-maths.svg'},
            'Coding':{'tag':'dom-coding',name:"Coding",icon:'dom-coding.svg'}
        }
    },'requirements':{
        tag:'req',
        title:'Requirements',
        type:'req',
        select:{
            'Any-device':{'tag':'req-any-device',name:"Any device",icon:'astro.svg'},
            'Web-access':{'tag':'req-web-access',name:"Web access",icon:'gw.svg'}
        }
    },'types':{
        tag:'type',
        title:'Activity types',
        type:'normal',
        select:{
            'Printable':{'tag':'type-printable-activity',name:"Printable Activity",icon:'svg'},
            'Book':{'tag':'type-book',name:"Book",icon:'svg'},
            'Online':{'tag':'type-online',name:"Online",icon:'svg'},
            'Interactive':{'tag':'type-interactive',name:"Interactive",icon:'svg'},
            'Coding':{'tag':'type-coding',name:"Coding",icon:'svg'},
            'Reading':{'tag':'type-reading',name:"Reading",icon:'svg'},
            'Degree prep':{'tag':'type-degree-prep',name:"Degree-prep",icon:'svg'},
            'Craft':{'tag':'type-craft',name:"Craft",icon:'svg'},
            'Worksheet':{'tag':'type-worksheet',name:"Worksheet",icon:'svg'},
            'Video':{'tag':'type-video',name:"Video",icon:'svg'},
            'Podcast':{'tag':'type-podcast',name:"Podcast",icon:'svg'}
        }
    }
}
var dirs={
    img:'../img'
}
var hid='content';
function initPage(fileIn='../data/data.jsonp',pop=false){
    var pop;
    // console.log(fileIn,pop);
    $('#filter-button').click(function(){
        // console.log('filter-button clicked');
        if ($(this).hasClass('closed')){
            $(this).removeClass('closed');
            $('#filter-holder').removeClass('closed');
            $('#filter-label').removeClass('closed');
            // var filtleft=$('#main').css('marginLeft');
            // var lableft=320-40-$('#filter-label').width()-48;
            // $('#filter-label').css({'margin-left':lableft})
            // $('#filter-holder').css({'left':filtleft})
        }else{
            $(this).addClass('closed');
            $('#filter-holder').addClass('closed');
            $('#filter-label').addClass('closed');
            // var filtleft=$('#main').css('marginLeft')-$('#filter-holder').width()-50;
            // $('#filter-holder').css({'left':filtleft})
            // // var left=$('filter-holder').offsetWidth-$('filter-label').offsetWidth
            // $('#filter-label').css({'margin-left':0})
        }

    })
    makeFilters();
    console.log('loading data from',fileIn)
    ajax(fileIn,{
    			"dataType": "jsonp",
    			"callback":"data",
                "this":this,
    			"error": function(error) {
    				console.log('events error:',error);
    			},
    			"success": function(dataIn){
                    this.data=dataIn;
                    if (pop){populateData()};
                    updateFilters();
    			}
    		});
    updateFilters();
}

function populateData(){
    // console.log(hid);
    var _h=hid;
    for (d in this.data){
        _dx=this.data[d];
        if (_dx['Resource/Workshop']!='Resource'){
            continue
        }
        _dx.classlist='';
        _i='item-'+d;
        // console.log($('#'+_h));
        $('#'+_h).append('<div class="block-item" id="'+_i+'"></div>');
        // console.log($('#'+_i));
        $('#'+_i).append('<div class="block-title"><h3 class="block-white"></h3></div>');
        $('#'+_i).append('<div class="block-img"><img src="img/'+_dx.Image+'" alt="image"></div>');
        $('#'+_i).append('<p class="res res-desc">'+_dx['Description']+'</p>');
        $('#'+_i).append('<p class="res res-type"></p>');
        $('#'+_i).append('<p class="res res-age"></p>');
        $('#'+_i).append('<p class="res res-req"></p>');
        $('#'+_i).append('<p class="res res-clink">'+_dx['Curriculum Links']+'</p>');
        $('#'+_i).append('<p class="res res-author">'+_dx['Author/Originator']+'</p>');
        if (_dx.URL){
            urltxt='<span class="res-url"><a title="'+_dx['Resource Name']+'" href="'+_dx.URL_+'">More info</a></span>';
            $('#'+_i).append('<p class="res res-url">'+urltxt+'</p>');
            $('#'+_i+' .block-title h3').append('<a href="'+_dx.URL+'">'+_dx['Resource Name']+'</a>');
            $('#'+_i+' .block-img').append('<div class="block-link"><a href="'+_dx.URL+'">Click here</a>');
        }else{
            $('#'+_i+' .block-title h3').append(_dx['Resource Name']);
        }

        if (_dx['Age Range']){
            _dx.ages={};
            ages=_dx['Age Range'].split(';');
            for (a in ages){
                an=ages[a].trim().toLowerCase().replace('>','gt').replace(' ','-');
                _dx.ages[an]=ages[a];
                $('#'+_i).addClass('age-'+an);
                $('#'+_i+' .res-age').append('<span class="res-age-item age-'+an+'">'+ages[a]+'</span>');
                // _dx.classlist+=' age-'+an;
            }
        }
        if (_dx['Requirements']){
            _dx.reqs={};
            reqs=_dx['Requirements'].split(';');
            for (r in reqs){
                rq=reqs[r].trim().toLowerCase().replace(' ','-');
                _dx.reqs[rq]=reqs[r];
                $('#'+_i).addClass('req-'+rq);
                $('#'+_i+' .res-req').append('<span class="res-req-item req-'+rq+'">'+reqs[r]+'</span>');
            }
        }
        if (_dx['Domain']){
            _dx.doms={};
            doms=_dx['Domain'].split(';');
            for (o in doms){
                dm=doms[o].trim().toLowerCase().replace(' ','-');
                _dx.doms[dm]=doms[o];
                $('#'+_i).addClass('dom-'+dm);
                $('#'+_i+' .res-dom').append('<span class="res-dom-item dom-'+dm+'">'+doms[o]+'</span>');
                $('#'+_i+' .block-title').append('<div class="icon icon-dom-'+dm+'"></div>');
            }
        }
        if (_dx['Type of Resource']){
            _dx.types={};
            types=_dx['Type of Resource'].split(';');
            for (t in types){
                tp=types[t].trim().toLowerCase().replace(' ','-');
                _dx.types[tp]=types[t];
                $('#'+_i).addClass('type-'+tp);
                $('#'+_i+' .res-type').append('<div class="res-type-item type-'+tp+'"><div class="res-type-icon"></div><span class="res-type-label">'+types[t]+'</div></div>');
                $('#'+_i+' .block-title').append('<div class="icon icon-type-'+tp+'"></div>');
            }
        }
    }
}

function makeFilters(){
    fH=$('#filter-holder');
    // fH.append('<h2 class="filter-title">Filters</h2>');
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
    fH=window.innerHeight;
    // -$('#title-bar').height()-parseFloat($('#title-bar').css('paddingTop'));
    console.log(window.innerHeight,$('#title-bar').height(),parseFloat($('#title-bar').css('paddingTop')),fH)
    $('#filter-holder').height(fH-8);
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
            filtSub[filt]=(filters[filt].type=='req')?1:0;
            for (s in filters[filt].select){
                var stag=filters[filt].select[s].tag;
                if (filters[filt].type=='normal'){
                    if($('input#filt-'+stag).prop('checked')){
                        if ($(this).hasClass(stag)){
                            filtSub[filt]+=1;
                            filters[filt].select[s].nactive+=1;
                        }
                    }
                }else if (filters[filt].type=='req'){
                    if ($(this).hasClass(stag)){
                        filters[filt].select[s].nactive+=1;
                    }
                    // console.log(stag,$('input#filt-'+stag).prop('checked'),$(this).hasClass(stag),filtSub[filt])
                    if(!$('input#filt-'+stag).prop('checked')){
                        if ($(this).hasClass(stag)){
                            filtSub[filt]=0;
                            // console.log(filtSub[filt]);
                        }
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
            var nactive=0;
            var stag=filters[filt].select[s].tag;
            $('.block-item').each(function(){
                if (!$(this).hasClass('hidden') && $(this).hasClass(stag)){nactive+=1}
            })
            // $('#filt-'+stag+'_label > .filt-count').html(filters[filt].select[s].nactive);
            $('#filt-'+stag+'_label > .filt-count').html(nactive);
        }
    }
}
function ajax(url,attrs){
    // courtesy of slowe
	if(typeof url!=="string") return false;
	if(!attrs) attrs = {};
	var cb = "",qs = "";
	var oReq;
	if(attrs['dataType']=="jsonp"){
        if(typeof attrs['callback']==="string") cb = attrs['callback'];
        else cb = 'fn_'+(new Date()).getTime();
		window[cb] = function(rsp){
			if(typeof attrs.success==="function") attrs.success.call((attrs['this'] ? attrs['this'] : this), rsp, attrs);
		};
	}
	if(typeof attrs.cache==="boolean" && !attrs.cache) qs += (qs ? '&':'')+(new Date()).valueOf();
	if(cb) qs += (qs ? '&':'')+'callback='+cb;
	if(attrs.data) qs += (qs ? '&':'')+attrs.data;

	// Build the URL to query
	attrs['url'] = url+(qs ? '?'+qs:'');

	if(attrs['dataType']=="jsonp"){
		var script = document.createElement('script');
		script.src = attrs['url'];
		document.body.appendChild(script);
		return this;
	}

	// code for IE7+/Firefox/Chrome/Opera/Safari or for IE6/IE5
	oReq = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	oReq.addEventListener("load", window[cb] || complete);
	oReq.addEventListener("error", error);
	if(attrs.beforeSend) oReq = attrs.beforeSend.call((attrs['this'] ? attrs['this'] : this), oReq, attrs);

	function complete(evt) {
		if(oReq.status === 200) {
			attrs.header = oReq.getAllResponseHeaders();
			var rsp = oReq.response || oReq.responseText;
			// Parse out content in the appropriate callback
			if(attrs['dataType']=="json") try { rsp = JSON.parse(rsp.replace(/[\n\r]/g,"\\n").replace(/^([^\(]+)\((.*)\)([^\)]*)$/,function(e,a,b,c){ return (a==cb) ? b:''; }).replace(/\\n/g,"\n")) } catch(e){};
			if(attrs['dataType']=="script"){
				var fileref=document.createElement('script');
				fileref.setAttribute("type","text/javascript");
				fileref.innerHTML = rsp;
				document.head.appendChild(fileref);
			}
			attrs['statusText'] = 'success';
			if(typeof attrs.success==="function") attrs.success.call((attrs['this'] ? attrs['this'] : this), rsp, attrs);
		}else{
			attrs['statusText'] = 'error';
			error(evt);
		}
		if(typeof attrs.complete==="function") attrs.complete.call((attrs['this'] ? attrs['this'] : this), rsp, attrs);
	}

	function error(evt){
		if(typeof attrs.error==="function") attrs.error.call((attrs['this'] ? attrs['this'] : this),evt,attrs);
	}

	if(attrs['dataType']) oReq.responseType = attrs['dataType'];

	try{ oReq.open('GET', attrs['url']); }
	catch(err){ error(err); }

	try{ oReq.send(); }
	catch(err){ error(err); }

	return this;
} // End default ajax() function
