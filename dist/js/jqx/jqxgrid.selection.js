!function(e){e.extend(e.jqx._jqxGrid.prototype,{selectallrows:function(){this._trigger=!1;var e=this.virtualmode?this.dataview.totalrecords:this.dataview.loadedrecords.length;this.selectedrowindexes=new Array;for(var t=this.dataview.loadedrecords,i=0;i<e;i++){var l=t[i];if(l){var s=this.getboundindex(l);void 0!=s&&(this.selectedrowindexes[i]=s)}else this.selectedrowindexes[i]=i}"checkbox"!=this.selectionmode||this._checkboxcolumnupdating||this._checkboxcolumn&&this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:!0}),this._renderrows(this.virtualsizeinfo),this._trigger=!0,"checkbox"==this.selectionmode&&this._raiseEvent(2,{rowindex:this.selectedrowindexes})},unselectallrows:function(){this._trigger=!1,this.virtualmode?this.dataview.totalrecords:this.dataview.loadedrecords.length,this.selectedrowindexes=new Array,"checkbox"!=this.selectionmode||this._checkboxcolumnupdating||this._checkboxcolumn&&this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:!1}),this._renderrows(this.virtualsizeinfo),this._trigger=!0,"checkbox"==this.selectionmode&&this._raiseEvent(2,{rowindex:this.selectedrowindexes})},selectrow:function(e,t){this._applyrowselection(e,!0,t),!1!==t&&this._updatecheckboxselection()},_updatecheckboxselection:function(){if("checkbox"==this.selectionmode){var e=this.getrows();if(e&&this._checkboxcolumn){if(0===e.length)return void this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:!1});var t=e.length;this.groupable&&(t=this.dataview.loadedrecords.length),this.virtualmode&&(t=this.source._source.totalrecords);var i=this.selectedrowindexes.length;i===t?this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:!0}):0===i?this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:!1}):this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:null})}}},unselectrow:function(e,t){this._applyrowselection(e,!1,t),!1!==t&&this._updatecheckboxselection()},selectcell:function(e,t){this._applycellselection(e,t,!0)},unselectcell:function(e,t){this._applycellselection(e,t,!1)},clearselection:function(e,t){if(this._trigger=!1,this.selectedrowindex=-1,this._oldselectedcell=null,!1!==t)for(var i=0;i<this.selectedrowindexes.length;i++)this._raiseEvent(3,{rowindex:this.selectedrowindexes[i]});return this.selectedrowindexes=new Array,this.selectedcells=new Array,this.selectedcell=null,"checkbox"!=this.selectionmode||this._checkboxcolumnupdating||this._checkboxcolumn.checkboxelement.jqxCheckBox({checked:!1}),!1===e?void(this._trigger=!0):(this._renderrows(this.virtualsizeinfo),this._trigger=!0,void("checkbox"==this.selectionmode&&this._raiseEvent(3,{rowindex:this.selectedrowindexes})))},getselectedrowindex:function(){if(-1==this.selectedrowindex||void 0==this.selectedrowindex)for(var e=0;e<this.selectedrowindexes.length;e++)return this.selectedrowindexes[e];return this.selectedrowindex},getselectedrowindexes:function(){return this.selectedrowindexes},getselectedcell:function(){if(!this.selectedcell)return null;var e=this.selectedcell;return e.row=this.selectedcell.rowindex,e.column=this.selectedcell.datafield,e.value=this.getcellvalue(e.row,e.column),e},getselectedcells:function(){var e=new Array;for(obj in this.selectedcells)e[e.length]=this.selectedcells[obj];return e},_getcellsforcopypaste:function(){var e=new Array;if(-1==this.selectionmode.indexOf("cell"))for(var t=this.selectedrowindexes,i=0;i<t.length;i++)for(var l=t[i],s=0;s<this.columns.records.length;s++)if("_checkboxcolumn"!==this.columns.records[s].datafield){var o=(this.columns.records[s].datafield,{rowindex:l,datafield:this.columns.records[s].datafield});e.push(o)}return e},deleteselection:function(){var e=this,t=e.getselectedcells();if(-1==this.selectionmode.indexOf("cell")&&(t=this._getcellsforcopypaste()),null!=t&&t.length>0){for(var i=0;i<t.length;i++){var l=t[i],s=e.getcolumn(l.datafield),o=e.getcellvalue(l.rowindex,l.datafield);if(s&&""!==o){var r=null;"checkbox"==s.columntype&&(s.threestatecheckbox||(r=!1)),e._raiseEvent(17,{rowindex:l.rowindex,datafield:l.datafield,value:o}),i==t.length-1?(e.setcellvalue(l.rowindex,l.datafield,r,!0),s.displayfield!=s.datafield&&e.setcellvalue(l.rowindex,s.displayfield,r,!0)):(e.setcellvalue(l.rowindex,l.datafield,r,!1),s.displayfield!=s.datafield&&e.setcellvalue(l.rowindex,s.displayfield,r,!0)),e._raiseEvent(18,{rowindex:l.rowindex,datafield:l.datafield,oldvalue:o,value:r})}}this.dataview.updateview(),this._renderrows(this.virtualsizeinfo)}},copyselection:function(){var t="",i=this;this.clipboardselection={},this.logicalclipboardselection={},this._clipboardselection=[];var l=i.getselectedcells();-1==this.selectionmode.indexOf("cell")&&(l=this._getcellsforcopypaste());var s=new Array;if(null!=l&&l.length>0){for(var o=999999999999999,r=-1,a=0;a<l.length;a++){var d=l[a],n=i.getcolumn(d.datafield);if(null!=n&&n.clipboard&&(!n.hidden||this.copytoclipboardhiddencolumns)){-1==s.indexOf(n.text)&&s.push(n.text);var c=i.getcelltext(d.rowindex,n.displayfield),h=this.getrowdisplayindex(d.rowindex);this.clipboardselection[h]||(this.clipboardselection[h]={}),this.clipboardselection[h][n.displayfield]=c,this.logicalclipboardselection[h]||(this.logicalclipboardselection[h]={}),this.logicalclipboardselection[h][n.displayfield]=c,n.displayfield!=n.datafield&&(this.logicalclipboardselection[h][n.datafield]=i.getcellvalue(d.rowindex,n.datafield)),o=Math.min(o,h),r=Math.max(r,h)}}for(var u=new Array,f=o;f<=r;f++)if(this.logicalclipboardselection[f]){var v=e.extend({},this.logicalclipboardselection[f]);u.push(v)}if(this.logicalclipboardselection=u,this.copytoclipboardwithheaders){for(var p=0;p<s.length;p++)p>0&&(t+="\t"),t+=s[p];t+="\r\n"}for(var f=o;f<=r;f++){var g=0;this._clipboardselection[this._clipboardselection.length]=new Array,void 0!=this.clipboardselection[f]&&(e.each(this.clipboardselection[f],function(e,l){g>0&&(t+="\t");var s=l;null==l&&(s=""),i._clipboardselection[i._clipboardselection.length-1][g]=s,g++,t+=s}),f<r&&(t+="\r\n"))}}return this.clipboardselectedtext=t,t},pasteselection:function(){var e=this.getselectedcells();if(this._oldselectedcell=null,-1==this.selectionmode.indexOf("cell")&&(e=this._getcellsforcopypaste()),null!=e&&e.length>0){var t=e[0].rowindex,i=this.getrowdisplayindex(t),l=e[0].datafield,s=this._getcolumnindex(l);this.selectedrowindexes=new Array,this.selectedcells=new Array;var o=(e.length,0),r=new Array;this.copytoclipboardwithheaders&&this._clipboardselection.splice(0,1);for(var a=0;a<this._clipboardselection.length;a++){o+=this._clipboardselection[a].length,r[a]=new Array;for(var d=0;d<this._clipboardselection[a].length;d++){var n=this._clipboardselection[a][d];r[a].push(n)}}if(o<e.length){for(var c=new Array,a=0;a<e.length;a++){var h=e[a];c[h.rowindex]||(c[h.rowindex]=new Array),c[h.rowindex].push(h)}for(var u=0,f=0,a=0;a<c.length;a++)if(c[a]){for(var d=0;d<c[a].length;d++){var h=c[a][d],v=h.rowindex,p=this.getcolumn(h.datafield);if("_checkboxcolumn"!==p.datafield&&!p.hidden){var n="";if(r[u][f]||(f=0),n=r[u][f],f++,p.cellsformat&&(-1!=p.cellsformat.indexOf("p")||-1!=p.cellsformat.indexOf("c")||-1!=p.cellsformat.indexOf("n")||-1!=p.cellsformat.indexOf("f"))){n.indexOf(this.gridlocalization.currencysymbol)>-1&&(n=n.replace(this.gridlocalization.currencysymbol,""));var g=function(e,t,i){var l=e;if(t==i)return e;for(var s=l.indexOf(t);-1!=s;)l=l.replace(t,i),s=l.indexOf(t);return l};n=g(n,this.gridlocalization.thousandsseparator,""),n=n.replace(this.gridlocalization.decimalseparator,"."),n.indexOf(this.gridlocalization.percentsymbol)>-1&&(n=n.replace(this.gridlocalization.percentsymbol,""));for(var w="",x=0;x<n.length;x++){var m=n.substring(x,x+1);"-"===m&&(w+="-"),"."===m&&(w+="."),null!=m.match(/^[0-9]+$/)&&(w+=m)}n=w,n=n.replace(/ /g,""),n=new Number(n),isNaN(n)&&(n="")}if(this._raiseEvent(17,{rowindex:v,datafield:h.datafield,value:n}),this.setcellvalue(v,p.displayfield,n,!1),p.displayfield!=p.datafield&&this.logicalclipboardselection&&this.logicalclipboardselection[v]){var b=this.logicalclipboardselection[v][p.datafield];void 0!=b&&this.setcellvalue(v,p.datafield,b,!1)}this._raiseEvent(18,{rowindex:v,datafield:h.datafield,oldvalue:this.getcellvalue(h.rowindex,h.datafield),value:n}),this._applycellselection(v,h.datafield,!0,!1)}}u++,r[u]||(u=0)}}else{if(!this._clipboardselection)return;for(var _=0;_<this._clipboardselection.length;_++)for(var y=0;y<this._clipboardselection[_].length;y++){var p=this.getcolumnat(s+y);if(p&&"_checkboxcolumn"!==p.datafield&&!p.hidden){var v=this.getrowboundindex(i+_),h=this.getcell(v,p.datafield),n=null;if(null!=(n=this._clipboardselection[_][y])){if(p.cellsformat&&(-1!=p.cellsformat.indexOf("p")||-1!=p.cellsformat.indexOf("c")||-1!=p.cellsformat.indexOf("n")||-1!=p.cellsformat.indexOf("f"))){n.indexOf(this.gridlocalization.currencysymbol)>-1&&(n=n.replace(this.gridlocalization.currencysymbol,""));var g=function(e,t,i){var l=e;if(t==i)return e;for(var s=l.indexOf(t);-1!=s;)l=l.replace(t,i),s=l.indexOf(t);return l};n=g(n,this.gridlocalization.thousandsseparator,""),n=n.replace(this.gridlocalization.decimalseparator,"."),n.indexOf(this.gridlocalization.percentsymbol)>-1&&(n=n.replace(this.gridlocalization.percentsymbol,""));for(var w="",x=0;x<n.length;x++){var m=n.substring(x,x+1);"-"===m&&(w+="-"),"."===m&&(w+="."),null!=m.match(/^[0-9]+$/)&&(w+=m)}n=w,n=n.replace(/ /g,""),n=new Number(n),isNaN(n)&&(n="")}if(this._raiseEvent(17,{rowindex:v,datafield:h.datafield,value:n}),this.setcellvalue(v,p.displayfield,n,!1),p.displayfield!=p.datafield&&this.logicalclipboardselection){var b=this.logicalclipboardselection[_][p.datafield];void 0!=b&&this.setcellvalue(v,p.datafield,b,!1)}this._raiseEvent(18,{rowindex:v,datafield:h.datafield,oldvalue:this.getcellvalue(h.rowindex,h.datafield),value:n}),this._applycellselection(v,h.datafield,!0,!1)}}}}"checkbox"==this.selectionmode&&this._updatecheckboxselection(),this.dataview.updateview(),this._renderrows(this.virtualsizeinfo)}this.clipboardend&&this.clipboardend("paste")},_applyrowselection:function(e,t,i,l,s){if(null==e)return!1;var o=this.selectedrowindex;if("singlerow"==this.selectionmode&&(t?this._raiseEvent(2,{rowindex:e,row:this.getrowdata(e)}):this._raiseEvent(3,{rowindex:e,row:this.getrowdata(e)}),this._raiseEvent(3,{rowindex:o}),this.selectedrowindexes=new Array,this.selectedcells=new Array),1==l&&(this.selectedrowindexes=new Array),this.dataview.filters.length>0){var r=this.getrowdata(e);r&&void 0!==r.dataindex?e=r.dataindex:r&&void 0===r.dataindex&&void 0!=r.uid&&(e=this.getrowboundindexbyid(r.uid))}var a=this.selectedrowindexes.indexOf(e);if(t)this.selectedrowindex=e,-1==a?(this.selectedrowindexes.push(e),"singlerow"!=this.selectionmode&&this._raiseEvent(2,{rowindex:e,row:this.getrowdata(e)})):"multiplerows"==this.selectionmode&&(this.selectedrowindexes.splice(a,1),this._raiseEvent(3,{rowindex:this.selectedrowindex,row:this.getrowdata(e)}),this.selectedrowindex=this.selectedrowindexes.length>0?this.selectedrowindexes[this.selectedrowindexes.length-1]:-1);else if(a>=0||"singlerow"==this.selectionmode||"multiplerowsextended"==this.selectionmode||"multiplerowsadvanced"==this.selectionmode){var d=this.selectedrowindexes[a];this.selectedrowindexes.splice(a,1),this._raiseEvent(3,{rowindex:d,row:this.getrowdata(e)}),this.selectedrowindex=-1}return(void 0==i||i)&&this._rendervisualrows(),!0},_applycellselection:function(e,t,i,l){if(null==e)return!1;if(null==t)return!1;if(this.selectedrowindex,"singlecell"==this.selectionmode){var s=this.selectedcell;null!=s&&this._raiseEvent(16,{rowindex:s.rowindex,datafield:s.datafield}),this.selectedcells=new Array}if("multiplecellsextended"==this.selectionmode||"multiplecellsadvanced"==this.selectionmode){var s=this.selectedcell;null!=s&&this._raiseEvent(16,{rowindex:s.rowindex,datafield:s.datafield})}var o=e+"_"+t;if(this.dataview.filters.length>0){var r=this.getrowdata(e);if(r&&void 0!==r.dataindex){e=r.dataindex;var o=e+"_"+t}else if(r&&void 0===r.dataindex&&r.uid){e=this.getrowboundindexbyid(r.uid);var o=e+"_"+t}}var a={rowindex:e,datafield:t};return i?(this.selectedcell=a,this.selectedcells[o]?"multiplecells"!=this.selectionmode&&"multiplecellsextended"!=this.selectionmode&&"multiplecellsadvanced"!=this.selectionmode||(delete this.selectedcells[o],this.selectedcells.length>0&&this.selectedcells.length--,this._raiseEvent(16,a)):(this.selectedcells[o]=a,this.selectedcells.length++,this._raiseEvent(15,a))):(delete this.selectedcells[o],this.selectedcells.length>0&&this.selectedcells.length--,this._raiseEvent(16,a)),(void 0==l||l)&&this._rendervisualrows(),!0},_getcellindex:function(t){var i=-1;return e.each(this.selectedcells,function(){if(i++,this[t])return!1}),i},_clearhoverstyle:function(){if(void 0!=this.hoveredrow&&-1!=this.hoveredrow&&!this.vScrollInstance.isScrolling()&&!this.hScrollInstance.isScrolling()){var e=this.table.find(".jqx-grid-cell-hover");e.length>0&&(e.removeClass(this.toTP("jqx-grid-cell-hover")),e.removeClass(this.toTP("jqx-fill-state-hover"))),this.hoveredrow=-1}},_clearselectstyle:function(){for(var t=this.table[0].rows.length,i=this.table[0].rows,l=this.toTP("jqx-grid-cell-selected"),s=this.toTP("jqx-fill-state-pressed"),o=this.toTP("jqx-grid-cell-hover"),r=this.toTP("jqx-fill-state-hover"),a=0;a<t;a++)for(var d=i[a],n=d.cells.length,c=d.cells,h=0;h<n;h++){var u=c[h],f=e(u);-1!=u.className.indexOf("jqx-grid-cell-selected")&&(f.removeClass(l),f.removeClass(s)),-1!=u.className.indexOf("jqx-grid-cell-hover")&&(f.removeClass(o),f.removeClass(r))}},_selectpath:function(e,t){var i=this,l=this._lastClickedCell?Math.min(this._lastClickedCell.row,e):0,s=this._lastClickedCell?Math.max(this._lastClickedCell.row,e):0;if(l<=s){var o=this._getcolumnindex(this._lastClickedCell.column),r=this._getcolumnindex(t),a=Math.min(o,r),d=Math.max(o,r);this.selectedcells=new Array;for(var n=this.dataview.loadedrecords,c=l;c<=s;c++)for(var h=a;h<=d;h++){var e=n[c];this._applycellselection(i.getboundindex(e),i._getcolumnat(h).datafield,!0,!1)}this._rendervisualrows()}},_selectrowpath:function(e){if("multiplerowsextended"==this.selectionmode){var t=this._lastClickedCell?Math.min(this._lastClickedCell.row,e):0,i=this._lastClickedCell?Math.max(this._lastClickedCell.row,e):0,l=this.dataview.loadedrecords;if(t<=i){this.selectedrowindexes=new Array;for(var s=t;s<=i;s++){var e=l[s],o=this.getrowboundindex(s);this._applyrowselection(o,!0,!1)}this._rendervisualrows()}}},_selectrowwithmouse:function(e,t,i,l,s,o){var r=t.row;if(void 0!=r){var a=t.index;if(void 0!=this.hittestinfo[a]){var d=this.hittestinfo[a].visualrow;if(!this.hittestinfo[a].details&&(d.cells[0].className,!r.group)){if("multiplerows"==this.selectionmode||"multiplecells"==this.selectionmode||"checkbox"==this.selectionmode||-1!=this.selectionmode.indexOf("multiple")&&(1==o||1==s)){var n=this.getboundindex(r);if(this.dataview.filters.length>0){var c=this.getrowdata(n);if(c&&void 0==(n=c.dataindex))var n=this.getboundindex(r)}var h=-1!=i.indexOf(n),u=this.getboundindex(r)+"_"+l;if(-1!=this.selectionmode.indexOf("cell")){var f=void 0!=this.selectedcells[u];if(void 0!=this.selectedcells[u]&&f?this._selectcellwithstyle(e,!1,a,l,d):this._selectcellwithstyle(e,!0,a,l,d),o&&void 0==this._lastClickedCell){var v=this.getselectedcells();v&&v.length>0&&(this._lastClickedCell={row:v[0].rowindex,column:v[0].datafield})}o&&this._lastClickedCell&&(this._selectpath(r.visibleindex,l),this.mousecaptured=!1,"visible"==this.selectionarea.css("visibility")&&this.selectionarea.css("visibility","hidden"))}else{if(h?s?this._applyrowselection(this.getboundindex(r),!1):this._selectrowwithstyle(e,d,!1,l):this._selectrowwithstyle(e,d,!0,l),o&&void 0==this._lastClickedCell){var p=this.getselectedrowindexes();p&&p.length>0&&(this._lastClickedCell={row:p[0],column:l})}if(o&&this._lastClickedCell){this.selectedrowindexes=new Array;for(var g=this._lastClickedCell?Math.min(this._lastClickedCell.row,r.visibleindex):0,w=this._lastClickedCell?Math.max(this._lastClickedCell.row,r.visibleindex):0,x=this.dataview.loadedrecords,m=g;m<=w;m++){var r=x[m];r&&this._applyrowselection(this.getboundindex(r),!0,!1,!1)}this._rendervisualrows()}}}else this._clearselectstyle(),this._selectrowwithstyle(e,d,!0,l),-1!=this.selectionmode.indexOf("cell")&&this._selectcellwithstyle(e,!0,a,l,d);o||(this._lastClickedCell={row:r.visibleindex,column:l})}}}},_selectcellwithstyle:function(t,i,l,s,o){var r=e(o.cells[t._getcolumnindex(s)]);r.removeClass(this.toTP("jqx-grid-cell-hover")),r.removeClass(this.toTP("jqx-fill-state-hover")),i?(r.addClass(this.toTP("jqx-grid-cell-selected")),r.addClass(this.toTP("jqx-fill-state-pressed"))):(r.removeClass(this.toTP("jqx-grid-cell-selected")),r.removeClass(this.toTP("jqx-fill-state-pressed")))},_selectrowwithstyle:function(t,i,l,s){var o=i.cells.length,r=0;t.rowdetails&&t.showrowdetailscolumn?this.rtl?(o-=1,o-=this.groups.length):r=1+this.groups.length:this.groupable&&(this.rtl?o-=this.groups.length:r=this.groups.length);for(var a=r;a<o;a++){var d=i.cells[a];l?(e(d).removeClass(this.toTP("jqx-grid-cell-hover")),e(d).removeClass(this.toTP("jqx-fill-state-hover")),-1==t.selectionmode.indexOf("cell")&&(e(d).addClass(this.toTP("jqx-grid-cell-selected")),e(d).addClass(this.toTP("jqx-fill-state-pressed")))):(e(d).removeClass(this.toTP("jqx-grid-cell-hover")),e(d).removeClass(this.toTP("jqx-grid-cell-selected")),e(d).removeClass(this.toTP("jqx-fill-state-hover")),e(d).removeClass(this.toTP("jqx-fill-state-pressed")))}},_handlemousemoveselection:function(t,i){if(i.hScrollInstance.isScrolling()||i.vScrollInstance.isScrolling())return!1;if(("multiplerowsextended"==i.selectionmode||"multiplecellsextended"==i.selectionmode||"multiplecellsadvanced"==i.selectionmode)&&i.mousecaptured){if(i.multipleselectionbegins){if(!1===i.multipleselectionbegins(t))return!0}var l=this.showheader?this.columnsheader.height()+2:0,s=this._groupsheader()?this.groupsheader.height():0;s+=this.showtoolbar?this.toolbar.height():0;var o=this.host.coord();if(this.hasTransform){o=e.jqx.utilities.getOffset(this.host);var r=this._getBodyOffset();o.left-=r.left,o.top-=r.top}"0px"===this.host.css("border-top-width")&&(s-=2);var a=t.pageX,d=t.pageY-s;if(Math.abs(this.mousecaptureposition.left-a)>3||Math.abs(this.mousecaptureposition.top-d)>3){parseInt(this.columnsheader.coord().top);this.hasTransform&&e.jqx.utilities.getOffset(this.columnsheader).top,a<o.left&&(a=o.left),a>o.left+this.host.width()&&(a=o.left+this.host.width());var n=o.top+l;d<n&&(d=n+5);var c=parseInt(Math.min(i.mousecaptureposition.left,a)),h=-5+parseInt(Math.min(i.mousecaptureposition.top,d)),u=parseFloat(Math.abs(i.mousecaptureposition.left-a)),f=parseInt(Math.abs(i.mousecaptureposition.top-d));if(c-=o.left,h-=o.top,this.selectionarea.css("visibility","visible"),"multiplecellsadvanced"==i.selectionmode){var a=c,v=a+u,p=i.hScrollInstance,g=p.value;this.rtl&&("hidden"!=this.hScrollBar.css("visibility")&&(g=p.max-p.value),this.vScrollBar[0].style.visibility);var w=i.table[0].rows[0],x=0,m=i.mousecaptureposition.clickedcell,b=m,_=!1,y=0,k=w.cells.length;i.mousecaptureposition.left<=t.pageX&&(y=m);for(var C=!1,q=y;q<k;q++){var j=parseFloat(e(this.columnsrow[0].cells[q]).css("left")),O=j-g;if(!i.columns.records[q].pinned||i.columns.records[q].hidden){if(C){_=!0,b--;break}var T=this._getcolumnat(q);if(!(null!=T&&T.hidden||i.groupable&&i.groups.length>0&&q<i.groups.length)){var A=O+e(this.columnsrow[0].cells[q]).width();if(i.mousecaptureposition.left>t.pageX){if(A>=a&&a>=O){b=q,_=!0;break}}else if(A>=v&&v>=O){b=q,_=!0;break}}}else{q==m&&(C=!0);var A=j+e(this.columnsrow[0].cells[q]).width();if(i.mousecaptureposition.left>t.pageX){if(A>=a&&a>=O){b=q,_=!0;break}}else if(A>=v&&v>=O){b=q,_=!0;break}}}_||(i.mousecaptureposition.left>t.pageX?e.each(this.columns.records,function(e,t){return!!(i.groupable&&i.groups.length>0&&e<i.groups.length)||(this.pinned||this.hidden?void 0:(b=e,!1))}):(!i.groupable||i.groupable&&!i.groups.length>0)&&(b=w.cells.length-1));var S=m;m=Math.min(m,b),b=Math.max(S,b),h+=5,h+=s;for(var E=(i.table[0].rows.indexOf(i.mousecaptureposition.clickedrow),0),P=-1,I=-1,M=0,q=0;q<i.table[0].rows.length;q++){var K=e(i.table[0].rows[q]);0==q&&(M=K.coord().top);var z=K.height(),N=M-o.top;if(-1==P&&N+z>=h){for(var B=!1,F=0;F<i.groups.length;F++){var X=K[0].cells[F].className;if(-1!=X.indexOf("jqx-grid-group-collapse")||-1!=X.indexOf("jqx-grid-group-expand")){B=!0;break}}if(B)continue;P=q}if(M+=z,i.groupable&&i.groups.length>0){for(var B=!1,F=0;F<i.groups.length;F++){var X=K[0].cells[F].className;if(-1!=X.indexOf("jqx-grid-group-collapse")||-1!=X.indexOf("jqx-grid-group-expand")){B=!0;break}}if(B)continue;for(var x=0,D=i.groups.length;D<K[0].cells.length;D++){var Y=K[0].cells[D];""==e(Y).html()&&x++}if(x==K[0].cells.length-i.groups.length)continue}if(-1!=P&&(E+=z),N+z>h+f){I=q;break}}if(-1!=P){h=e(i.table[0].rows[P]).coord().top-o.top-s-2;var $=0;this.filterable&&this.showfilterrow&&($=this.filterrowheight),parseFloat(i.table[0].style.top)<0&&h<this.rowsheight+$&&(h-=parseFloat(i.table[0].style.top),E+=parseFloat(i.table[0].style.top)),f=E;var G=e(this.columnsrow[0].cells[m]),L=e(this.columnsrow[0].cells[b]);if(c=parseFloat(G.css("left")),u=parseFloat(L.css("left"))-parseFloat(c)+L.width()-2,c-=g,C&&(c+=g),i.editcell&&i.editable&&i.endcelledit&&(m!=b||P!=I)){if(0==i.editcell.validated)return;i.endcelledit(i.editcell.row,i.editcell.column,!0,!0)}}}this.selectionarea.width(u),this.selectionarea.height(f),this.selectionarea.css("left",c),this.selectionarea.css("top",h)}}},_handlemouseupselection:function(t,i){if(this.selectionarea){if("visible"!=this.selectionarea[0].style.visibility)return i.mousecaptured=!1,!0;if(i.mousecaptured&&("multiplerowsextended"==i.selectionmode||"multiplerowsadvanced"==i.selectionmode||"multiplecellsextended"==i.selectionmode||"multiplecellsadvanced"==i.selectionmode)&&(i.mousecaptured=!1,"visible"==this.selectionarea.css("visibility"))){this.selectionarea.css("visibility","hidden");var l=this.showheader?this.columnsheader.height()+2:0,s=this._groupsheader()?this.groupsheader.height():0;"0px"===this.host.css("border-top-width")&&(s-=2);s+=this.showtoolbar?this.toolbar.height():0;var o=this.selectionarea.coord(),r=this.host.coord();this.hasTransform&&(r=e.jqx.utilities.getOffset(this.host),o=e.jqx.utilities.getOffset(this.selectionarea)),"0px"===this.host.css("border-top-width")&&(s-=2);var a=o.left-r.left,d=o.top-l-r.top-s,n=d,c=a+this.selectionarea.width(),h=a,u=new Array,f=new Array;if("multiplerowsextended"==i.selectionmode){for(;d<n+this.selectionarea.height();){var v=this._hittestrow(a,d),p=v.row,g=v.index;-1!=g&&(f[g]||(f[g]=!0,u[u.length]=v)),d+=20}var n=0;e.each(u,function(){var e=this.row;"none"!=i.selectionmode&&i._selectrowwithmouse&&(t.ctrlKey||t.metaKey?i._applyrowselection(i.getboundindex(e),!0,!1,!1):0==n?i._applyrowselection(i.getboundindex(e),!0,!1,!0):i._applyrowselection(i.getboundindex(e),!0,!1,!1),n++)})}else{"multiplecellsadvanced"==i.selectionmode&&(d+=2);var w=i.hScrollInstance,x=w.value;this.rtl&&("hidden"!=this.hScrollBar.css("visibility")&&(x=w.max-w.value),"hidden"!=this.vScrollBar[0].style.visibility&&(x-=this.scrollbarsize+4));var m=i.table[0].rows[0],b=i.selectionarea.height();!t.ctrlKey&&!t.metaKey&&b>0&&(i.selectedcells=new Array);for(var _=b;d<n+_;){var v=i._hittestrow(a,d);if(v){var p=v.row,g=v.index;if(-1!=g&&!f[g]){f[g]=!0;for(var y=0;y<m.cells.length;y++){var k=parseFloat(e(i.columnsrow[0].cells[y]).css("left"))-x,C=k+e(i.columnsrow[0].cells[y]).width();(h>=k&&h<=C||c>=k&&c<=C||k>=h&&k<=c)&&i._applycellselection(i.getboundindex(p),i._getcolumnat(y).datafield,!0,!1)}}d+=5}else d+=5}}i.autosavestate&&i.savestate&&i.savestate(),i._renderrows(i.virtualsizeinfo)}}},selectprevcell:function(e,t){var i=this._getcolumnindex(t),l=(this.columns.records.length,this._getprevvisiblecolumn(i));null!=l&&(this.clearselection(),this.selectcell(e,l.datafield))},selectnextcell:function(e,t){var i=this._getcolumnindex(t),l=(this.columns.records.length,this._getnextvisiblecolumn(i));null!=l&&(this.clearselection(),this.selectcell(e,l.datafield))},_getfirstvisiblecolumn:function(){for(var e=this.columns.records.length,t=0;t<e;t++){var i=this.columns.records[t];if(!i.hidden&&null!=i.datafield)return i}return null},_getlastvisiblecolumn:function(){for(var e=this.columns.records.length,t=e-1;t>=0;t--){var i=this.columns.records[t];if(!i.hidden&&null!=i.datafield)return i}return null},_handlekeydown:function(t,i){if(i.groupable&&i.groups.length,i.disabled)return!1;var l=t.charCode?t.charCode:t.keyCode?t.keyCode:0;if(i.editcell&&"multiplecellsadvanced"!=i.selectionmode)return!0;if(i.editcell&&"multiplecellsadvanced"==i.selectionmode){if(!(l>=33&&l<=40))return!0;if(t.altKey)return i._cancelkeydown=!1,!0;if(void 0!=i._cancelkeydown&&0!=i._cancelkeydown)return i._cancelkeydown=!1,!0;if("selectedrow"===i.editmode)return!0;if(i.endcelledit(i.editcell.row,i.editcell.column,!1,!0),i._cancelkeydown=!1,i.editcell&&!i.editcell.validated)return i._rendervisualrows(),i.endcelledit(i.editcell.row,i.editcell.column,!1,!0),!1}if("none"==i.selectionmode)return!0;if(i.showfilterrow&&i.filterable&&this.filterrow&&e(t.target).ischildof(i.filterrow))return!0;if(i.showeverpresentrow){if(i.addnewrowtop&&e(t.target).ischildof(i.addnewrowtop))return!0;if(i.addnewrowbottom&&e(t.target).ischildof(i.addnewrowbottom))return!0}if(t.target.className&&t.target.className.indexOf("jqx-grid-widget")>=0)return!0;if(i.pageable&&e(t.target).ischildof(this.pager))return!0;if(this.showtoolbar&&e(t.target).ischildof(this.toolbar))return!0;if(this.showstatusbar&&e(t.target).ischildof(this.statusbar))return!0;var s=!1;if(t.altKey)return!0;if((t.ctrlKey||t.metaKey)&&this.clipboard){var o=String.fromCharCode(l).toLowerCase();if(this.clipboardbegin){var r=null;if("c"==o?r=this.clipboardbegin("copy",this.copyselection()):"x"==o?r=this.clipboardbegin("cut",this.copyselection()):"v"==o&&(r=this.clipboardbegin("paste")),!1===r)return!1}if("c"==o||"x"==o){var a=this.copyselection();if("c"==o&&this.clipboardend&&this.clipboardend("copy"),"x"==o&&this.clipboardend&&this.clipboardend("cut"),window.clipboardData)window.clipboardData.setData("Text",a);else{var d=e('<textarea style="position: absolute; left: -1000px; top: -1000px;"/>');d.val(a),e("body").append(d),d.select(),setTimeout(function(){document.designMode="off",d.select(),d.remove(),i.focus()},100)}if("c"==o&&e.jqx.browser.msie)return!1;if("c"==o)return!0}else if("v"==o){var n=e('<textarea style="position: absolute; left: -1000px; top: -1000px;"/>');e("body").append(n),n.select();var c=this;return setTimeout(function(){c._clipboardselection=new Array;var e=n.val();if(0==e.length&&window.clipboardData){n.val(window.clipboardData.getData("Text"));var e=n.val()}for(var t=e.split("\n"),i=0;i<t.length;i++)if(t[i].split("\t").length>0){var l=t[i].split("\t");if(1==l.length&&i==t.length-1&&""==l[0])continue;l.length>0&&c._clipboardselection.push(l)}c.pasteselection(),n.remove(),c.focus()},100),!0}if("x"==o)return this.deleteselection(),this.host.focus(),!1}var h=Math.round(i._gettableheight()),u=Math.round(h/i.rowsheight),f=i.getdatainformation();switch(i.selectionmode){case"singlecell":case"multiplecells":case"multiplecellsextended":case"multiplecellsadvanced":var v=i.getselectedcell();if(null!=v){var p=this.getrowvisibleindex(v.rowindex),g=p,w=v.datafield,x=i._getcolumnindex(w),m=(i.columns.records.length,function(e,l,o,r){var a=function(e,t){var l=i.dataview.loadedrecords[e];if(i.groupable&&i.groups.length>0){var a=e;"up"==r&&a++,"down"==r&&a--;for(var l=i.getdisplayrows()[a],d=1,n=!0;n&&d<300&&(n=!1,"down"==r?l=i.getdisplayrows()[a+d]:"up"==r&&(l=i.getdisplayrows()[a-d]),l);){l&&l.group&&(n=!0);for(var c=l.parentItem;c;)c&&!function(e){return!!e.group&&(i.expandedgroups[e.uniqueid]?i.expandedgroups[e.uniqueid].expanded:void 0)}(c)&&(n=!0),c=c.parentItem;if(!n)break;d++}if(300==d&&(l=null),i.pageable){var h=!1;if(l){for(var u=0;u<i.dataview.rows.length;u++)i.dataview.rows[u].boundindex==l.boundindex&&(h=!0);h||(l=null)}}}if(void 0!=l&&null!=t){(o||void 0==o)&&i.clearselection();var f=i.getboundindex(l);return i.selectcell(f,t),i._oldselectedcell=i.selectedcell,s=!0,i.ensurecellvisible(e,t),!0}return!1};if(a(e,l)||(i.ensurecellvisible(e,l),a(e,l),i.virtualmode&&i.host.focus()),!(i.groupable&&i.groups.length>0))if(t.shiftKey&&9!=t.keyCode){if(("multiplecellsextended"==i.selectionmode||"multiplecellsadvanced"==i.selectionmode)&&i._lastClickedCell){i._selectpath(e,l);var d=i.dataview.loadedrecords[e],n=i.getboundindex(d);return void(i.selectedcell={rowindex:n,datafield:l})}}else t.shiftKey||(i._lastClickedCell={row:e,column:l})}),b=t.shiftKey&&"singlecell"!=i.selectionmode&&"multiplecells"!=i.selectionmode,_=function(){m(0,w,!b)},y=function(){var e=f.rowscount-1;m(e,w,!b)},k=9==l&&!t.shiftKey,C=9==l&&t.shiftKey;if(i.rtl){var q=k;k=C,C=q}if((k||C)&&(b=!1),(k||C)&&document.activeElement&&document.activeElement.className&&document.activeElement.className.indexOf("jqx-grid-cell-add-new-row")>=0)return!0;var j=t.ctrlKey||t.metaKey;if(j&&37==l){var O=i._getfirstvisiblecolumn(x);null!=O&&m(g,O.datafield)}else if(j&&39==l){var T=i._getlastvisiblecolumn(x);null!=T&&m(g,T.datafield)}else if(39==l||k){var A=i._getnextvisiblecolumn(x);if(null!=A)m(g,A.datafield,!b);else if(k){var S=i._getfirstvisiblecolumn();l=40,w=S.displayfield}else s=!0}else if(37==l||C){var O=i._getprevvisiblecolumn(x);if(null!=O)m(g,O.datafield,!b);else if(C){var E=i._getlastvisiblecolumn();l=38,w=E.displayfield}else s=!0}else if(36==l)_();else if(35==l)y();else if(33==l)if(g-u>=0){var P=g-u;m(P,w,!b)}else _();else if(34==l)if(f.rowscount>g+u){var P=g+u;m(P,w,!b)}else y();38==l&&(j?_():g>0?m(g-1,w,!b,"up"):s=!0),40==l&&(j?y():f.rowscount>g+1||i.groupable&&i.groups.length>0?m(g+1,w,!b,"down"):s=!0)}break;case"singlerow":case"multiplerows":case"multiplerowsextended":case"multiplerowsadvanced":var g=i.getselectedrowindex();if(null==g||-1==g)return!0;g=this.getrowvisibleindex(g);var I=function(e,o,r){var a=function(e){var t=i.dataview.loadedrecords[e];if(i.groupable&&i.groups.length>0){"up"==r&&e++,"down"==r&&e--;for(var t=i.getdisplayrows()[e],l=1,a=!0;a&&l<300&&(a=!1,"down"==r?t=i.getdisplayrows()[e+l]:"up"==r&&(t=i.getdisplayrows()[e-l]),t);){t&&t.group&&(a=!0);for(var d=t.parentItem;d;)d&&!function(e){return!!e.group&&(i.expandedgroups[e.uniqueid]?i.expandedgroups[e.uniqueid].expanded:void 0)}(d)&&(a=!0),d=d.parentItem;if(!a)break;l++}if(300==l&&(t=null),i.pageable){var n=!1;if(t){for(var c=0;c<i.dataview.rows.length;c++)i.dataview.rows[c].boundindex==t.boundindex&&(n=!0);n||(t=null)}}}if(void 0!=t){var h=i.getboundindex(t),u=i.selectedrowindex;(o||void 0==o)&&i.clearselection(),i.selectedrowindex=u,i.selectrow(h,!1);return(!i.ensurerowvisible(e)||i.autoheight||i.groupable)&&i._rendervisualrows(),s=!0,!0}return!1};if(a(e)||(i.ensurerowvisible(e),a(e),i.virtualmode&&setTimeout(function(){a(e)},25),i.virtualmode&&i.host.focus()),!(i.groupable&&i.groups.length>0))if(t.shiftKey&&9!=l){if("multiplerowsextended"==i.selectionmode&&i._lastClickedCell)return i._selectrowpath(e),void(i.selectedrowindex=i.getrowboundindex(e))}else t.shiftKey||(i._lastClickedCell={row:e},i.selectedrowindex=i.getrowboundindex(e))},b=t.shiftKey&&"singlerow"!=i.selectionmode&&"multiplerows"!=i.selectionmode,_=function(){I(0,!b)},y=function(){var e=f.rowscount-1;I(e,!b)},j=t.ctrlKey||t.metaKey;if(36==l||j&&38==l)_();else if(35==l||j&&40==l)y();else if(33==l)if(g-u>=0){var P=g-u;I(P,!b)}else _();else if(34==l)if(f.rowscount>g+u){var P=g+u;I(P,!b)}else y();else 38==l?g>0?I(g-1,!b,"up"):s=!0:40==l&&(f.rowscount>g+1||i.groupable&&i.groups.length>0?I(g+1,!b,"down"):s=!0)}return!s||(i.autosavestate&&i.savestate&&i.savestate(),!1)},_handlemousemove:function(t,i){if(!i.vScrollInstance.isScrolling()&&!i.hScrollInstance.isScrolling()){var l,s,o,r,a;if(i.enablehover||"multiplerows"==i.selectionmode){l=this.showheader?this.columnsheader.height()+2:0,s=this._groupsheader()?this.groupsheader.height():0;if(s+=this.showtoolbar?this.toolbarheight:0,
o=this.host.coord(),this.hasTransform){o=e.jqx.utilities.getOffset(this.host);var d=this._getBodyOffset();o.left-=d.left,o.top-=d.top}r=t.pageX-o.left,a=t.pageY-l-o.top-s}if("multiplerowsextended"!=i.selectionmode&&"multiplecellsextended"!=i.selectionmode&&"multiplecellsadvanced"!=i.selectionmode||1!=i.mousecaptured){if(!i.enablehover)return!0;if(!i.disabled&&!this.vScrollInstance.isScrolling()&&!this.hScrollInstance.isScrolling()){var n=this._hittestrow(r,a);if(n){var c=n.row,h=n.index;if((-1==this.hoveredrow||-1==h||this.hoveredrow!=h||-1!=this.selectionmode.indexOf("cell")||"checkbox"==this.selectionmode)&&(this._clearhoverstyle(),-1!=h&&void 0!=c)){var u=this.hittestinfo[h].visualrow;if(null!=u&&!(this.hittestinfo[h].details||t.clientX>e(u).width()+e(u).coord().left)){var f=0,v=u.cells.length;if(i.rowdetails&&i.showrowdetailscolumn?this.rtl?(v-=1,v-=this.groups.length):f=1+this.groups.length:this.groupable&&(this.rtl?v-=this.groups.length:f=this.groups.length),0!=u.cells.length){var p=u.cells[f].className;if(!(c.group||this.selectionmode.indexOf("row")>=0&&-1!=p.indexOf("jqx-grid-cell-selected")))if(this.hoveredrow=h,-1==this.selectionmode.indexOf("cell")&&"checkbox"!=this.selectionmode)for(var g=f;g<v;g++){var w=u.cells[g];e(w).addClass(this.toTP("jqx-grid-cell-hover")),e(w).addClass(this.toTP("jqx-fill-state-hover")),this.cellhover&&this.cellhover(w,t.pageX,t.pageY)}else{var x=-1,m=this.hScrollInstance,b=m.value;this.rtl&&"hidden"!=this.hScrollBar.css("visibility")&&(b=m.max-m.value);for(var g=f;g<v;g++){var _=parseInt(e(this.columnsrow[0].cells[g]).css("left"))-b;this.columns.records[g].pinned&&!this.rtl&&(_=parseInt(e(this.columnsrow[0].cells[g]).css("left")));var y=_+e(this.columnsrow[0].cells[g]).width();if(y>=r&&r>=_){x=g;break}}if(-1!=x){var w=u.cells[x];if(this.cellhover&&this.cellhover(w,t.pageX,t.pageY),-1==w.className.indexOf("jqx-grid-cell-selected")){if(this.editcell){var k=this._getcolumnat(x);if(k&&this.editcell.row==h&&this.editcell.column==k.datafield)return}e(w).addClass(this.toTP("jqx-grid-cell-hover")),e(w).addClass(this.toTP("jqx-fill-state-hover"))}}}}}}}}}}}})}(jqxBaseFramework);