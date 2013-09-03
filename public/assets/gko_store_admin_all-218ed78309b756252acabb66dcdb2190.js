/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(e,t,n){if(arguments.length>1&&"[object Object]"!==String(t)){if(n=jQuery.extend({},n),(null===t||void 0===t)&&(n.expires=-1),"number"==typeof n.expires){var i=n.expires,r=n.expires=new Date;r.setDate(r.getDate()+i)}return t=String(t),document.cookie=[encodeURIComponent(e),"=",n.raw?t:encodeURIComponent(t),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}n=t||{};var a,o=n.raw?function(e){return e}:decodeURIComponent;return(a=new RegExp("(?:^|; )"+encodeURIComponent(e)+"=([^;]*)").exec(document.cookie))?o(a[1]):null},/*
 * jQuery Plugin: Tokenizing Autocomplete Text Entry
 * Version 1.6.0
 *
 * Copyright (c) 2009 James Smith (http://loopj.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */
function(e){var t={method:"GET",contentType:"json",queryParam:"q",searchDelay:300,minChars:1,propertyToSearch:"name",jsonContainer:null,hintText:"Type in a search term",noResultsText:"No results",searchingText:"Searching...",deleteText:"&times;",animateDropdown:!0,tokenLimit:null,tokenDelimiter:",",preventDuplicates:!1,tokenValue:"id",prePopulate:null,processPrePopulate:!1,idPrefix:"token-input-",resultsFormatter:function(e){return"<li>"+e[this.propertyToSearch]+"</li>"},tokenFormatter:function(e){return"<li><p>"+e[this.propertyToSearch]+"</p></li>"},onResult:null,onAdd:null,onDelete:null,onReady:null},n={tokenList:"token-input-list",token:"token-input-token",tokenDelete:"token-input-delete-token",selectedToken:"token-input-selected-token",highlightedToken:"token-input-highlighted-token",dropdown:"token-input-dropdown",dropdownItem:"token-input-dropdown-item",dropdownItem2:"token-input-dropdown-item2",selectedDropdownItem:"token-input-selected-dropdown-item",inputToken:"token-input-input-token"},i={BEFORE:0,AFTER:1,END:2},r={BACKSPACE:8,TAB:9,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,NUMPAD_ENTER:108,COMMA:188},a={init:function(n,i){var r=e.extend({},t,i||{});return this.each(function(){e(this).data("tokenInputObject",new e.TokenList(this,n,r))})},clear:function(){return this.data("tokenInputObject").clear(),this},add:function(e){return this.data("tokenInputObject").add(e),this},remove:function(e){return this.data("tokenInputObject").remove(e),this},get:function(){return this.data("tokenInputObject").getTokens()}};e.fn.tokenInput=function(e){return a[e]?a[e].apply(this,Array.prototype.slice.call(arguments,1)):a.init.apply(this,arguments)},e.TokenList=function(t,a,o){function s(){return null!==o.tokenLimit&&D>=o.tokenLimit?(L.hide(),g(),void 0):void 0}function l(){if(j!==(j=L.val())){var e=j.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");W.html(e),L.width(W.width()+30)}}function u(t){var n=o.tokenFormatter(t);n=e(n).addClass(o.classes.token).insertBefore(R),e("<span>"+o.deleteText+"</span>").addClass(o.classes.tokenDelete).appendTo(n).click(function(){return p(e(this).parent()),I.change(),!1});var i={id:t.id};return i[o.propertyToSearch]=t[o.propertyToSearch],e.data(n.get(0),"tokeninput",t),N=N.slice(0,H).concat([i]).concat(N.slice(H)),H++,m(N,I),D+=1,null!==o.tokenLimit&&D>=o.tokenLimit&&(L.hide(),g()),n}function c(t){var n=o.onAdd;if(D>0&&o.preventDuplicates){var i=null;if(O.children().each(function(){var n=e(this),r=e.data(n.get(0),"tokeninput");return r&&r.id===t.id?(i=n,!1):void 0}),i)return d(i),R.insertAfter(i),L.focus(),void 0}(null==o.tokenLimit||D<o.tokenLimit)&&(u(t),s()),L.val(""),g(),e.isFunction(n)&&n.call(I,t)}function d(e){e.addClass(o.classes.selectedToken),M=e.get(0),L.val(""),g()}function h(e,t){e.removeClass(o.classes.selectedToken),M=null,t===i.BEFORE?(R.insertBefore(e),H--):t===i.AFTER?(R.insertAfter(e),H++):(R.appendTo(O),H=D),L.focus()}function f(t){var n=M;M&&h(e(M),i.END),n===t.get(0)?h(t,i.END):d(t)}function p(t){var n=e.data(t.get(0),"tokeninput"),i=o.onDelete,r=t.prevAll().length;r>H&&r--,t.remove(),M=null,L.focus(),N=N.slice(0,r).concat(N.slice(r+1)),H>r&&H--,m(N,I),D-=1,null!==o.tokenLimit&&L.show().val("").focus(),e.isFunction(i)&&i.call(I,n)}function m(t,n){var i=e.map(t,function(e){return e[o.tokenValue]});n.val(i.join(o.tokenDelimiter))}function g(){B.hide().empty(),P=null}function v(){B.css({position:"absolute",top:e(O).offset().top+e(O).outerHeight(),left:e(O).offset().left,zindex:999}).show()}function y(){o.searchingText&&(B.html("<p>"+o.searchingText+"</p>"),v())}function b(){o.hintText&&(B.html("<p>"+o.hintText+"</p>"),v())}function w(e,t){return e.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+t+")(?![^<>]*>)(?![^&;]+;)","gi"),"<b>$1</b>")}function x(e,t,n){return e.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+t+")(?![^<>]*>)(?![^&;]+;)","g"),w(t,n))}function k(t,n){if(n&&n.length){B.empty();var i=e("<ul>").appendTo(B).mouseover(function(t){C(e(t.target).closest("li"))}).mousedown(function(t){return c(e(t.target).closest("li").data("tokeninput")),I.change(),!1}).hide();e.each(n,function(n,r){var a=o.resultsFormatter(r);a=x(a,r[o.propertyToSearch],t),a=e(a).appendTo(i),n%2?a.addClass(o.classes.dropdownItem):a.addClass(o.classes.dropdownItem2),0===n&&C(a),e.data(a.get(0),"tokeninput",r)}),v(),o.animateDropdown?i.slideDown("fast"):i.show()}else o.noResultsText&&(B.html("<p>"+o.noResultsText+"</p>"),v())}function C(t){t&&(P&&T(e(P)),t.addClass(o.classes.selectedDropdownItem),P=t.get(0))}function T(e){e.removeClass(o.classes.selectedDropdownItem),P=null}function _(){var t=L.val().toLowerCase();t&&t.length&&(M&&h(e(M),i.AFTER),t.length>=o.minChars?(y(),clearTimeout(F),F=setTimeout(function(){$(t)},o.searchDelay)):g())}function $(t){var n=t+S(),i=A.get(n);if(i)k(t,i);else if(o.url){var r=S(),a={};if(a.data={},r.indexOf("?")>-1){var s=r.split("?");a.url=s[0];var l=s[1].split("&");e.each(l,function(e,t){var n=t.split("=");a.data[n[0]]=n[1]})}else a.url=r;a.data[o.queryParam]=t,a.type=o.method,a.dataType=o.contentType,o.crossDomain&&(a.dataType="jsonp"),a.success=function(i){e.isFunction(o.onResult)&&(i=o.onResult.call(I,i)),A.add(n,o.jsonContainer?i[o.jsonContainer]:i),L.val().toLowerCase()===t&&k(t,o.jsonContainer?i[o.jsonContainer]:i)},e.ajax(a)}else if(o.local_data){var u=e.grep(o.local_data,function(e){return e[o.propertyToSearch].toLowerCase().indexOf(t.toLowerCase())>-1});e.isFunction(o.onResult)&&(u=o.onResult.call(I,u)),A.add(n,u),k(t,u)}}function S(){var e=o.url;return"function"==typeof o.url&&(e=o.url.call()),e}if("string"===e.type(a)||"function"===e.type(a)){o.url=a;var E=S();void 0===o.crossDomain&&(o.crossDomain=-1===E.indexOf("://")?!1:location.href.split(/\/+/g)[1]!==E.split(/\/+/g)[1])}else"object"==typeof a&&(o.local_data=a);o.classes?o.classes=e.extend({},n,o.classes):o.theme?(o.classes={},e.each(n,function(e,t){o.classes[e]=t+"-"+o.theme})):o.classes=n;var F,j,N=[],D=0,A=new e.TokenList.Cache,L=e('<input type="text"  autocomplete="off">').css({outline:"none"}).attr("id",o.idPrefix+t.id).focus(function(){(null===o.tokenLimit||o.tokenLimit!==D)&&b()}).blur(function(){g(),e(this).val("")}).bind("keyup keydown blur update",l).keydown(function(t){var n,a;switch(t.keyCode){case r.LEFT:case r.RIGHT:case r.UP:case r.DOWN:if(e(this).val()){var o=null;return o=t.keyCode===r.DOWN||t.keyCode===r.RIGHT?e(P).next():e(P).prev(),o.length&&C(o),!1}n=R.prev(),a=R.next(),n.length&&n.get(0)===M||a.length&&a.get(0)===M?t.keyCode===r.LEFT||t.keyCode===r.UP?h(e(M),i.BEFORE):h(e(M),i.AFTER):t.keyCode!==r.LEFT&&t.keyCode!==r.UP||!n.length?t.keyCode!==r.RIGHT&&t.keyCode!==r.DOWN||!a.length||d(e(a.get(0))):d(e(n.get(0)));break;case r.BACKSPACE:if(n=R.prev(),!e(this).val().length)return M?(p(e(M)),I.change()):n.length&&d(e(n.get(0))),!1;1===e(this).val().length?g():setTimeout(function(){_()},5);break;case r.TAB:case r.ENTER:case r.NUMPAD_ENTER:case r.COMMA:if(P)return c(e(P).data("tokeninput")),I.change(),!1;break;case r.ESCAPE:return g(),!0;default:String.fromCharCode(t.which)&&setTimeout(function(){_()},5)}}),I=e(t).hide().val("").focus(function(){L.focus()}).blur(function(){L.blur()}),M=null,H=0,P=null,O=e("<ul />").addClass(o.classes.tokenList).click(function(t){var n=e(t.target).closest("li");n&&n.get(0)&&e.data(n.get(0),"tokeninput")?f(n):(M&&h(e(M),i.END),L.focus())}).mouseover(function(t){var n=e(t.target).closest("li");n&&M!==this&&n.addClass(o.classes.highlightedToken)}).mouseout(function(t){var n=e(t.target).closest("li");n&&M!==this&&n.removeClass(o.classes.highlightedToken)}).insertBefore(I),R=e("<li />").addClass(o.classes.inputToken).appendTo(O).append(L),B=e("<div>").addClass(o.classes.dropdown).appendTo("body").hide(),W=e("<tester/>").insertAfter(L).css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:L.css("fontSize"),fontFamily:L.css("fontFamily"),fontWeight:L.css("fontWeight"),letterSpacing:L.css("letterSpacing"),whiteSpace:"nowrap"});I.val("");var q=o.prePopulate||I.data("pre");o.processPrePopulate&&e.isFunction(o.onResult)&&(q=o.onResult.call(I,q)),q&&q.length&&e.each(q,function(e,t){u(t),s()}),e.isFunction(o.onReady)&&o.onReady.call(),this.clear=function(){O.children("li").each(function(){0===e(this).children("input").length&&p(e(this))})},this.add=function(e){c(e)},this.remove=function(t){O.children("li").each(function(){if(0===e(this).children("input").length){var n=e(this).data("tokeninput"),i=!0;for(var r in t)if(t[r]!==n[r]){i=!1;break}i&&p(e(this))}})},this.getTokens=function(){return N}},e.TokenList.Cache=function(t){var n=e.extend({max_size:500},t),i={},r=0,a=function(){i={},r=0};this.add=function(e,t){r>n.max_size&&a(),i[e]||(r+=1),i[e]=t},this.get=function(e){return i[e]}}}(jQuery),function(e){e.extend(e.fn,{delayedObserver:function(t,n,i){return this.each(function(){var r=e(this),a=i||{};r.data("oldval",r.val()).data("delay",n||.5).data("condition",a.condition||function(){return e(this).data("oldval")==e(this).val()}).data("callback",t)[a.event||"keyup"](function(){r.data("condition").apply(r)||(r.data("timer")&&clearTimeout(r.data("timer")),r.data("timer",setTimeout(function(){r.data("callback").apply(r)},1e3*r.data("delay"))),r.data("oldval",r.val()))})})}})}(jQuery),format_product_autocomplete=function(e){var t="",n=e.data.product;if(void 0==e.data.variant)0!=n.images.length&&(t=image_html(n)),t+="<div><h4>"+n.title+"</h4>",t+="<span><strong>Sku: </strong>"+n.master.sku+"</span>",t+="<span><strong>On Hand: </strong>"+n.count_on_hand+"</span></div>";else{var i=e.data.variant,r=e.data.product.title;0!=i.images.length?t=image_html(i):0!=n.images.length&&(t=image_html(n)),r+=" - "+$.map(i.option_values,function(e){return e.option_type.presentation+": "+e.name}).join(", "),t+="<div><h4>"+r+"</h4>",t+="<span><strong>Sku: </strong>"+i.sku+"</span>",t+="<span><strong>On Hand: </strong>"+i.count_on_hand+"</span></div>"}return t},prep_product_autocomplete_data=function(data){return $.map(eval(data),function(e){var t=e.product;return t.variants.length>0?$.map(t.variants,function(e){var n=t.title;return n+=" - "+$.map(e.option_values,function(e){return e.option_type.presentation+": "+e.title}).join(", "),{data:{product:t,variant:e},value:title,result:title}}):{data:{product:t},value:t.title,result:t.title}})},$.fn.product_autocomplete=function(){return this.each(function(){$(this).autocomplete({source:function(e,t){$.get(ajax_urls.product_search_json+"?q="+$("#add_product_name").val()+"&authenticity_token="+encodeURIComponent($("meta[name=csrf-token]").attr("content")),function(e){result=prep_product_autocomplete_data(e),t(result)})},minLength:4,focus:function(e,t){return $("#add_product_name").val(t.item.label),!1},select:function(e,t){return $("#add_product_name").val(t.item.label),product=t.item.data,void 0==product.variant?$("#add_variant_id").val(product.product.master.id):$("#add_variant_id").val(product.variant.id),!1}}).data("autocomplete")._renderItem=function(e,t){return $(e).addClass("ac_results"),html=format_product_autocomplete(t),$("<li></li>").data("item.autocomplete",t).append("<a>"+html+"</a>").appendTo(e)},$(this).data("autocomplete")._resizeMenu=function(){var e=this.menu.element;e.outerWidth(this.element.outerWidth())}})},$.fn.objectPicker=function(e){$(this).tokenInput(e+"&authenticity_token="+escape(AUTH_TOKEN),{searchDelay:600,hintText:strings.type_to_search,noResultsText:strings.no_results,searchingText:strings.searching,prePopulateFromInput:!0})},$.fn.productPicker=function(){$(this).objectPicker(ajax_urls.product_search_basic_json)},$.fn.userPicker=function(){$(this).objectPicker(ajax_urls.user_search_basic_json)},$(document).ready(function(){$(".tokeninput.products").productPicker(),$(".tokeninput.users").userPicker()}),$(document).ready(function(){$.each($("td.qty input"),function(e,t){$(t).live("change",function(){var e="#"+$(this).attr("id").replace("_quantity","_id");jQuery.post("/admin/site/1/orders/"+$("input#order_number").val()+"/line_items/"+$(e).val(),{_method:"put","line_item[quantity]":$(this).val()},function(e){$("#order-form-wrapper").html(e.responseText)})})})}),$(document).ready(function(){add_address=function(e){var t="";return void 0!=e&&(t+=e.firstname+" "+e.lastname+", ",t+=e.address1+", "+e.address2+", ",t+=e.city+", ",t+=null!=e.state_id?e.state.name+", ":e.state_name+", ",t+=e.country.name),t},format_user_autocomplete=function(e){var t=e.data,n="<h4>"+t.email+"</h4>";return n+="<span><strong>Billing:</strong> ",n+=add_address(t.bill_address),n+="</span>",n+="<span><strong>Shipping:</strong> ",n+=add_address(t.ship_address),n+="</span>"},prep_user_autocomplete_data=function(data){return $.map(eval(data),function(e){return{data:e.user,value:e.user.email,result:e.user.email}})},$("#customer_search").length>0&&($("#customer_search").autocomplete({minChars:5,delay:1500,source:function(e,t){$.get(ajax_urls.user_search_json+"?q="+$("#customer_search").val()+"&authenticity_token="+encodeURIComponent($("meta[name=csrf-token]").attr("content")),function(e){result=prep_user_autocomplete_data(e),t(result)})},focus:function(e,t){return $("#customer_search").val(t.item.label),$(t).addClass("ac_over"),!1},select:function(e,t){return $("#customer_search").val(t.item.label),$.each(["bill","ship"],function(e,n){var i=t.item.data[n+"_address"];void 0!=i&&($("#order_"+n+"_address_attributes_firstname").val(i.firstname),$("#order_"+n+"_address_attributes_lastname").val(i.lastname),$("#order_"+n+"_address_attributes_company").val(i.company),$("#order_"+n+"_address_attributes_address1").val(i.address1),$("#order_"+n+"_address_attributes_address2").val(i.address2),$("#order_"+n+"_address_attributes_city").val(i.city),$("#order_"+n+"_address_attributes_zipcode").val(i.zipcode),$("#order_"+n+"_address_attributes_state_id").val(i.state_id),$("#order_"+n+"_address_attributes_country_id").val(i.country_id),$("#order_"+n+"_address_attributes_phone").val(i.phone))}),$("#order_email").val(t.item.data.email),$("#user_id").val(t.item.data.id),$("#guest_checkout_true").prop("checked",!1),$("#guest_checkout_false").prop("checked",!0),!0}}).data("autocomplete")._renderItem=function(e,t){return $(e).addClass("ac_results"),html=format_user_autocomplete(t),$("<li></li>").data("item.autocomplete",t).append("<a class='ui-menu-item'>"+html+"</a>").appendTo(e)},$("#customer_search").data("autocomplete")._resizeMenu=function(){var e=this.menu.element;e.outerWidth(this.element.outerWidth())}),$("input#order_use_ship_address").click(function(){show_billing(!$(this).is(":checked"))}),$("#guest_checkout_true").change(function(){$("#customer_search").val(""),$("#user_id").val(""),$("#checkout_email").val(""),$("#guest_checkout_false").prop("disabled",!0),$("#order_bill_address_attributes_firstname").val(""),$("#order_bill_address_attributes_lastname").val(""),$("#order_bill_address_attributes_company").val(""),$("#order_bill_address_attributes_address1").val(""),$("#order_bill_address_attributes_address2").val(""),$("#order_bill_address_attributes_city").val(""),$("#order_bill_address_attributes_zipcode").val(""),$("#order_bill_address_attributes_state_id").val(""),$("#order_bill_address_attributes_country_id").val(""),$("#order_bill_address_attributes_phone").val(""),$("#order_ship_address_attributes_firstname").val(""),$("#order_ship_address_attributes_lastname").val(""),$("#order_bill_address_attributes_company").val(""),$("#order_ship_address_attributes_address1").val(""),$("#order_ship_address_attributes_address2").val(""),$("#order_ship_address_attributes_city").val(""),$("#order_ship_address_attributes_zipcode").val(""),$("#order_ship_address_attributes_state_id").val(""),$("#order_ship_address_attributes_country_id").val(""),$("#order_ship_address_attributes_phone").val("")});var show_billing=function(e){e?($("#shipping").show(),$("#shipping input").prop("disabled",!1),$("#shipping select").prop("disabled",!1)):($("#shipping").hide(),$("#shipping input").prop("disabled",!0),$("#shipping select").prop("disabled",!0))}}),$(function(){var e=$("#gtwy-type").attr("value");$("div#gateway-settings-warning").hide(),$("#gtwy-type").change(function(){$("#gtwy-type").attr("value")==e?($("div.gateway-settings").show(),$("div#gateway-settings-warning").hide()):($("div.gateway-settings").hide(),$("div#gateway-settings-warning").show())})}),replace_ids=function(e){var t=(new Date).getTime();return e.replace(/NEW_RECORD/g,t)},$(function(){$("a[id*=nested]").click(function(){var template=$(this).attr("href").replace(/.*#/,"");html=replace_ids(eval(template)),$("#ul-"+$(this).attr("id")).append(html),update_remove_links()}),update_remove_links()});var update_remove_links=function(){$(".remove").click(function(){return $(this).prevAll(":first").val(1),$(this).parent().hide(),!1})};