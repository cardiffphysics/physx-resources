#!/Applications/anaconda/bin/python
# -*- coding: utf-8 -*-

from astropy.table import Table,Column
# from pydrive.auth import GoogleAuth
# from pydrive.drive import GoogleDrive
#
# gauth = GoogleAuth()
# gauth.LocalWebserverAuth()
#
# drive = GoogleDrive(gauth)
#
# file_list = drive.ListFile({'q': "'0B7ZDkYLdRh3AWVJyNF9SLWhRODQ' in parents and trashed=false"}).GetList()
# for file1 in file_list:
#     print(('title: %s, id: %s' % (file1['title'], file1['id'])))
#
# drivefile=drive.CreateFile({'id':'18w3dbA3lga8So5sCUml7xUFyOPjfTEZ-vXSzobYprhY'})
# drivefile.GetContentFile('../data/downloaded_table.csv',mimetype='text/csv')

# Generates HTML files that look (a bit) like the resources and workshops pages
# on the Cardiff Physics Engagement blog
# The styles are in styles.css

# File can be downloaded (in CSV format) from https://docs.google.com/spreadsheets/d/18w3dbA3lga8So5sCUml7xUFyOPjfTEZ-vXSzobYprhY/edit?usp=sharing
# You *may* need to remove commas (as astropy.table may not like them...

fileIn="../data/downloaded_table.csv"
tabIn=Table.read(fileIn)

# main websites
fOutRes=open('../html/testHtml_resources.html','w')
fOutWorkshops=open('../html/testHtml_workshops.html','w')

# snippets of html (won't work properly as a standalone html file)
fOutGrav=open('../html/testHtml_gw.html','w')
fOutPhys=open('../html/testHtml_phys.html','w')
fOutAstro=open('../html/testHtml_astro.html','w')

# set up lists
astroHtml=[]
physHtml=[]
gravHtml=[]
workHtml=[]

# HTML header
hdr="""<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" media="all" href="../css/physx-res.css" type="text/css"/>
<script type="text/javascript" src="../js/jquery-3.4.1.min.js"></script>
<script src="../js/physx-res.js" type="text/javascript"/></script>
</head>
<body class="main">
<div id="filter-holder"></div>
"""
# Write header to HTML files
fOutRes.write(hdr)
fOutWorkshops.write(hdr)

# cycle through rows of table
for row in tabIn:
    # initialise classlist
    classlist=''
    # get data from row
    rw=row['Resource/Workshop']
    if rw=='':
        # skip row
        print('skipping ',row['Resource Name'])
        continue
    age=row['Age Range']
    try:
        # add age ranges to classlist
        for a in age.split(';'):
            cltxt=a.lower().strip().replace(' ','-').replace('>','gt')
            if cltxt!='': classlist='%s age-%s'%(classlist,cltxt)
    except:
        print('age error: ',row['Resource Name'],row['Age Range'])
        pass
    desc=row['Description']
    clink=row['Curriculum Links']
    try:
        # add curriculum links to classlist
        for cl in clink.split(';'):
            cltxt=cl.lower().strip().replace(' ','-')
            if cltxt!='': classlist='%s clink-%s'%(classlist,cltxt)
    except:
        print('curriculum error: ',row['Resource Name'],row['Curriculum Links'])
        pass
    author=row['Author/Originator']
    url=row['URL']
    # print(url,tabIn['URL'][row.index],tabIn['URL'].mask[row.index])
    name=row['Resource Name']
    domain=row['Domain']
    try:
        # add domain to classlist
        for dom in domain.split(';'):
            cltxt=dom.lower().strip().replace(' ','-')
            if cltxt!='': classlist='%s dom-%s'%(classlist,cltxt)
    except:
        print('domain error: ',row['Resource Name'],row['Domain'])
        pass
    rtype=row['Type of Resource']
    try:
        # add resource type to classlist
        for rt in rtype.split(';'):
            cltxt=rt.lower().strip().replace(' ','-')
            if cltxt!='': classlist='%s type-%s'%(classlist,cltxt)
    except:
        print('type error: ',row['Resource Name'],row['Type of Resource'])
        pass
    dur=row['Workshop Duration']
    img=row['Image']

    # generate text for divs
    txt='<div class="block-item %s">\n'%(classlist)
    if tabIn['URL'].mask[row.index]:
        txt=txt+'<h3 class="block-white">%s</h3>\n'%(name)
        txt=txt+'<div class="block-img">\n<img src="%s" alt="image" />\n</div>'%(img)
    else:
        txt=txt+'<h3 class="block-white"><a title="%s" href="%s">%s</a></h3>\n'%(name,url,name)
        txt=txt+'<div class="block-img">\n<a title="%s" href="%s"><img src="%s" alt="image" /></a>\n</div>'%(name,url,img)
    txt=txt+'    <p class="res res-desc">%s</p>\n'%(desc)
    txt=txt+'    <p class="res res-type">%s</p>\n'%(rtype)
    txt=txt+'    <p class="res res-age">'
    try:
        for a in age.split(';'):
            acl=a.lower().strip().replace(' ','-').replace('>','gt')
            txt=txt+'<span class="res-age-item age-%s">%s</span>'%(acl,a)
    except:
        pass
    txt=txt+'</p>\n'
    txt=txt+'    <p class="res res-clink">%s</p>\n'%(clink)
    if rw=='Resource':
        txt=txt+'    <p class="res res-author">%s</p>\n'%(author)
    if rw=='Workshop':
        txt=txt+'    <p class="res res-duration">%s</p>\n'%(dur)
    if tabIn['URL'].mask[row.index]==False:
        txt=txt+'    <p class="res res-url"><span class="res-url"><a title="%s" href="%s">More info ></a></span></p>\n'%(name,url)
    txt=txt+'<hr/>\n'
    txt=txt+'</div>\n\n'

    # print txt
    # print name,domain,rw,age,clink,':',classlist
    # print(row.index,classlist)
    # append html code for this entry to appropriate lists
    if domain=='Astronomy' and rw=='Resource':
        astroHtml.append(txt)
    elif domain=='Physics'and rw=='Resource':
        physHtml.append(txt)
    elif domain=='Gravitational Waves' and rw=='Resource':
        gravHtml.append(txt)
    elif rw=='Workshop':
        workHtml.append(txt)

# write out to HTML files
fOutRes.write('<p>The School of Physics and Astronomy has produced a number of resources in collaboration with <a href="http://www.sciencemadesimple.co.uk/">science made simple</a>, <a href="http://www.lco.global/">Las Cumbres Observatory</a> (LCO), <a href="http://www.stfc.ac.uk/">STFC</a> and others. Here are a few which are particularly designed for use in the classroom.</p><p>You can jump to <a href="#astro">Astronomy</a>, <a href="#gravwaves">Gravitational waves</a> or <a href="#physics">Physics</a> resources.</p>\n')


fOutRes.write('\n<a id="astro"></a><h2>Astronomy</h2>\n')
fOutAstro.write('\n<h2>Astronomy</h2>\n')
for t in astroHtml:
    fOutRes.write(t)
    fOutAstro.write(t)

fOutRes.write('\n<a id="gravwaves"></a><h2>Gravitational Waves</h2>\n')
fOutGrav.write('\n<h2>Gravitational Waves</h2>\n')
for t in gravHtml:
    fOutRes.write(t)
    fOutGrav.write(t)

fOutRes.write('\n<a id="physics"></a><h2>Physics</h2>\n')
fOutPhys.write('\n<h2>Physics</h2>\n')
for t in physHtml:
    fOutRes.write(t)
    fOutPhys.write(t)

fOutWorkshops.write('<ul>\n<li><strong>Looking for a special event for your science class or astronomy club?</strong></li>\n<li><strong>Want to get your group fired up about physics...?</strong></li>\n<li><strong>...or hear about cutting edge research from those working in the field?</strong></li>\n</ul><p>We offer a range of free physics and astronomy presentations to school groups within an hour\'s drive-time of Cardiff. Staff are sometimes available for schools further afield, but there may be small travel costs involved.</p><p>For more information, please email <a href="mailto:schools@astro.cf.ac.uk">schools@astro.cf.ac.uk</a></p>\n')
fOutWorkshops.write('\n<h2>Workshops</h2>\n')
for t in workHtml:
    fOutWorkshops.write(t)

# HTML footer
ftr="""
<script type="text/javascript"/>makeFilters();</script>
</body>
</html>
"""
# write HTML footer to main HTML files
fOutRes.write(ftr)
fOutWorkshops.write(ftr)

# close files
fOutRes.close()
fOutPhys.close()
fOutGrav.close()
fOutAstro.close()
fOutWorkshops.close()