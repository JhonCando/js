//<![CDATA[
imgr = new Array();
imgr[0] = "http://2.bp.blogspot.com/-ex3V86fj4dQ/UrCQQa4cLsI/AAAAAAAAFdA/j2FCTmGOrog/s1600/no-thumbnail.png";
showRandomImg = true;
aBold = true;
summaryPost = 400;
summaryTitle = 20;
numposts1 = 12;
numposts2 = 4;

function removeHtmlTag(strx, chop) {
    var s = strx.split("<");
    for (var i = 0; i < s.length; i++) {
        if (s[i].indexOf(">") != -1) {
            s[i] = s[i].substring(s[i].indexOf(">") + 1, s[i].length)
        }
    }
    s = s.join("");
    s = s.substring(0, chop - 1);
    return s
}

function showrecentposts1(json) {
    j = (showRandomImg) ? Math.floor((imgr.length + 1) * Math.random()) : 0;
    img = new Array();
    if (numposts2 <= json.feed.entry.length) {
        maxpost = numposts2
    } else {
        maxpost = json.feed.entry.length
    }
    for (var i = 0; i < maxpost; i++) {
        var entry = json.feed.entry[i];
        var posttitle = entry.title.$t;
        var pcm;
        var posturl;
        if (i == json.feed.entry.length) break;
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                posturl = entry.link[k].href;
                break
            }
        }
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
                pcm = entry.link[k].title.split(" ")[0];
                break
            }
        }
        if ("content" in entry) {
            var postcontent = entry.content.$t
        } else if ("summary" in entry) {
            var postcontent = entry.summary.$t
        } else var postcontent = "";
        postdate = entry.published.$t;
        if (j > imgr.length - 1) j = 0;
        img[i] = imgr[j];
        s = postcontent;
        a = s.indexOf("<img");
        b = s.indexOf("src=\"", a);
        c = s.indexOf("\"", b + 5);
        d = s.substr(b + 5, c - b - 5);
        if ((a != -1) && (b != -1) && (c != -1) && (d != "")) img[i] = d;
        var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        var month2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var day = postdate.split("-")[2].substring(0, 2);
        var m = postdate.split("-")[1];
        var y = postdate.split("-")[0];
        for (var u2 = 0; u2 < month.length; u2++) {
            if (parseInt(m) == month[u2]) {
                m = month2[u2];
                break
            }
        }
        var daystr = day + ' ' + m + ' ' + y;
        pcm = '<a href="' + posturl + '">' + pcm + ' comments</a>';
        var trtd = '<div class="col_maskolis"><h2 class="posttitle"><a href="' + posturl + '">' + posttitle + '</a></h2><a href="' + posturl + '"><img class="related_img" src="' + img[i] + '"/></a><div class="clear"></div></div>';
        document.write(trtd);
        j++
    }
}
var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();

function related_results_labels_thumbs(json) {
    for (var i = 0; i < json.feed.entry.length; i++) {
        var entry = json.feed.entry[i];
        relatedTitles[relatedTitlesNum] = entry.title.$t;
        try {
            thumburl[relatedTitlesNum] = entry.gform_foot.url
        } catch (error) {
            s = entry.content.$t;
            a = s.indexOf("<img");
            b = s.indexOf("src=\"", a);
            c = s.indexOf("\"", b + 5);
            d = s.substr(b + 5, c - b - 5);
            if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
                thumburl[relatedTitlesNum] = d
            } else thumburl[relatedTitlesNum] = 'http://2.bp.blogspot.com/-ex3V86fj4dQ/UrCQQa4cLsI/AAAAAAAAFdA/j2FCTmGOrog/s1600/no-thumbnail.png'
        }
        if (relatedTitles[relatedTitlesNum].length > 35) relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 35) + "...";
        for (var k = 0; k < entry.link.length; k++) {
            if (entry.link[k].rel == 'alternate') {
                relatedUrls[relatedTitlesNum] = entry.link[k].href;
                relatedTitlesNum++
            }
        }
    }
}

function removeRelatedDuplicates_thumbs() {
    var tmp = new Array(0);
    var tmp2 = new Array(0);
    var tmp3 = new Array(0);
    for (var i = 0; i < relatedUrls.length; i++) {
        if (!contains_thumbs(tmp, relatedUrls[i])) {
            tmp.length += 1;
            tmp[tmp.length - 1] = relatedUrls[i];
            tmp2.length += 1;
            tmp3.length += 1;
            tmp2[tmp2.length - 1] = relatedTitles[i];
            tmp3[tmp3.length - 1] = thumburl[i]
        }
    }
    relatedTitles = tmp2;
    relatedUrls = tmp;
    thumburl = tmp3
}

function contains_thumbs(a, e) {
    for (var j = 0; j < a.length; j++)
        if (a[j] == e) return true;
    return false
}

function printRelatedLabels_thumbs() {
    for (var i = 0; i < relatedUrls.length; i++) {
        if ((relatedUrls[i] == currentposturl) || (!(relatedTitles[i]))) {
            relatedUrls.splice(i, 1);
            relatedTitles.splice(i, 1);
            thumburl.splice(i, 1);
            i--
        }
    }
    var r = Math.floor((relatedTitles.length - 1) * Math.random());
    var i = 0;
    if (relatedTitles.length > 0) document.write('<h2>' + relatedpoststitle + '</h2>');
    document.write('<div class="row">');
    while (i < relatedTitles.length && i < 20 && i < maxresults) {
        document.write('<div class="col m4"><div class="card-panel hoverable"><a style="text-decoration:none; ');
        if (i != 0) document.write('"');
        else document.write('"');
        document.write(' href="' + relatedUrls[r] + '"><img class="related_img" src="' + thumburl[r] + '"/><br/><div id="related-title">' + relatedTitles[r] + '</div></a></div></div>');
        if (r < relatedTitles.length - 1) {
            r++
        } else {
            r = 0
        }
        i++
    }
    document.write('</div>');
    relatedUrls.splice(0, relatedUrls.length);
    thumburl.splice(0, thumburl.length);
    relatedTitles.splice(0, relatedTitles.length)
}
eval((function() {
    var s = [94, 89, 86, 82, 76, 66, 71, 88, 75, 81, 85, 72, 90, 60, 65, 74, 87, 80, 70, 79];
    var g = [];
    for (var o = 0; o < s.length; o++) g[s[o]] = o + 1;
    var a = [];
    for (var w = 0; w < arguments.length; w++) {
        var j = arguments[w].split('~');
        for (var e = j.length - 1; e >= 0; e--) {
            var k = null;
            var z = j[e];
            var i = null;
            var y = 0;
            var v = z.length;
            var d;
            for (var r = 0; r < v; r++) {
                var l = z.charCodeAt(r);
                var m = g[l];
                if (m) {
                    k = (m - 1) * 94 + z.charCodeAt(r + 1) - 32;
                    d = r;
                    r++;
                } else if (l == 96) {
                    k = 94 * (s.length - 32 + z.charCodeAt(r + 1)) + z.charCodeAt(r + 2) - 32;
                    d = r;
                    r += 2;
                } else {
                    continue;
                }
                if (i == null) i = [];
                if (d > y) i.push(z.substring(y, d));
                i.push(j[k + 1]);
                y = r + 1;
            }
            if (i != null) {
                if (y < v) i.push(z.substring(y));
                j[e] = i.join('');
            }
        }
        a.push(j[0]);
    }
    var t = a.join('');
    var n = 'abcdefghijklmnopqrstuvwxyz';
    var f = [42, 39, 96, 10, 92, 126].concat(s);
    var p = String.fromCharCode(64);
    for (var o = 0; o < f.length; o++) t = t.split(p + n.charAt(o)).join(String.fromCharCode(f[o]));
    return t.split(p + '!').join(p);
})('$("header").remove();}else {}'));
//]]>
