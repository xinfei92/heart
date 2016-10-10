/*
 jQWidgets v4.5.0 (2017-Jan)
 Copyright (c) 2011-2017 jQWidgets.
 License: http://jqwidgets.com/license/
 */
!function (a) {
    console.log(a);
    a.extend(a.jqx._jqxGrid.prototype, {
        _updatefilterrowui: function (b) {
            var c = this.columns.records.length,
                d = 0,
                e = this;
            if (this.filterrow) {
                for (var f = 0; f < c; f++) {
                    var g = this.columns.records[f],
                        h = g.width;
                    h < g.minwidth && (h = g.minwidth), h > g.maxwidth && (h = g.maxwidth);
                    var i = a(this.filterrow[0].cells[f]);
                    i.css("left", d);
                    var j = !0;
                    if (i.width() == h && (j = !1), b && (j = !0), i.width(h), i[0].left = d, g.hidden && g.hideable ? i.css("display", "none") : d += h, j)
                        if (g.createfilterwidget && "custom" == g.filtertype) g.createfilterwidget(g, i);
                        else if (g.filterable) {
                            var k = function (b, c) {
                                var d = a(c.children()[0]);
                                d.width(h - 10), d.attr("disabled", b.disabled)
                            };
                            switch (g.filtertype) {
                                case "number":
                                case "input":
                                    a(i.children()[0]).width(h),
                                        i.find("input").width(h - 30),
                                        i.find("input").attr("disabled", e.disabled),
                                        a(i.find(".jqx-dropdownlist-state-normal")).jqxDropDownList({
                                            theme: e.theme,
                                            disabled: e.disabled
                                        });
                                    break;
                                case "date":
                                case "range":
                                    this.host.jqxDateTimeInput ? a(i.children()[0]).jqxDateTimeInput({
                                        theme: e.theme,
                                        disabled: e.disabled,
                                        width: h - 10
                                    }) : k(this, i);
                                    break;
                                case "textbox":
                                case "default":
                                    k(this, i);
                                    break;
                                case "list":
                                case "checkedlist":
                                    this.host.jqxDropDownList ? a(i.children()[0]).jqxDropDownList({
                                        theme: e.theme,
                                        disabled: e.disabled,
                                        width: h - 10
                                    }) : k(this, i);
                                    break;
                                case "bool":
                                case "boolean":
                                    this.host.jqxCheckBox ? a(i.children()[0]).jqxCheckBox({
                                        theme: e.theme,
                                        disabled: e.disabled
                                    }) : k(this, i)
                            }
                        }
                }
                var l = a(this.filterrow.children()[0]);
                l.width(parseInt(d) + 2), l.height(this.filterrowheight)
            }
        },
        clearfilterrow: function (b) {
            if (this._disablefilterrow = !0, this.columns.records) {
                for (var c = this.columns.records.length, d = 0; d < c; d++) {
                    var e = this.columns.records[d],
                        f = a(this.filterrow[0].cells[d]);
                    if (("string" != typeof b || e.displayfield == b) && e.filterable) {
                        var g = function (b, c) {
                            var d = a(c.children()[0]);
                            d.val(""), d[0] && (b["_oldWriteText" + d[0].id] = "")
                        };
                        switch (e.filtertype) {
                            case "number":
                            case "input":
                                if (f.find("input").val(""), this.host.jqxDropDownList) {
                                    var h = a(a(a(f).children()[0]).children()[1]);
                                    h.jqxDropDownList("clearSelection");
                                    var i = 0;
                                    if (0 == i) {
                                        var j = (this._getfiltersbytype("number" == e.filtertype ? "number" : "string"), new a.jqx.filter),
                                            k = j.getoperatorsbyfiltertype("number" == e.filtertype ? "numberfilter" : "stringfilter");
                                        null != e.filtercondition ? (i = k.indexOf(e.filtercondition.toUpperCase()),
                                        i == -1 && (i = "number" == e.filtertype ? 0 : 2)) : i = "number" == e.filtertype ? 0 : 2
                                    }
                                    h.jqxDropDownList({selectedIndex: i}), h.jqxDropDownList("ensureVisible", i)
                                }
                                break;
                            case "date":
                            case "range":
                                this.host.jqxDateTimeInput ? a(f.children()[0]).jqxDateTimeInput("setDate", null) : g(this, f);
                                break;
                            case "textbox":
                            case "default":
                                g(this, f);
                                break;
                            case "list":
                                this.host.jqxDropDownList ? a(f.children()[0]).jqxDropDownList("clearSelection") : g(this, f);
                                break;
                            case "checkedlist":
                                this.host.jqxDropDownList ? a(f.children()[0]).jqxDropDownList("checkAll", !1) : g(this, f);
                                break;
                            case "bool":
                            case "boolean":
                                this.host.jqxCheckBox ? a(f.children()[0]).jqxCheckBox({checked: null}) : g(this, f)
                        }
                    }
                }
                this._disablefilterrow = !1
            }
        },
        _applyfilterfromfilterrow: function () {
            if (1 != this._disablefilterrow && !this.disabled) {
                for (var b = this.columns.records.length, c = this.that, d = 0; d < b; d++) {
                    var e = new a.jqx.filter,
                        f = this.columns.records[d];
                    if (f.filterable && null !== f.datafield) {
                        var g = c._getcolumntypebydatafield(f),
                            h = c._getfiltertype(g),
                            i = 1,
                            j = !0,
                            k = (f.filtertype, function (a, b, d) {
                                var e = !0;
                                if (a._filterwidget) {
                                    var f = a._filterwidget.val();
                                    if ("" != f) {
                                        var g = "equal";
                                        if ("stringfilter" == b) var g = "contains";
                                        if ("numericfilter" == b &&
                                            "," == c.gridlocalization.decimalseparator &&
                                            f.indexOf(c.gridlocalization.decimalseparator) >= 0 &&
                                            (f = f.replace(c.gridlocalization.decimalseparator, ".")), "stringfilter" != b) {
                                            var h = 0;
                                            if (f.indexOf(">") != -1 &&
                                                (g = "greater_than", h = 1), f.indexOf("<") != -1 &&
                                                (g = "less_than", h = 1), f.indexOf("=") != -1 &&
                                                ("greater_than" == g ? (g = "greater_than_or_equal", h = 2) : "less_than" == g ? (g = "less_than_or_equal", h = 2) : (g = "equal", h = 1)), 0 != h &&
                                                (f = f.substring(h), f.length < 1)) return !1
                                        }
                                        if (void 0 != a.filtercondition && (g = a.filtercondition), "datefilter" == b)
                                            var j = d.createfilter(b, f, g, null, a.cellsformat, c.gridlocalization);
                                        else var j = d.createfilter(b, f, g);
                                        d.addfilter(i, j)
                                    } else e = !1
                                }
                                return e
                            });
                        switch (f.filtertype) {
                            case "range":
                            case "date":
                                if (f._filterwidget.jqxDateTimeInput)
                                    if ("range" == f.filtertype) {
                                        var l = f._filterwidget.jqxDateTimeInput("getRange");
                                        if (null != l && null != l.from && null != l.to) {
                                            var m = "GREATER_THAN_OR_EQUAL",
                                                n = new Date(0);
                                            n.setHours(0),
                                                n.setMinutes(0),
                                                n.setFullYear(l.from.getFullYear(),
                                                    l.from.getMonth(),
                                                    l.from.getDate());
                                            var o = new Date(0);
                                            o.setHours(0), o.setMinutes(0),
                                                o.setFullYear(l.to.getFullYear(),
                                                    l.to.getMonth(),
                                                    l.to.getDate()),
                                                o.setHours(l.to.getHours()),
                                                o.setMinutes(l.to.getMinutes()),
                                                o.setSeconds(l.to.getSeconds());
                                            var p = e.createfilter(h, n, m);
                                            e.addfilter(0, p);
                                            var q = "LESS_THAN_OR_EQUAL",
                                                r = e.createfilter(h, o, q);
                                            e.addfilter(0, r)
                                        } else j = !1
                                    } else {
                                        var l = f._filterwidget.jqxDateTimeInput("getDate");
                                        if (null != l) {
                                            var n = new Date(0);
                                            n.setHours(0), n.setMinutes(0),
                                                n.setFullYear(l.getFullYear(),
                                                    l.getMonth(),
                                                    l.getDate());
                                            var m = "EQUAL";
                                            void 0 != f.filtercondition && (m = f.filtercondition);
                                            var p = e.createfilter(h, n, m);
                                            e.addfilter(0, p)
                                        } else j = !1
                                    }
                                else j = k(f, h, e);
                                break;
                            case "input":
                                if (f._filterwidget) {
                                    var l = f._filterwidget.find("input").val(),
                                        s = f._filterwidget.find(".filter").jqxDropDownList("selectedIndex"),
                                        t = e.getoperatorsbyfiltertype(h)[s];
                                    if (c.updatefilterconditions) {
                                        var u = c.updatefilterconditions(h, e.getoperatorsbyfiltertype(h));
                                        void 0 != u && e.setoperatorsbyfiltertype(h, u);
                                        var t = e.getoperatorsbyfiltertype(h)[s]
                                    }
                                    var v = "NULL" == t || "NOT_NULL" == t,
                                        w = "EMPTY" == t || "NOT_EMPTY" == t;
                                    void 0 != l && l.length > 0 || v || w ? (p = e.createfilter(h, l, t, null, f.cellsformat, c.gridlocalization), e.addfilter(0, p)) : j = !1
                                } else j = !1;
                                break;
                            case "number":
                                if (f._filterwidget) {
                                    var l = f._filterwidget.find("input").val();
                                    "," == c.gridlocalization.decimalseparator && l.indexOf(c.gridlocalization.decimalseparator) >= 0 && (l = l.replace(c.gridlocalization.decimalseparator, "."));
                                    var s = f._filterwidget.find(".filter").jqxDropDownList("selectedIndex"),
                                        t = e.getoperatorsbyfiltertype(h)[s];
                                    if (c.updatefilterconditions) {
                                        var u = c.updatefilterconditions(h, e.getoperatorsbyfiltertype(h));
                                        void 0 != u && e.setoperatorsbyfiltertype(h, u);
                                        var t = e.getoperatorsbyfiltertype(h)[s]
                                    }
                                    var v = "NULL" == t || "NOT_NULL" == t,
                                        w = "EMPTY" == t || "NOT_EMPTY" == t;
                                    void 0 != l && l.length > 0 || v || w ? (p = e.createfilter(h, new Number(l), t, null, f.cellsformat, c.gridlocalization), e.addfilter(0, p)) : j = !1
                                } else j = !1;
                                break;
                            case "textbox":
                            case "default":
                                j = k(f, h, e);
                                break;
                            case "bool":
                            case "boolean":
                                if (f._filterwidget.jqxCheckBox) {
                                    var l = f._filterwidget.jqxCheckBox("checked");
                                    if (null != l) {
                                        var m = "equal",
                                            x = e.createfilter(h, l, m);
                                        e.addfilter(i, x)
                                    } else j = !1
                                } else j = k(f, h, e);
                                break;
                            case "list":
                                var y = f._filterwidget.jqxDropDownList("listBox");
                                if (y.selectedIndex > 0) {
                                    var z = y.getItem(y.selectedIndex),
                                        l = z.label,
                                        A = z.value,
                                        m = "equal";
                                    "" === l && (m = "NULL");
                                    var x = e.createfilter(h, l, m);
                                    e.addfilter(i, x), A !== l && (x.data = A)
                                } else j = !1;
                                break;
                            case "checkedlist":
                                if (f._filterwidget.jqxDropDownList) {
                                    var y = f._filterwidget.jqxDropDownList("listBox"),
                                        B = y.getCheckedItems();
                                    if (0 == B.length) {
                                        for (var C = 1; C < y.items.length; C++) {
                                            var l = y.items[C].label,
                                                A = y.items[C].value,
                                                m = "not_equal";
                                            "" === l && (m = "NULL");
                                            var x = e.createfilter(h, l, m);
                                            A !== l && (x.data = A), e.addfilter(0, x)
                                        }
                                        j = !0
                                    } else if (B.length != y.items.length)
                                        for (var C = 0; C < B.length; C++) {
                                            var l = B[C].label,
                                                A = B[C].value,
                                                m = "equal";
                                            "" === l && (m = "NULL");
                                            var x = e.createfilter(h, l, m);
                                            A !== l && (x.data = A), e.addfilter(i, x)
                                        } else j = !1
                                } else j = k(f, h, e)
                        }
                        this._loading || (j ? this.addfilter(f.displayfield, e, !1) : this.removefilter(f.displayfield, !1))
                    }
                }
                this._loading || this.applyfilters("filterrow")
            }
        },
        _updatefilterrow: function () {
            var b = a('<div style="position: relative;" id="row00' + this.element.id + '"></div>'),
                c = 0,
                d = this.columns.records.length,
                e = this.toThemeProperty("jqx-grid-cell");
            e += " " + this.toThemeProperty("jqx-grid-cell-pinned"), e += " " + this.toThemeProperty("jqx-grid-cell-filter-row");
            var f = d + 10,
                g = new Array,
                h = this.that;
            this.filterrow[0].cells = g,
                b.height(this.filterrowheight),
                this.filterrow.children().detach(),
                this.filterrow.append(b),
            this._filterrowcache || (this._filterrowcache = new Array), this._initcolumntypes();
            for (var i = !1, j = new Array, k = document.createDocumentFragment(), l = 0; l < d; l++) {
                var m = this.columns.records[l],
                    n = m.width;
                n < m.minwidth && (n = m.minwidth), n > m.maxwidth && (n = m.maxwidth);
                var o = document.createElement("div");
                o.style.overflow = "hidden",
                    o.style.position = "absolute",
                    o.style.height = "100%",
                    o.className = e,
                    o = a(o),
                    k.appendChild(o[0]),
                    o[0].style.left = c + "px",
                    this.rtl ? (o.css("z-index", f++),
                        o.css("border-left-width", "1px")) : o.css("z-index", f--),
                "auto" == n && (n = 0),
                    o[0].style.width = parseFloat(n) + "px",
                    o[0].left = c,
                    m.hidden && m.hideable ? o.css("display", "none") : c += n, g[g.length] = o[0];
                var p = !0;
                if (this.rtl) {
                    if (this.groupable) {
                        var q = this.showrowdetailscolumn && this.rowdetails ? 1 : 0;
                        this.groups.length + q + l > d - 1 && (p = !1)
                    }
                    this.showrowdetailscolumn && this.rowdetails && l == d - 1 && (p = !1)
                } else {
                    if (this.groupable) {
                        var q = this.showrowdetailscolumn && this.rowdetails ? 1 : 0;
                        this.groups.length + q > l && (p = !1)
                    }
                    this.showrowdetailscolumn && this.rowdetails && 0 == l && (p = !1)
                }
                if (p)
                    if ("custom" == m.filtertype && m.createfilterwidget) {
                        var r = function () {
                            h._applyfilterfromfilterrow()
                        };
                        m.createfilterwidget(m, o, r)
                    }
                    else m.filterable &&
                    (this._filterrowcache[m.datafield] ? (i = !0,
                            o.append(this._filterrowcache[m.datafield]),
                            m._filterwidget = this._filterrowcache[m.datafield]
                    ) : (this._addfilterwidget(m, o, n), j[m.datafield] = m._filterwidget))
            }
            b[0].appendChild(k),
                this._filterrowcache = j,
            a.jqx.browser.msie && a.jqx.browser.version < 8 && b.css("z-index", f--),
                b.width(parseFloat(c) + 2),
                this.filterrow.addClass(e),
                this.filterrow.css("border-top-width", "1px"),
                this.filterrow.css("border-right-width", "0px"),
            i && this._updatefilterrowui(!0)
        },
        _addfilterwidget: function (b, c, d) {
            for (var e = this.that, f = "", g = "", h = 0; h < e.dataview.filters.length; h++) {
                var i = e.dataview.filters[h];
                if (i.datafield && i.datafield == b.datafield) {
                    var h = i.filter.getfilters()[0];
                    f = h.value, "range" === b.filtertype && (f = {
                        from: f,
                        to: i.filter.getfilters()[1].value
                    }), g = h.condition, b.filtercondition = g;
                    break
                }
            }
            var j = function (c, e) {
                var g = a('<input autocomplete="off" type="textarea"/>');
                g[0].id = a.jqx.utilities.createId(),
                    g.addClass(c.toThemeProperty("jqx-widget")),
                    g.addClass(c.toThemeProperty("jqx-input")),
                    g.addClass(c.toThemeProperty("jqx-rc-all")),
                    g.addClass(c.toThemeProperty("jqx-widget-content")),
                c.rtl && g.css("direction", "rtl"),
                c.disabled && g.attr("disabled", !0),
                    g.attr("disabled", !1),
                    g.appendTo(e),
                    g.width(d - 10),
                    g.height(c.filterrowheight - 10),
                    g.css("margin", "4px"),
                    g.css("box-sizing", "border-box"),
                b.createfilterwidget && b.createfilterwidget(b, e, g),
                    b._filterwidget = g,
                    g.focus(function () {
                        return c.content[0].scrollLeft = 0,
                            setTimeout(function () {
                                c.content[0].scrollLeft = 0
                            }, 10),
                            c.focusedfilter = g,
                            g.addClass(c.toThemeProperty("jqx-fill-state-focus")), !1
                    }),
                    g.blur(function () {
                        g.removeClass(c.toThemeProperty("jqx-fill-state-focus"))
                    }),
                    g.keydown(function (a) {
                        "13" == a.keyCode && c._applyfilterfromfilterrow(),
                        g[0]._writeTimer && clearTimeout(g[0]._writeTimer),
                            g[0]._writeTimer = setTimeout(function () {
                                    c._loading || (c["_oldWriteText" + g[0].id] || (c["_oldWriteText" + g[0].id] = ""),
                                        c["_oldWriteText" + g[0].id].length > 0 && c["_oldWriteText" + g[0].id] != g.val() ? (c._applyfilterfromfilterrow(),
                                            c["_oldWriteText" + g[0].id] = g.val()) : 0 == c["_oldWriteText" + g[0].id].length && (c._applyfilterfromfilterrow(),
                                                c["_oldWriteText" + g[0].id] = g.val()))
                                },
                                b.filterdelay),
                            c.focusedfilter = g
                    }),
                    c.host.removeClass("jqx-disableselect"),
                    c.content.removeClass("jqx-disableselect"),
                    g.val(f)
            };
            switch (null != b.datatype &&
            ("number" == b.filtertype &&
            ("string" != b.datatype &&
            "date" != b.datatype &&
            "bool" != b.datatype || (b.filtertype = "textbox")), "date" == b.filtertype &&
            ("string" != b.datatype &&
            "number" != b.datatype &&
            "bool" != b.datatype || (b.filtertype = "textbox")), "bool" == b.filtertype &&
            ("string" != b.datatype &&
            "number" != b.datatype &&
            "date" != b.datatype || (b.filtertype = "textbox"))), b.filtertype) {
                case "number":
                case "input":
                    var k = a("<div></div>");
                    k.width(c.width()), k.height(this.filterrowheight), c.append(k);
                    var d = c.width() - 21,
                        l = function (c, d, g) {
                            var h = a('<input style="float: left;" autocomplete="off" type="textarea"/>');
                            return e.rtl && (h.css("float", "right"),
                                h.css("direction", "rtl")),
                                h[0].id = a.jqx.utilities.createId(),
                                h.addClass(e.toThemeProperty("jqx-widget jqx-input jqx-rc-all jqx-widget-content")),
                                h.appendTo(c),
                                h.width(d - 16),
                            e.disabled && h.attr("disabled", !0),
                                h.attr("disabled", !1),
                                h.height(e.filterrowheight - 10),
                                h.css("margin", "4px"),
                                h.css("margin-right", "2px"),
                                h.focus(function () {
                                    e.focusedfilter = h,
                                        h.addClass(e.toThemeProperty("jqx-fill-state-focus"))
                                }),
                                h.blur(function () {
                                    h.removeClass(e.toThemeProperty("jqx-fill-state-focus"))
                                }),
                                h.keydown(function (a) {
                                    "13" == a.keyCode && e._applyfilterfromfilterrow(),
                                    h[0]._writeTimer && clearTimeout(h[0]._writeTimer),
                                        h[0]._writeTimer = setTimeout(function () {
                                                e._loading || e["_oldWriteText" + h[0].id] != h.val() && (e._applyfilterfromfilterrow(),
                                                    e["_oldWriteText" + h[0].id] = h.val())
                                            },
                                            b.filterdelay),
                                        e.focusedfilter = h
                                }),
                                h.val(f),
                                h
                        };
                    l(k, d);
                    var m = e._getfiltersbytype("number" == b.filtertype ? "number" : "string"),
                        n = a("<div class='filter' style='float: left;'></div>");
                    n.css("margin-top", "4px"), n.appendTo(k), e.rtl && n.css("float", "right");
                    var o = 0;
                    if (null != b.filtercondition) {
                        var h = new a.jqx.filter,
                            p = h.getoperatorsbyfiltertype("number" == b.filtertype ? "numericfilter" : "stringfilter"),
                            q = p.indexOf(b.filtercondition.toUpperCase());
                        q != -1 && (o = q)
                    }
                    var r = 180;
                    if ("input" == b.filtertype && (r = 240, 0 == o)) {
                        var q = m.indexOf("contains") || 2;
                        q != -1 && null == b.filtercondition && (o = q)
                    }
                    n.jqxDropDownList({
                        disabled: e.disabled,
                        touchMode: e.touchmode,
                        rtl: e.rtl,
                        dropDownHorizontalAlignment: "right",
                        enableBrowserBoundsDetection: !0,
                        selectedIndex: o,
                        width: 18,
                        height: 21,
                        dropDownHeight: 150,
                        dropDownWidth: r,
                        source: m,
                        theme: e.theme
                    }),
                        n.jqxDropDownList({
                            selectionRenderer: function (a) {
                                return ""
                            }
                        }),
                        n.jqxDropDownList("setContent", ""),
                        n.find(".jqx-dropdownlist-content").hide(),
                    b.createfilterwidget && b.createfilterwidget(b, c, k),
                        b._filterwidget = k;
                    var s = null;
                    this.addHandler(n, "select", function () {
                        var a = n.jqxDropDownList("getSelectedItem").label;
                        b._filterwidget.find("input").val().length > 0 && !e.refreshingfilter && e._applyfilterfromfilterrow(),
                            "input" != b.filtertype ||
                            e.refreshingfilter ? 0 != b._filterwidget.find("input").val().length ||
                                e.refreshingfilter ||
                                "null" != s &&
                                "not null" != s &&
                                "null" != a &&
                                "not null" != a ||
                                e._applyfilterfromfilterrow() : e._applyfilterfromfilterrow(),
                            s = a
                    });
                    break;
                case "textbox":
                case "default":
                default:
                    j(this, c);
                    break;
                case "none":
                    break;
                case "date":
                case "range":
                    if (this.host.jqxDateTimeInput) {
                        var t = a("<div></div>");
                        t.css("margin", "4px"), t.appendTo(c);
                        var u = {
                            calendar: this.gridlocalization,
                            todayString: this.gridlocalization.todaystring,
                            clearString: this.gridlocalization.clearstring
                        };
                        t.jqxDateTimeInput({
                            firstDayOfWeek: this.gridlocalization.firstDay,
                            readonly: !0,
                            disabled: e.disabled,
                            localization: u,
                            rtl: e.rtl,
                            showFooter: !0,
                            formatString: b.cellsformat,
                            selectionMode: b.filtertype,
                            value: null,
                            theme: this.theme,
                            width: d - 10,
                            height: this.filterrowheight - 10
                        }),
                        b.createfilterwidget && b.createfilterwidget(b, c, t),
                            f && f.from ? t.jqxDateTimeInput("setRange", f.from, f.to) : f && f.toString().length > 1 && t.val(f),
                            b._filterwidget = t,
                            this.addHandler(t, "valueChanged", function (a) {
                                e.refreshingfilter || (e._applyfilterfromfilterrow(), e.focusedfilter = null)
                            })
                    } else j(this, c);
                    break;
                case "list":
                case "checkedlist":
                    if (this.host.jqxDropDownList) {
                        var v = this._getfilterdataadapter(b),
                            w = !1,
                            n = a("<div></div>");
                        n.css("margin", "4px");
                        var x = b.datafield,
                            y = "checkedlist" == b.filtertype,
                            r = d < 150 ? 220 : "auto";
                        v.dataBind();
                        var z = v.records,
                            A = z.length < 8;
                        w = A, n.appendTo(c), n.jqxDropDownList({
                            placeHolder: e.gridlocalization.filterchoosestring,
                            disabled: e.disabled,
                            touchMode: e.touchmode,
                            rtl: e.rtl,
                            checkboxes: y,
                            dropDownWidth: r,
                            source: v.records,
                            autoDropDownHeight: A,
                            theme: this.theme,
                            width: d - 10,
                            height: this.filterrowheight - 10,
                            displayMember: b.displayfield,
                            valueMember: x
                        }),
                        b.createfilterwidget && b.createfilterwidget(b, c, n);
                        var B = n.jqxDropDownList("listBox");
                        if (y) {
                            n.jqxDropDownList({
                                selectionRenderer: function () {
                                    var a = '<span class="' + e.toThemeProperty("jqx-item") + '" style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">' + e.gridlocalization.filterselectstring + "</span>";
                                    return a
                                }
                            });
                            var C = a('<span style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">' + e.gridlocalization.filterselectstring + "</span>");
                            if (C.addClass(this.toThemeProperty("jqx-item")), void 0 != B) {
                                w || B.host.height(200), B.insertAt(e.gridlocalization.filterselectallstring, 0), n.jqxDropDownList("setContent", C);
                                var D = !0;
                                new Array;
                                B.checkAll(!1), e.addHandler(B.host, "checkChange", function (a) {
                                    if (n[0]._selectionChanged = !0, D)
                                        if (a.args.label != e.gridlocalization.filterselectallstring) {
                                            D = !1, B.host.jqxListBox("checkIndex", 0, !0, !1);
                                            var b = B.host.jqxListBox("getCheckedItems"),
                                                c = B.host.jqxListBox("getItems");
                                            1 == b.length ? B.host.jqxListBox("uncheckIndex", 0, !0, !1) : c.length != b.length && B.host.jqxListBox("indeterminateIndex", 0, !0, !1), D = !0
                                        } else D = !1, a.args.checked ? B.host.jqxListBox("checkAll", !1) : B.host.jqxListBox("uncheckAll", !1), D = !0
                                })
                            }
                        } else B.insertAt({
                            label: this.gridlocalization.filterchoosestring,
                            value: ""
                        }, 0), n.jqxDropDownList({selectedIndex: 0});
                        b._filterwidget = n;
                        n.jqxDropDownList("dropdownlistWrapper");
                        "list" == b.filtertype ? this.addHandler(n, "select", function (a) {
                            e.refreshingfilter || a.args && "none" != a.args.type && (e._applyfilterfromfilterrow(), e.focusedfilter = null)
                        }) : this.addHandler(n, "close", function (a) {
                            n[0]._selectionChanged && (e._applyfilterfromfilterrow(), e.focusedfilter = null, n[0]._selectionChanged = !1)
                        })
                    } else j(this, c);
                    break;
                case "bool":
                case "boolean":
                    if (this.host.jqxCheckBox) {
                        var E = a('<div tabIndex=0 style="opacity: 0.99; position: absolute; top: 50%; left: 50%; margin-top: -7px; margin-left: -10px;"></div>');
                        E.appendTo(c), E.jqxCheckBox({
                            disabled: e.disabled,
                            enableContainerClick: !1,
                            animationShowDelay: 0,
                            animationHideDelay: 0,
                            hasThreeStates: !0,
                            theme: this.theme,
                            checked: null
                        }),
                        b.createfilterwidget && b.createfilterwidget(b, c, E),
                            f === !0 || "true" == f ? E.jqxCheckBox({checked: !0}) : f !== !1 && "false" != f || E.jqxCheckBox({checked: !1}),
                            b._filterwidget = E,
                            this.addHandler(E, "change", function (a) {
                                e.refreshingfilter || a.args && (e.focusedfilter = null, e._applyfilterfromfilterrow())
                            })
                    } else j(this, c)
            }
        },
        _getfilterdataadapter: function (b) {
            var c = !!this.source._source;
            if (c) {
                var d = {localdata: a.extend(!0, {}, this.source.records), datatype: this.source.datatype, async: !1},
                    e = this;
                dataadapter = new a.jqx.dataAdapter(d, {
                    autoBind: !1,
                    autoSort: !0,
                    autoSortField: b.displayfield,
                    async: !1,
                    uniqueDataFields: [b.displayfield],
                    beforeLoadComplete: function (a) {
                        var c = new Array;
                        if (b.cellsformat) {
                            for (var d = e._getcolumntypebydatafield(b), f = 0; f < a.length; f++) {
                                c.push(a[f]);
                                var g = a[f][b.displayfield];
                                a[f][b.displayfield + "JQValue"] = g,
                                    "date" === d ? null != g ? a[f][b.displayfield] = dataadapter.formatDate(g, b.cellsformat, e.gridlocalization) : a[f][b.displayfield] = "" : "number" !== d &&
                                        "float" !== d && "int" !== d || (null != g ? a[f][b.displayfield] = dataadapter.formatNumber(g, b.cellsformat, e.gridlocalization) : a[f][b.displayfield] = "")
                            }
                            return c
                        }
                        return a
                    }
                })
            } else dataadapter = new a.jqx.dataAdapter(this.source, {
                autoBind: !1,
                uniqueDataFields: [b.displayfield],
                autoSort: !0,
                autoSortField: b.displayfield,
                async: !1
            });
            if (b.filteritems && b.filteritems.length > 0) {
                var d = {localdata: b.filteritems, datatype: this.source.datatype, async: !1};
                dataadapter = new a.jqx.dataAdapter(d, {autoBind: !1, async: !1})
            } else if (b.filteritems) {
                if (b.filteritems._source)
                    return b.filteritems._options.autoBind = !1,
                        b.filteritems._options.async = !1,
                        b.filteritems;
                if (a.isFunction(b.filteritems)) return b.filteritems()
            }
            return dataadapter
        },
        refreshfilterrow: function () {
            if (this.showfilterrow) {
                this.refreshingfilter = !0, this._updatefilterrowui(), this._updatelistfilters(!0, !0);
                for (var b = this.that, c = this.columns.records.length, d = 0; d < c; d++) {
                    var e = this.columns.records[d];
                    if (e.filterable && e.filter) {
                        var f = e.filter.getfilters();
                        if (f.length > 0) {
                            var g = f[0].value,
                                h = e._filterwidget,
                                i = e._filterwidget.parent();
                            if (null != h) switch (e.filtertype) {
                                case "number":
                                    if (i.find("input").val(g), this.host.jqxDropDownList) {
                                        var j = e.filter.getoperatorsbyfiltertype("numericfilter");
                                        h.find(".filter").jqxDropDownList("selectIndex", j.indexOf(f[0].condition))
                                    }
                                    break;
                                case "input":
                                    if (i.find("input").val(g), this.host.jqxDropDownList) {
                                        var j = e.filter.getoperatorsbyfiltertype("stringfilter");
                                        h.find(".filter").jqxDropDownList("selectIndex", j.indexOf(f[0].condition))
                                    }
                                    break;
                                case "date":
                                case "range":
                                    if (this.host.jqxDateTimeInput) {
                                        var g = e.filter.getfilterat(0).filtervalue;
                                        if (void 0 != g) {
                                            if (e.filter.getfilterat(1)) var k = e.filter.getfilterat(1).filtervalue;
                                            else k = g;
                                            "range" == e.filtertype ? a(i.children()[0]).jqxDateTimeInput("setRange", new Date(g), new Date(k)) : a(i.children()[0]).jqxDateTimeInput("setDate", new Date(g))
                                        }
                                    } else h.val(g);
                                    break;
                                case "textbox":
                                case "default":
                                    h.val(g), b["_oldWriteText" + h[0].id] = g;
                                    break;
                                case "bool":
                                case "boolean":
                                    this.host.jqxCheckBox ? a(i.children()[0]).jqxCheckBox({checked: g}) : h.val(g)
                            }
                        }
                    }
                }
                this.refreshingfilter = !1
            }
        },
        _destroyedfilters: function () {
            for (var b = (this.that, this.columns.records.length), c = 0; c < b; c++) {
                var d = this.columns.records[c];
                if (d.filterable) {
                    var e = d._filterwidget;
                    if ("list" == d.filtertype || "checkedlist" == d.filtertype) this.removeHandler(e, "select"), this.removeHandler(e, "close"), e.jqxDropDownList("destroy");
                    else if ("date" == d.filtertype || "range" == d.filtertype) this.removeHandler(e, "valueChanged"), e.jqxDateTimeInput("destroy");
                    else if ("bool" == d.filtertype) this.removeHandler(e, "change"), e.jqxCheckBox("destroy");
                    else if ("number" == d.filtertype) {
                        var f = e.find(".jqx-input");
                        this.removeHandler(f, "keydown");
                        var g = a(e.children()[1]);
                        g.jqxDropDownList("destroy")
                    } else this.removeHandler(e, "keydown");
                    e.remove()
                }
            }
        },
        _updatelistfilters: function (b, c) {
            for (var d = this.that, e = this.columns.records.length, f = 0; f < e; f++) {
                var g = this.columns.records[f];
                if (g.filterable && ("list" == g.filtertype || "checkedlist" == g.filtertype)) {
                    var h = g._filterwidget;
                    if (b) {
                        var i = this._getfilterdataadapter(g);
                        h.jqxDropDownList({source: i});
                        var j = h.jqxDropDownList("getItems"),
                            k = !0;
                        if (j.length != i.records.length + 1 && (k = !1), k)
                            for (var l = 1; l < j.length; l++)
                                if (j[l].label != i.records[l - 1][g.displayfield]) {
                                    k = !1;
                                    break
                                }
                        if (k && !c) continue
                    } else if (void 0 == g.filter) {
                        h.jqxDropDownList("renderSelection");
                        continue
                    }
                    var m = "checkedlist" == g.filtertype,
                        j = h.jqxDropDownList("getItems"),
                        n = h.jqxDropDownList("listBox");
                    if (h.jqxDropDownList("dataBind"), m) {
                        h.jqxDropDownList({
                            selectionRenderer: function () {
                                return d.gridlocalization.filterselectstring
                            }
                        }),
                        null === n.getItem(this.gridlocalization.filterselectallstring) &&
                        n.insertAt(this.gridlocalization.filterselectallstring, 0);
                        var o = a('<span style="top: 2px; position: relative; color: inherit; border: none; background-color: transparent;">' + this.gridlocalization.filterselectstring + "</span>");
                        if (o.addClass(this.toThemeProperty("jqx-item")), h.jqxDropDownList("setContent", o), n.checkAll(!1), g.filter) {
                            for (var p = g.filter.getfilters(), l = 0; l < n.items.length; l++) {
                                var q = n.items[l].label,
                                    r = void 0;
                                a.each(p, function () {
                                    var a;
                                    "NOT_EQUAL" == this.condition ? a = q != this.value : "EQUAL" == this.condition && (a = q == this.value),
                                        r = void 0 == r && void 0 !== a ? a : "EQUAL" == this.condition ? r || a : r && a
                                }),
                                    r ? n.checkIndex(l, !1, !1) : n.uncheckIndex(l, !1, !1)
                            }
                            n._updateCheckedItems();
                            var s = n.getCheckedItems().length;
                            n.items.length != s && s > 0 && n.host.jqxListBox("indeterminateIndex", 0, !0, !1)
                        }
                    } else if (null === n.getItem(this.gridlocalization.filterselectallstring) && n.insertAt({
                            label: this.gridlocalization.filterchoosestring,
                            value: ""
                        }, 0), h.jqxDropDownList({selectedIndex: 0}), g.filter) {
                        for (var p = g.filter.getfilters(), t = -1, l = 0; l < n.items.length; l++) {
                            var q = n.items[l].label;
                            a.each(p, function () {
                                return "NOT_EQUAL" == this.condition || (q == this.value ? (t = l, !1) : void 0)
                            })
                        }
                        t != -1 && n.selectIndex(t)
                    }
                    j.length < 8 ? h.jqxDropDownList("autoDropDownHeight", !0) : h.jqxDropDownList("autoDropDownHeight", !1)
                }
            }
        },
        _renderfiltercolumn: function () {
            var b = this.that;
            if (this.filterable) {
                if (!this.columns.records) return;
                a.each(this.columns.records, function (c, d) {
                    var e = !1;
                    b.autoshowfiltericon ? this.filter ? (a(this.filtericon).show(), e = !0) : a(this.filtericon).hide() : this.filterable && (a(this.filtericon).show(), e = !0),
                    "right" != this.align || this.renderer || this.element && (e ? this.element.firstChild.firstChild.style.marginRight = "18px" : this.element.firstChild.firstChild.style.marginRight = "2px")
                })
            }
        },
        _initcolumntypes: function () {
            if (this.columns && this.columns.records) {
                var b = this.source._source.datafields;
                if (b)
                    for (var c = 0; c < this.columns.records.length; c++) {
                        var d = this.columns.records[c];
                        if (!d.datatype) {
                            var e = "";
                            a.each(b, function () {
                                if (this.name == d.displayfield) return this.type && (e = this.type), !1
                            }), "" != e ? d.datatype = e : d.datatype = ""
                        }
                    }
            }
        },
        _getcolumntypebydatafield: function (b) {
            var c = this.that,
                d = "string",
                e = c.source.datafields || (c.source._source ? c.source._source.datafields : null);
            if (e) {
                var f = "";
                if (a.each(e, function () {
                        if (this.name == b.displayfield) return this.type && (f = this.type), !1
                    }), f) return f
            }
            if (null != b) {
                if (void 0 == this.dataview.cachedrecords) return d;
                var g = null;
                if (this.virtualmode) a.each(this.dataview.cachedrecords, function () {
                    return g = this[b.displayfield], !1
                });
                else {
                    if (0 == this.dataview.cachedrecords.length) return d;
                    if (g = this.dataview.cachedrecords[0][b.displayfield], null != g && "" == g.toString()) return "string"
                }
                if (null != g)
                    if ("boolean" == typeof g) d = "boolean";
                    else if (a.jqx.dataFormat.isNumber(g)) d = "number";
                    else {
                        var h = new Date(g);
                        if ("NaN" == h.toString() || "Invalid Date" == h.toString())
                            if (a.jqx.dataFormat) {
                                if (h = a.jqx.dataFormat.tryparsedate(g), null != h) {
                                    if (h && h.getFullYear() && 1970 == h.getFullYear() && 0 == h.getMonth() && 1 == h.getDate()) {
                                        var i = new Number(g);
                                        return isNaN(i) ? "string" : "number"
                                    }
                                    return "date"
                                }
                                d = "string"
                            } else d = "string";
                        else d = "date"
                    }
            }
            return d
        },
        _getfiltersbytype: function (a) {
            var b = this.that,
                c = "";
            switch (a) {
                case "number":
                case "float":
                case "int":
                    c = b.gridlocalization.filternumericcomparisonoperators;
                    break;
                case "date":
                    c = b.gridlocalization.filterdatecomparisonoperators;
                    break;
                case "boolean":
                case "bool":
                    c = b.gridlocalization.filterbooleancomparisonoperators;
                    break;
                case "string":
                default:
                    c = b.gridlocalization.filterstringcomparisonoperators
            }
            return c
        },
        _getfiltertype: function (a) {
            var b = "stringfilter";
            switch (a) {
                case "number":
                case "int":
                case "float":
                case "decimal":
                    b = "numericfilter";
                    break;
                case "boolean":
                case "bool":
                    b = "booleanfilter";
                    break;
                case "date":
                case "time":
                case "range":
                    b = "datefilter";
                    break;
                case "string":
                case "input":
                    b = "stringfilter"
            }
            return b
        },
        _buildfilter: function (b, c, d) {
            var e = a(c).find(".filter1"),
                f = a(c).find(".filter2"),
                g = a(c).find(".filter3"),
                h = a(c).find(".filtertext1" + b.element.id),
                i = a(c).find(".filtertext2" + b.element.id),
                j = h.val(),
                k = i.val(),
                l = b._getcolumntypebydatafield(d),
                m = (b._getfiltersbytype(l), new a.jqx.filter),
                n = b._getfiltertype(l);
            if ("default" === b.filtermode && "list" !== d.filtertype && "checkedlist" !== d.filtertype) {
                var o = e.jqxDropDownList("selectedIndex"),
                    p = f.jqxDropDownList("selectedIndex"),
                    q = g.jqxDropDownList("selectedIndex"),
                    r = null,
                    s = null;
                if (b.updatefilterconditions) {
                    var t = b.updatefilterconditions(n, m.getoperatorsbyfiltertype(n));
                    void 0 != t && m.setoperatorsbyfiltertype(n, t)
                }
                var u = !1,
                    v = m.getoperatorsbyfiltertype(n)[o],
                    g = m.getoperatorsbyfiltertype(n)[q],
                    w = "NULL" == v || "NOT_NULL" == v,
                    x = "EMPTY" == v || "NOT_EMPTY" == v;
                void 0 == v && (v = m.getoperatorsbyfiltertype(n)[0]), void 0 == g && (g = m.getoperatorsbyfiltertype(n)[0]), (j.length > 0 || w || x) &&
                (r = m.createfilter(n, j, v, null, d.cellsformat, b.gridlocalization), m.addfilter(p, r), u = !0);
                var y = "NULL" == g || "NOT_NULL" == g,
                    z = "EMPTY" == g || "NOT_EMPTY" == g;
                if ((k.length > 0 || y || z) && (s = m.createfilter(n, k, g, null, d.cellsformat, b.gridlocalization), m.addfilter(p, s), u = !0), u) {
                    var A = d.displayfield;
                    this.addfilter(A, m, !0)
                } else this._clearfilter(b, c, d)
            } else if ("excel" === b.filtermode || "list" === d.filtertype || "checkedlist" === d.filtertype) {
                var B = !1,
                    C = e.data().jqxListBox.instance,
                    D = "excel" === this.filtermode || "checkedlist" === d.filtertype,
                    E = C.getCheckedItems();
                if (!D) var E = C.getSelectedItems();
                if (0 == E.length) {
                    for (var F = 1; F < C.items.length; F++) {
                        var G = C.items[F].value;
                        void 0 === G && (G = "");
                        var H = "not_equal";
                        if (G && G.indexOf && (G.indexOf("|") >= 0 ||
                            G.indexOf(" AND ") >= 0 ||
                            G.indexOf(" OR ") >= 0 ||
                            G.indexOf(" and ") >= 0 ||
                            G.indexOf(" or ") >= 0)) {
                            G = G.replace("|", ""),
                                G = G.replace("AND", ""),
                                G = G.replace("OR", ""),
                                G = G.replace("and", ""),
                                G = G.replace("or", "");
                            var H = "equal"
                        }
                        if ("datefilter" == n) var I = m.createfilter(n, G, H, null, d.cellsformat, b.gridlocalization);
                        else var I = m.createfilter(n, G, H, null);
                        m.addfilter(0, I)
                    }
                    B = !0
                } else if (E.length != C.items.length) {
                    B = !0;
                    for (var F = 0; F < E.length; F++)
                        if (b.gridlocalization.filterselectallstring !== E[F].value) {
                            var G = E[F].value;
                            void 0 === G && (G = "");
                            var H = "equal";
                            if ("datefilter" == n) var I = m.createfilter(n, G, H, null, d.cellsformat, b.gridlocalization);
                            else var I = m.createfilter(n, G, H, null);
                            var J = 1;
                            m.addfilter(J, I)
                        }
                } else B = !1;
                if (B) {
                    var A = d.displayfield;
                    this.addfilter(A, m, !0)
                } else {
                    var A = d.displayfield;
                    this.removefilter(A, !0)
                }
            }
        },
        _clearfilter: function (a, b, c) {
            var d = c.displayfield;
            this.removefilter(d, !0)
        },
        addfilter: function (a, b, c) {
            if (this._loading) throw new Error("jqxGrid: " + this.loadingerrormessage);
            var d = this.getcolumn(a),
                e = this._getcolumn(a);
            void 0 != d && null != d && (d.filter = b, e.filter = b, this.dataview.addfilter(a, b), 1 == c && void 0 != c && this.applyfilters("add"))
        },
        removefilter: function (a, b) {
            if (this._loading) throw new Error("jqxGrid: " + this.loadingerrormessage);
            var c = this.getcolumn(a),
                d = this._getcolumn(a);
            void 0 != c && null != c &&
            null != c.filter &&
            (this.dataview.removefilter(a, c.filter), c.filter = null, d.filter = null, this.showfilterrow &&
            this.clearfilterrow(a), 1 != b && b === !1 || this.applyfilters("remove"))
        },
        applyfilters: function (b) {
            if (this.dataview.filters.length >= 0 && (this.virtualmode || !this.source.localdata) && null != this.source && this.source.filter) {
                var c = -1;
                this.pageable ? (c = this.dataview.pagenum, this.dataview.pagenum = 0) : (this.vScrollInstance.setPosition(0),
                    this.loadondemand = !0,
                    this._renderrows(this.virtualsizeinfo)),
                this.pageable && this.virtualmode && (this.dataview.pagenum = 0),
                    this.source.filter(this.dataview.filters,
                        this.dataview.records,
                        this.dataview.records.length),
                this.pageable && !this.virtualmode && (this.dataview.pagenum = c)
            }
            if (this._cellscache = new Array,
                this.dataview.clearsortdata && this.dataview.clearsortdata(),
                    this.virtualmode)
                return this.pageable &&
                (this.dataview.updateview(),
                this.gotopage && this.gotopage(0)),
                    this.rendergridcontent(!1, !1),
                this.showfilterrow && "string" != typeof b && a.isEmptyObject(b) && this.refreshfilterrow(),
                    this._postrender("filter"), void this._raiseEvent(13, {filters: this.dataview.filters});
            this.selectedrowindexes, this.that;
            if (this.dataview.refresh(), this.dataview.clearsortdata && this.sortcolumn && this.sortdirection) {
                var d = this.sortdirection.ascending ? "asc" : "desc";
                this._loading ? this.sortby(this.sortcolumn, d, null, !1, !1) : this.sortby(this.sortcolumn, d, null, !1)
            }
            this.pageable && (this.dataview.updateview(),
            this.gotopage && (this.gotopage(0), this.updatepagerdetails())),
                this._updaterowsproperties(), !this.groupable || this.groupable && 0 == this.groups.length ? (this._rowdetailscache = new Array,
                this.virtualsizeinfo = null, this._pagescache = new Array,
            this.columns && this.columns.records && this.columns.records.length > 0 && !this.columns.records[0].filtericon && (this.prerenderrequired = !0),
                this.rendergridcontent(!0, !1), this._updatecolumnwidths(), this._updatecellwidths(), this._renderrows(this.virtualsizeinfo),
            this.showaggregates && this._updatecolumnsaggregates && this._updatecolumnsaggregates(), this._postrender("filter")) : (this._rowdetailscache = new Array,
                this._render(!0, !0, !1, !1, !1), this.showfilterrow && this._updatefocusedfilter(), this._updatecolumnwidths(),
                this._updatecellwidths(), this._renderrows(this.virtualsizeinfo), this._postrender("filter")),
            this.showfilterrow && "string" != typeof b && a.isEmptyObject(b) && this.refreshfilterrow(),
                this._raiseEvent(13, {filters: this.dataview.filters})
        },
        getfilterinformation: function () {
            for (var a = new Array, b = 0; b < this.dataview.filters.length; b++) {
                var c = this.getcolumn(this.dataview.filters[b].datafield);
                a[b] = {
                    filter: this.dataview.filters[b].filter,
                    datafield: c.datafield,
                    displayfield: c.displayfield,
                    filtercolumn: c.datafield,
                    filtercolumntext: c.text
                }
            }
            return a
        },
        clearfilters: function (b) {
            var c = this.that;
            if (this.showfilterrow && this.clearfilterrow(), this.columns.records) {
                var d = 1 == b || b !== !1;
                a.each(this.columns.records, function () {
                    c.removefilter(this.displayfield, !d)
                })
            }
            b !== !1 && (1 != b && b === !1 || this.applyfilters("clear"))
        },
        _destroyfilterpanel: function () {
            var b = a(a.find("#filterclearbutton" + this.element.id)),
                c = a(a.find("#filterbutton" + this.element.id)),
                d = a(a.find("#filter1" + this.element.id)),
                e = a(a.find("#filter2" + this.element.id)),
                f = a(a.find("#filter3" + this.element.id)),
                g = a(a.find(".filtertext1" + this.element.id)),
                h = a(a.find(".filtertext2" + this.element.id));
            g.length > 0 && h.length > 0 && (g.removeClass(),
                h.removeClass(), g.remove(), h.remove()), b.length > 0 &&
            (b.jqxButton("destroy"),
                c.jqxButton("destroy"),
                this.removeHandler(b, "click"),
                this.removeHandler(c, "click")),
            d.length > 0 && d.jqxDropDownList("destroy"), e.length > 0 && e.jqxDropDownList("destroy"), f.length > 0 && f.jqxDropDownList("destroy");
            var d = a(a.find("#filter1" + this.element.id + "ex")),
                e = a(a.find("#filter2" + this.element.id + "ex")),
                f = a(a.find("#filter3" + this.element.id + "ex"));
            d.length > 0 && d.jqxDropDownList("destroy"), e.length > 0 && e.jqxDropDownList("destroy"), f.length > 0 && f.jqxDropDownList("destroy")
        },
        _updatefilterpanel: function (b, c, d) {
            null != b && void 0 != b || (b = this);
            var e = b._getcolumntypebydatafield(d),
                f = b._getfiltersbytype(e);
            if (!b.host.jqxDropDownList) throw new Error("jqxGrid: Missing reference to jqxdropdownlist.js.");
            b.filterpanel.detach(), b.excelfilterpanel.detach(), d.filterpanel && d.filterpanel.detach(), a(c).children().detach();
            var g = a(b.menuitemsarray[6]);
            if (a(g).css("height", "190px"), d.createfilterpanel && !d.filterpanel) {
                var h = a("<div class='filter' style='margin-left: 7px;'></div>");
                a(c).append(h), d.createfilterpanel(d.displayfield, h), d.filterpanel = h
            }
            "list" === d.filtertype || "checkedlist" === d.filtertype ? a(c).append(b.excelfilterpanel) : "custom" !== d.filtertype ? a(c).append(b.filterpanel) : d.filterpanel && a(c).append(d.filterpanel);
            var i = a(c),
                j = i.find("#filterclearbutton" + b.element.id),
                k = i.find("#filterbutton" + b.element.id),
                l = i.find(".filter1"),
                m = i.find(".filter2"),
                n = i.find(".filter3"),
                o = i.find(".filtertext1" + b.element.id),
                p = i.find(".filtertext2" + b.element.id);
            if (this._hasdatefilter && "list" !== d.filtertype && "checkedlist" !== d.filtertype && "custom" !== d.filtertype) {
                var q = o.parent(),
                    r = p.parent();
                if (q.children().remove(), r.children().remove(), "date" == d.filtertype) {
                    b._showwhere.text(b.gridlocalization.filtershowrowdatestring);
                    var s = a("<div class='filtertext1" + b.element.id + "' style='margin-top: 3px; margin-bottom: 3px;'></div>");
                    q.append(s);
                    var t = function (a) {
                        var c = {
                            calendar: b.gridlocalization,
                            todayString: b.gridlocalization.todaystring,
                            clearString: b.gridlocalization.clearstring
                        };
                        a.jqxDateTimeInput({
                            disabled: b.disabled,
                            firstDayOfWeek: b.gridlocalization.firstDay,
                            localization: c,
                            rtl: b.rtl,
                            width: b._filterpanelwidth - 15,
                            height: 23,
                            value: null,
                            formatString: d.cellsformat,
                            theme: b.theme
                        })
                    };
                    t(s);
                    var s = a("<div class='filtertext2" + b.element.id + "' style='margin-top: 3px; margin-bottom: 3px;'></div>");
                    r.append(s), t(s)
                } else {
                    b._showwhere.text(b.gridlocalization.filtershowrowstring);
                    var s = a("<input class='filtertext1" + b.element.id + "' style='height: 23px; margin-top: 3px; margin-bottom: 3px;' type='text'></input>");
                    q.append(s);
                    var t = function (a) {
                        a.addClass(b.toThemeProperty("jqx-input")), a.addClass(b.toThemeProperty("jqx-widget-content")), a.addClass(b.toThemeProperty("jqx-rc-all")), a.width(b._filterpanelwidth - 21)
                    };
                    t(s);
                    var s = a("<input class='filtertext2" + b.element.id + "' style='height: 23px; margin-top: 3px; margin-bottom: 3px;' type='text'></input>");
                    r.append(s), t(s)
                }
                var o = i.find(".filtertext1" + b.element.id),
                    p = i.find(".filtertext2" + b.element.id)
            }
            if ("date" != d.filtertype ? (o.val(""), p.val("")) : (o.val(null), p.val(null)), this.removeHandler(k, "click"), this.addHandler(k, "click", function () {
                    b._buildfilter(b, c, d), b._closemenu()
                }),
                    this.removeHandler(j, "click"),
                    this.addHandler(j, "click", function () {
                        b._clearfilter(b, c, d),
                            b._closemenu()
                    }),
                    this.removeHandler(k, "keydown"),
                    this.addHandler(k, "keydown", function (a) {
                        13 === a.keyCode && (b._buildfilter(b, c, d), b._closemenu())
                    }),
                    this.removeHandler(j, "keydown"),
                    this.addHandler(j, "keydown",
                        function (a) {
                            13 === a.keyCode && (b._clearfilter(b, c, d), b._closemenu())
                        }),
                    this.removeHandler(o, "keydown"),
                    this.addHandler(o, "keydown", function (a) {
                        13 === a.keyCode && k.trigger("click"),
                        27 === a.keyCode && b._closemenu()
                    }),
                    this.removeHandler(p, "keydown"),
                    this.addHandler(p, "keydown", function (a) {
                        13 === a.keyCode && k.trigger("click"),
                        27 === a.keyCode && b._closemenu()
                    }),
                "default" === this.filtermode && "list" !== d.filtertype && "checkedlist" !== d.filtertype && "custom" !== d.filtertype) {
                if (l.jqxDropDownList("source") != f && (l.jqxDropDownList({
                        enableBrowserBoundsDetection: !1,
                        source: f
                    }),
                        n.jqxDropDownList({enableBrowserBoundsDetection: !1, source: f})),
                    "boolean" == e || "bool" == e) l.jqxDropDownList({
                    autoDropDownHeight: !0,
                    selectedIndex: 0
                }), n.jqxDropDownList({
                    autoDropDownHeight: !0,
                    selectedIndex: 0
                });
                else {
                    var u = !1;
                    f && f.length && f.length < 5 && (u = !0),
                        l.jqxDropDownList({
                            autoDropDownHeight: u,
                            selectedIndex: 2
                        }), n.jqxDropDownList({autoDropDownHeight: u, selectedIndex: 2})
                }
                m.jqxDropDownList({selectedIndex: 0});
                var v = d.filter,
                    w = new a.jqx.filter,
                    x = "";
                switch (e) {
                    case "number":
                    case "int":
                    case "float":
                    case "decimal":
                        x = "numericfilter", y = w.getoperatorsbyfiltertype("numericfilter");
                        break;
                    case "boolean":
                    case "bool":
                        x = "booleanfilter", y = w.getoperatorsbyfiltertype("booleanfilter");
                        break;
                    case "date":
                    case "time":
                        x = "datefilter", y = w.getoperatorsbyfiltertype("datefilter");
                        break;
                    case "string":
                        x = "stringfilter", y = w.getoperatorsbyfiltertype("stringfilter")
                }
                if (null != v) {
                    var q = v.getfilterat(0),
                        r = v.getfilterat(1);
                    v.getoperatorat(0);
                    if (b.updatefilterconditions) {
                        var y = [],
                            z = b.updatefilterconditions(x, y);
                        if (void 0 != z) {
                            for (var A = 0; A < z.length; A++) z[A] = z[A].toUpperCase();
                            v.setoperatorsbyfiltertype(x, z), y = z
                        }
                    }
                    var B = "default";
                    if (null != q) {
                        var C = y.indexOf(q.comparisonoperator),
                            D = q.filtervalue;
                        o.val(D), l.jqxDropDownList({selectedIndex: C, animationType: B})
                    }
                    if (null != r) {
                        var E = y.indexOf(r.comparisonoperator),
                            F = r.filtervalue;
                        p.val(F), n.jqxDropDownList({selectedIndex: E, animationType: B})
                    }
                    void 0 == v.getoperatorat(0) ? m.jqxDropDownList({
                        selectedIndex: 0,
                        animationType: B
                    }) : "and" == v.getoperatorat(0) ||
                    0 == v.getoperatorat(0) ? m.jqxDropDownList({selectedIndex: 0}) : m.jqxDropDownList({selectedIndex: 1})
                }
                b.updatefilterpanel && b.updatefilterpanel(l, n, m, o, p, k, j, v, x, y), (!this._hasdatefilter ||
                this._hasdatefilter && "date" != d.filtertype) && (this.touchdevice || (o.focus(), setTimeout(function () {
                    o.focus()
                }, 10)))
            } else if ("excel" === this.filtermode || "list" === d.filtertype || "checkedlist" === d.filtertype) {
                var G = b._getfilterdataadapter(d),
                    x = b._getfiltertype(e),
                    H = "excel" === this.filtermode || "checkedlist" === d.filtertype;
                if (l.jqxListBox("focus"), this.removeHandler(l, "keyup"), this.addHandler(l, "keyup", function (a) {
                        13 === a.keyCode && k.trigger("click"), 27 === a.keyCode && b._closemenu()
                    }), d.cellsformat ? l.jqxListBox({
                        checkboxes: H,
                        displayMember: d.displayfield,
                        valueMember: d.displayfield + "JQValue",
                        source: G
                    }) : l.jqxListBox({
                        checkboxes: H,
                        displayMember: d.displayfield,
                        valueMember: d.displayfield,
                        source: G
                    }),
                        H) {
                    l.jqxListBox("insertAt", b.gridlocalization.filterselectallstring, 0);
                    var I = l.data().jqxListBox.instance;
                    I.checkAll(!1);
                    if (d.filter) {
                        I.uncheckAll(!1);
                        for (var J = d.filter.getfilters(), K = 0; K < I.items.length; K++) {
                            var L = I.items[K].value;
                            a.each(J, function () {
                                if ("NOT_EQUAL" == this.condition) {
                                    if (L != this.value)
                                        return I.uncheckIndex(K, !1, !1), !1;
                                    if (null != L && null != this.value && L.toString() != this.value.toString())
                                        return I.uncheckIndex(K, !1, !1), !1
                                } else if ("EQUAL" == this.condition) {
                                    if (L == this.value) return I.checkIndex(K, !1, !1), !1;
                                    if (null != L && null != this.value && L.toString() == this.value.toString()) return I.checkIndex(K, !1, !1), !1
                                }
                            })
                        }
                        I._updateCheckedItems();
                        var M = I.getCheckedItems().length;
                        I.items.length != M && M > 0 && I.host.jqxListBox("indeterminateIndex", 0, !0, !1), M === I.items.length - 1 && I.host.jqxListBox("checkIndex", 0, !0, !1)
                    }
                } else if (d.filter) {
                    var I = l.data().jqxListBox.instance;
                    I.clearSelection();
                    for (var J = d.filter.getfilters(), K = 0; K < I.items.length; K++) {
                        var L = I.items[K].value;
                        a.each(J, function () {
                            if ("NOT_EQUAL" == this.condition) {
                                if (L != this.value) return I.unselectIndex(K, !1, !1), !1
                            } else if ("EQUAL" == this.condition && L == this.value) return I.selectIndex(K, !0, !1), !1
                        })
                    }
                    I._renderItems()
                }
            }
        },
        _initfilterpanel: function (b, c, d, e, f) {
            console.log(this);
            console.log(b);
            //			return false;
            //			event.stopPropagation();
            console.log(c);
            null != b && void 0 != b || (b = this), c[0].innerHTML = "";
            var g = a("<div class='filter' style='margin-left: 7px;'></div>");
            c.append(g);
            var h = a("<div class='filter' style='margin-top: 3px; margin-bottom: 3px;'></div>");
            //			h.text(b.gridlocalization.filtershowrowstring), 
            h.text("筛选"),
                this._showwhere = h;
            console.log(h);
            var i = f ? "ex" : "",
                j = a("<div class='filter filter1' id='filter1" + b.element.id + i + "'></div>"),
                k = a("<div class='filter filter2' id='filter2" + b.element.id + i + "' style='margin-bottom: 3px;'></div>"),
                l = a("<div class='filter filter3' id='filter3" + b.element.id + i + "'></div>"),
                m = b._getcolumntypebydatafield(d);
            if (!j.jqxDropDownList) throw new Error("jqxGrid: jqxdropdownlist.js is not loaded.");
            var n = b._getfiltersbytype(m);
            if (this._hasdatefilter = !1, this._filterpanelwidth = e, this.columns && this.columns.records) {
                for (var o = 0; o < this.columns.records.length; o++)
                    if ("date" == this.columns.records[o].filtertype) {
                        this._hasdatefilter = !0;
                        break
                    }
            } else if (this.columns && !this.columns.records)
                for (var o = 0; o < this.columns.length; o++)
                    if ("date" == this.columns[o].filtertype) {
                        this._hasdatefilter = !0;
                        break
                    }
            var p = a("<div class='filter'><input class='filtertext1" + b.element.id + "' style='height: 23px; margin-top: 3px; margin-bottom: 3px;' type='text'></input></div>"),
                q = p.find("input");
            q.addClass(this.toThemeProperty("jqx-input")), q.addClass(this.toThemeProperty("jqx-widget-content")), q.addClass(this.toThemeProperty("jqx-rc-all")), q.width(e - 21);
            var r = a("<div class='filter'><input class='filtertext2" + b.element.id + "' style='height: 23px; margin-top: 3px;' type='text'></input></div>"),
                s = r.find("input");
            s.addClass(this.toThemeProperty("jqx-input")), s.addClass(this.toThemeProperty("jqx-widget-content")), s.addClass(this.toThemeProperty("jqx-rc-all")), s.width(e - 21), b.rtl && (q.css("direction", "rtl"), s.css("direction", "rtl"));
            var t = a("<div class='filter' style='height: 25px; margin-left: 20px; margin-top: 7px;'></div>"),
                u = a('<span tabIndex=0 id="filterbutton' + b.element.id + '" class="filterbutton" style="padding: 4px 12px; margin-left: 2px;">' + b.gridlocalization.filterstring + "</span>");
            t.append(u);
            var v = a('<span tabIndex=0 id="filterclearbutton' + b.element.id + '" class="filterclearbutton" style="padding: 4px 12px; margin-left: 5px;">' + b.gridlocalization.filterclearstring + "</span>");
            t.append(v),
                u.jqxButton({
                    height: 20,
                    theme: b.theme
                }),
                v.jqxButton({
                    height: 20,
                    theme: b.theme
                });
            var w = function (a) {
                if (a) {
                    if (a.text().indexOf("case sensitive") != -1) {
                        var c = a.text();
                        c = c.replace("case sensitive", "match case"),
                            a.text(c)
                    }
                    return a.css("font-family", b.host.css("font-family")),
                        a.css("font-size", b.host.css("font-size")),
                        a.css("top", "2px"),
                        a.css("position", "relative"), a
                }
                return ""
            };
            if ("default" !== this.filtermode || f) {
                if ("excel" === this.filtermode || f) {
                    g.append(h),
                        g.append(j),
                        j.attr("tabindex", 0),
                        j.jqxListBox({
                            rtl: b.rtl,
                            _checkForHiddenParent: !1,
                            checkboxes: !0,
                            selectedIndex: 2,
                            width: e - 15,
                            height: 130,
                            theme: b.theme
                        });
                    var x = !0;
                    b.addHandler(j, "checkChange", function (a) {
                        if (x)
                            if (a.args.label != b.gridlocalization.filterselectallstring) {
                                x = !1, j.jqxListBox("checkIndex", 0, !0, !1);
                                var c = j.jqxListBox("getCheckedItems"),
                                    d = j.jqxListBox("getItems");
                                1 == c.length ? j.jqxListBox("uncheckIndex", 0, !0, !1) : d.length != c.length && j.jqxListBox("indeterminateIndex", 0, !0, !1), x = !0
                            } else
                                x = !1,
                                    a.args.checked ? j.jqxListBox("checkAll", !1) : j.jqxListBox("uncheckAll", !1),
                                    x = !0
                    })
                }
            } else {
                g.append(h),
                    g.append(j),
                    j.jqxDropDownList({
                        _checkForHiddenParent: !1,
                        autoItemsHeight: !0,
                        rtl: b.rtl,
                        enableBrowserBoundsDetection: !1,
                        selectedIndex: 2,
                        width: e - 15,
                        height: 23,
                        dropDownHeight: 150,
                        dropDownWidth: e - 15,
                        selectionRenderer: w,
                        source: n,
                        theme: b.theme
                    }),
                    g.append(p);
                var y = new Array;
                y[0] = b.gridlocalization.filterandconditionstring,
                    y[1] = b.gridlocalization.filterorconditionstring,
                    k.jqxDropDownList({
                        _checkForHiddenParent: !1,
                        rtl: b.rtl,
                        enableBrowserBoundsDetection: !1,
                        autoDropDownHeight: !0,
                        selectedIndex: 0,
                        width: 60,
                        height: 23,
                        source: y,
                        selectionRenderer: w,
                        theme: b.theme
                    }),
                    g.append(k),
                    l.jqxDropDownList({
                        _checkForHiddenParent: !1,
                        autoItemsHeight: !0,
                        rtl: b.rtl,
                        enableBrowserBoundsDetection: !1,
                        selectedIndex: 2,
                        width: e - 15,
                        height: 23,
                        dropDownHeight: 150,
                        dropDownWidth: e - 15,
                        selectionRenderer: w,
                        source: n,
                        theme: b.theme
                    }),
                    g.append(l),
                    g.append(r)
            }

            g.append(t),
            b.updatefilterpanel && b.updatefilterpanel(j, l, k, p, r, u, v, null, null, n)
        }
    })
}(jqxBaseFramework);