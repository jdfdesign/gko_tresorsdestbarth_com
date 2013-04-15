/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(e,t,n){if(arguments.length>1&&"[object Object]"!==String(t)){if(n=jQuery.extend({},n),(null===t||void 0===t)&&(n.expires=-1),"number"==typeof n.expires){var i=n.expires,r=n.expires=new Date;r.setDate(r.getDate()+i)}return t=String(t),document.cookie=[encodeURIComponent(e),"=",n.raw?t:encodeURIComponent(t),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}n=t||{};var o,a=n.raw?function(e){return e}:decodeURIComponent;return(o=new RegExp("(?:^|; )"+encodeURIComponent(e)+"=([^;]*)").exec(document.cookie))?a(o[1]):null},/*
 * jQuery Plugin: Tokenizing Autocomplete Text Entry
 * Version 1.6.0
 *
 * Copyright (c) 2009 James Smith (http://loopj.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */
function(e){var t={method:"GET",contentType:"json",queryParam:"q",searchDelay:300,minChars:1,propertyToSearch:"name",jsonContainer:null,hintText:"Type in a search term",noResultsText:"No results",searchingText:"Searching...",deleteText:"&times;",animateDropdown:!0,tokenLimit:null,tokenDelimiter:",",preventDuplicates:!1,tokenValue:"id",prePopulate:null,processPrePopulate:!1,idPrefix:"token-input-",resultsFormatter:function(e){return"<li>"+e[this.propertyToSearch]+"</li>"},tokenFormatter:function(e){return"<li><p>"+e[this.propertyToSearch]+"</p></li>"},onResult:null,onAdd:null,onDelete:null,onReady:null},n={tokenList:"token-input-list",token:"token-input-token",tokenDelete:"token-input-delete-token",selectedToken:"token-input-selected-token",highlightedToken:"token-input-highlighted-token",dropdown:"token-input-dropdown",dropdownItem:"token-input-dropdown-item",dropdownItem2:"token-input-dropdown-item2",selectedDropdownItem:"token-input-selected-dropdown-item",inputToken:"token-input-input-token"},i={BEFORE:0,AFTER:1,END:2},r={BACKSPACE:8,TAB:9,ENTER:13,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,NUMPAD_ENTER:108,COMMA:188},o={init:function(n,i){var r=e.extend({},t,i||{});return this.each(function(){e(this).data("tokenInputObject",new e.TokenList(this,n,r))})},clear:function(){return this.data("tokenInputObject").clear(),this},add:function(e){return this.data("tokenInputObject").add(e),this},remove:function(e){return this.data("tokenInputObject").remove(e),this},get:function(){return this.data("tokenInputObject").getTokens()}};e.fn.tokenInput=function(e){return o[e]?o[e].apply(this,Array.prototype.slice.call(arguments,1)):o.init.apply(this,arguments)},e.TokenList=function(t,o,a){function s(){return null!==a.tokenLimit&&D>=a.tokenLimit?(I.hide(),g(),void 0):void 0}function l(){if(N!==(N=I.val())){var e=N.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");B.html(e),I.width(B.width()+30)}}function c(t){var n=a.tokenFormatter(t);n=e(n).addClass(a.classes.token).insertBefore(R),e("<span>"+a.deleteText+"</span>").addClass(a.classes.tokenDelete).appendTo(n).click(function(){return f(e(this).parent()),F.change(),!1});var i={id:t.id};return i[a.propertyToSearch]=t[a.propertyToSearch],e.data(n.get(0),"tokeninput",t),A=A.slice(0,H).concat([i]).concat(A.slice(H)),H++,m(A,F),D+=1,null!==a.tokenLimit&&D>=a.tokenLimit&&(I.hide(),g()),n}function u(t){var n=a.onAdd;if(D>0&&a.preventDuplicates){var i=null;if(P.children().each(function(){var n=e(this),r=e.data(n.get(0),"tokeninput");return r&&r.id===t.id?(i=n,!1):void 0}),i)return d(i),R.insertAfter(i),I.focus(),void 0}(null==a.tokenLimit||a.tokenLimit>D)&&(c(t),s()),I.val(""),g(),e.isFunction(n)&&n.call(F,t)}function d(e){e.addClass(a.classes.selectedToken),M=e.get(0),I.val(""),g()}function h(e,t){e.removeClass(a.classes.selectedToken),M=null,t===i.BEFORE?(R.insertBefore(e),H--):t===i.AFTER?(R.insertAfter(e),H++):(R.appendTo(P),H=D),I.focus()}function p(t){var n=M;M&&h(e(M),i.END),n===t.get(0)?h(t,i.END):d(t)}function f(t){var n=e.data(t.get(0),"tokeninput"),i=a.onDelete,r=t.prevAll().length;r>H&&r--,t.remove(),M=null,I.focus(),A=A.slice(0,r).concat(A.slice(r+1)),H>r&&H--,m(A,F),D-=1,null!==a.tokenLimit&&I.show().val("").focus(),e.isFunction(i)&&i.call(F,n)}function m(t,n){var i=e.map(t,function(e){return e[a.tokenValue]});n.val(i.join(a.tokenDelimiter))}function g(){W.hide().empty(),O=null}function v(){W.css({position:"absolute",top:e(P).offset().top+e(P).outerHeight(),left:e(P).offset().left,zindex:999}).show()}function y(){a.searchingText&&(W.html("<p>"+a.searchingText+"</p>"),v())}function b(){a.hintText&&(W.html("<p>"+a.hintText+"</p>"),v())}function w(e,t){return e.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+t+")(?![^<>]*>)(?![^&;]+;)","gi"),"<b>$1</b>")}function x(e,t,n){return e.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)("+t+")(?![^<>]*>)(?![^&;]+;)","g"),w(t,n))}function T(t,n){if(n&&n.length){W.empty();var i=e("<ul>").appendTo(W).mouseover(function(t){k(e(t.target).closest("li"))}).mousedown(function(t){return u(e(t.target).closest("li").data("tokeninput")),F.change(),!1}).hide();e.each(n,function(n,r){var o=a.resultsFormatter(r);o=x(o,r[a.propertyToSearch],t),o=e(o).appendTo(i),n%2?o.addClass(a.classes.dropdownItem):o.addClass(a.classes.dropdownItem2),0===n&&k(o),e.data(o.get(0),"tokeninput",r)}),v(),a.animateDropdown?i.slideDown("fast"):i.show()}else a.noResultsText&&(W.html("<p>"+a.noResultsText+"</p>"),v())}function k(t){t&&(O&&C(e(O)),t.addClass(a.classes.selectedDropdownItem),O=t.get(0))}function C(e){e.removeClass(a.classes.selectedDropdownItem),O=null}function _(){var t=I.val().toLowerCase();t&&t.length&&(M&&h(e(M),i.AFTER),t.length>=a.minChars?(y(),clearTimeout(E),E=setTimeout(function(){S(t)},a.searchDelay)):g())}function S(t){var n=t+$(),i=L.get(n);if(i)T(t,i);else if(a.url){var r=$(),o={};if(o.data={},r.indexOf("?")>-1){var s=r.split("?");o.url=s[0];var l=s[1].split("&");e.each(l,function(e,t){var n=t.split("=");o.data[n[0]]=n[1]})}else o.url=r;o.data[a.queryParam]=t,o.type=a.method,o.dataType=a.contentType,a.crossDomain&&(o.dataType="jsonp"),o.success=function(i){e.isFunction(a.onResult)&&(i=a.onResult.call(F,i)),L.add(n,a.jsonContainer?i[a.jsonContainer]:i),I.val().toLowerCase()===t&&T(t,a.jsonContainer?i[a.jsonContainer]:i)},e.ajax(o)}else if(a.local_data){var c=e.grep(a.local_data,function(e){return e[a.propertyToSearch].toLowerCase().indexOf(t.toLowerCase())>-1});e.isFunction(a.onResult)&&(c=a.onResult.call(F,c)),L.add(n,c),T(t,c)}}function $(){var e=a.url;return"function"==typeof a.url&&(e=a.url.call()),e}if("string"===e.type(o)||"function"===e.type(o)){a.url=o;var j=$();void 0===a.crossDomain&&(a.crossDomain=-1===j.indexOf("://")?!1:location.href.split(/\/+/g)[1]!==j.split(/\/+/g)[1])}else"object"==typeof o&&(a.local_data=o);a.classes?a.classes=e.extend({},n,a.classes):a.theme?(a.classes={},e.each(n,function(e,t){a.classes[e]=t+"-"+a.theme})):a.classes=n;var E,N,A=[],D=0,L=new e.TokenList.Cache,I=e('<input type="text"  autocomplete="off">').css({outline:"none"}).attr("id",a.idPrefix+t.id).focus(function(){(null===a.tokenLimit||a.tokenLimit!==D)&&b()}).blur(function(){g(),e(this).val("")}).bind("keyup keydown blur update",l).keydown(function(t){var n,o;switch(t.keyCode){case r.LEFT:case r.RIGHT:case r.UP:case r.DOWN:if(e(this).val()){var a=null;return a=t.keyCode===r.DOWN||t.keyCode===r.RIGHT?e(O).next():e(O).prev(),a.length&&k(a),!1}n=R.prev(),o=R.next(),n.length&&n.get(0)===M||o.length&&o.get(0)===M?t.keyCode===r.LEFT||t.keyCode===r.UP?h(e(M),i.BEFORE):h(e(M),i.AFTER):t.keyCode!==r.LEFT&&t.keyCode!==r.UP||!n.length?t.keyCode!==r.RIGHT&&t.keyCode!==r.DOWN||!o.length||d(e(o.get(0))):d(e(n.get(0)));break;case r.BACKSPACE:if(n=R.prev(),!e(this).val().length)return M?(f(e(M)),F.change()):n.length&&d(e(n.get(0))),!1;1===e(this).val().length?g():setTimeout(function(){_()},5);break;case r.TAB:case r.ENTER:case r.NUMPAD_ENTER:case r.COMMA:if(O)return u(e(O).data("tokeninput")),F.change(),!1;break;case r.ESCAPE:return g(),!0;default:String.fromCharCode(t.which)&&setTimeout(function(){_()},5)}}),F=e(t).hide().val("").focus(function(){I.focus()}).blur(function(){I.blur()}),M=null,H=0,O=null,P=e("<ul />").addClass(a.classes.tokenList).click(function(t){var n=e(t.target).closest("li");n&&n.get(0)&&e.data(n.get(0),"tokeninput")?p(n):(M&&h(e(M),i.END),I.focus())}).mouseover(function(t){var n=e(t.target).closest("li");n&&M!==this&&n.addClass(a.classes.highlightedToken)}).mouseout(function(t){var n=e(t.target).closest("li");n&&M!==this&&n.removeClass(a.classes.highlightedToken)}).insertBefore(F),R=e("<li />").addClass(a.classes.inputToken).appendTo(P).append(I),W=e("<div>").addClass(a.classes.dropdown).appendTo("body").hide(),B=e("<tester/>").insertAfter(I).css({position:"absolute",top:-9999,left:-9999,width:"auto",fontSize:I.css("fontSize"),fontFamily:I.css("fontFamily"),fontWeight:I.css("fontWeight"),letterSpacing:I.css("letterSpacing"),whiteSpace:"nowrap"});F.val("");var q=a.prePopulate||F.data("pre");a.processPrePopulate&&e.isFunction(a.onResult)&&(q=a.onResult.call(F,q)),q&&q.length&&e.each(q,function(e,t){c(t),s()}),e.isFunction(a.onReady)&&a.onReady.call(),this.clear=function(){P.children("li").each(function(){0===e(this).children("input").length&&f(e(this))})},this.add=function(e){u(e)},this.remove=function(t){P.children("li").each(function(){if(0===e(this).children("input").length){var n=e(this).data("tokeninput"),i=!0;for(var r in t)if(t[r]!==n[r]){i=!1;break}i&&f(e(this))}})},this.getTokens=function(){return A}},e.TokenList.Cache=function(t){var n=e.extend({max_size:500},t),i={},r=0,o=function(){i={},r=0};this.add=function(e,t){r>n.max_size&&o(),i[e]||(r+=1),i[e]=t},this.get=function(e){return i[e]}}}(jQuery),function(e){e.extend(e.fn,{delayedObserver:function(t,n,i){return this.each(function(){var r=e(this),o=i||{};r.data("oldval",r.val()).data("delay",n||.5).data("condition",o.condition||function(){return e(this).data("oldval")==e(this).val()}).data("callback",t)[o.event||"keyup"](function(){r.data("condition").apply(r)||(r.data("timer")&&clearTimeout(r.data("timer")),r.data("timer",setTimeout(function(){r.data("callback").apply(r)},1e3*r.data("delay"))),r.data("oldval",r.val()))})})}})}(jQuery),format_product_autocomplete=function(e){var t="",n=e.data.product;if(void 0==e.data.variant)0!=n.images.length&&(t=image_html(n)),t+="<div><h4>"+n.title+"</h4>",t+="<span><strong>Sku: </strong>"+n.master.sku+"</span>",t+="<span><strong>On Hand: </strong>"+n.count_on_hand+"</span></div>";else{var i=e.data.variant,r=e.data.product.title;0!=i.images.length?t=image_html(i):0!=n.images.length&&(t=image_html(n)),r+=" - "+$.map(i.option_values,function(e){return e.option_type.presentation+": "+e.name}).join(", "),t+="<div><h4>"+r+"</h4>",t+="<span><strong>Sku: </strong>"+i.sku+"</span>",t+="<span><strong>On Hand: </strong>"+i.count_on_hand+"</span></div>"}return t},prep_product_autocomplete_data=function(data){return $.map(eval(data),function(e){var t=e.product;return t.variants.length>0?$.map(t.variants,function(e){var n=t.title;return n+=" - "+$.map(e.option_values,function(e){return e.option_type.presentation+": "+e.title}).join(", "),{data:{product:t,variant:e},value:title,result:title}}):{data:{product:t},value:t.title,result:t.title}})},$.fn.product_autocomplete=function(){return this.each(function(){$(this).autocomplete({source:function(e,t){$.get(ajax_urls.product_search_json+"?q="+$("#add_product_name").val()+"&authenticity_token="+encodeURIComponent($("meta[name=csrf-token]").attr("content")),function(e){result=prep_product_autocomplete_data(e),t(result)})},minLength:4,focus:function(e,t){return $("#add_product_name").val(t.item.label),!1},select:function(e,t){return $("#add_product_name").val(t.item.label),product=t.item.data,void 0==product.variant?$("#add_variant_id").val(product.product.master.id):$("#add_variant_id").val(product.variant.id),!1}}).data("autocomplete")._renderItem=function(e,t){return $(e).addClass("ac_results"),html=format_product_autocomplete(t),$("<li></li>").data("item.autocomplete",t).append("<a>"+html+"</a>").appendTo(e)},$(this).data("autocomplete")._resizeMenu=function(){var e=this.menu.element;e.outerWidth(this.element.outerWidth())}})},$.fn.objectPicker=function(e){$(this).tokenInput(e+"&authenticity_token="+escape(AUTH_TOKEN),{searchDelay:600,hintText:strings.type_to_search,noResultsText:strings.no_results,searchingText:strings.searching,prePopulateFromInput:!0})},$.fn.productPicker=function(){$(this).objectPicker(ajax_urls.product_search_basic_json)},$.fn.userPicker=function(){$(this).objectPicker(ajax_urls.user_search_basic_json)},$(document).ready(function(){$(".tokeninput.products").productPicker(),$(".tokeninput.users").userPicker()}),$(document).ready(function(){$.each($("td.qty input"),function(e,t){$(t).live("change",function(){var e="#"+$(this).attr("id").replace("_quantity","_id");jQuery.post("/admin/site/1/orders/"+$("input#order_number").val()+"/line_items/"+$(e).val(),{_method:"put","line_item[quantity]":$(this).val()},function(e){$("#order-form-wrapper").html(e.responseText)})})})}),$(document).ready(function(){add_address=function(e){var t="";return void 0!=e&&(t+=e.firstname+" "+e.lastname+", ",t+=e.address1+", "+e.address2+", ",t+=e.city+", ",t+=null!=e.state_id?e.state.name+", ":e.state_name+", ",t+=e.country.name),t},format_user_autocomplete=function(e){var t=e.data,n="<h4>"+t.email+"</h4>";return n+="<span><strong>Billing:</strong> ",n+=add_address(t.bill_address),n+="</span>",n+="<span><strong>Shipping:</strong> ",n+=add_address(t.ship_address),n+="</span>"},prep_user_autocomplete_data=function(data){return $.map(eval(data),function(e){return{data:e.user,value:e.user.email,result:e.user.email}})},$("#customer_search").length>0&&($("#customer_search").autocomplete({minChars:5,delay:1500,source:function(e,t){$.get(ajax_urls.user_search_json+"?q="+$("#customer_search").val()+"&authenticity_token="+encodeURIComponent($("meta[name=csrf-token]").attr("content")),function(e){result=prep_user_autocomplete_data(e),t(result)})},focus:function(e,t){return $("#customer_search").val(t.item.label),$(t).addClass("ac_over"),!1},select:function(e,t){return $("#customer_search").val(t.item.label),$.each(["bill","ship"],function(e,n){var i=t.item.data[n+"_address"];void 0!=i&&($("#order_"+n+"_address_attributes_firstname").val(i.firstname),$("#order_"+n+"_address_attributes_lastname").val(i.lastname),$("#order_"+n+"_address_attributes_company").val(i.company),$("#order_"+n+"_address_attributes_address1").val(i.address1),$("#order_"+n+"_address_attributes_address2").val(i.address2),$("#order_"+n+"_address_attributes_city").val(i.city),$("#order_"+n+"_address_attributes_zipcode").val(i.zipcode),$("#order_"+n+"_address_attributes_state_id").val(i.state_id),$("#order_"+n+"_address_attributes_country_id").val(i.country_id),$("#order_"+n+"_address_attributes_phone").val(i.phone))}),$("#order_email").val(t.item.data.email),$("#user_id").val(t.item.data.id),$("#guest_checkout_true").prop("checked",!1),$("#guest_checkout_false").prop("checked",!0),!0}}).data("autocomplete")._renderItem=function(e,t){return $(e).addClass("ac_results"),html=format_user_autocomplete(t),$("<li></li>").data("item.autocomplete",t).append("<a class='ui-menu-item'>"+html+"</a>").appendTo(e)},$("#customer_search").data("autocomplete")._resizeMenu=function(){var e=this.menu.element;e.outerWidth(this.element.outerWidth())}),$("input#order_use_ship_address").click(function(){show_billing(!$(this).is(":checked"))}),$("#guest_checkout_true").change(function(){$("#customer_search").val(""),$("#user_id").val(""),$("#checkout_email").val(""),$("#guest_checkout_false").prop("disabled",!0),$("#order_bill_address_attributes_firstname").val(""),$("#order_bill_address_attributes_lastname").val(""),$("#order_bill_address_attributes_company").val(""),$("#order_bill_address_attributes_address1").val(""),$("#order_bill_address_attributes_address2").val(""),$("#order_bill_address_attributes_city").val(""),$("#order_bill_address_attributes_zipcode").val(""),$("#order_bill_address_attributes_state_id").val(""),$("#order_bill_address_attributes_country_id").val(""),$("#order_bill_address_attributes_phone").val(""),$("#order_ship_address_attributes_firstname").val(""),$("#order_ship_address_attributes_lastname").val(""),$("#order_bill_address_attributes_company").val(""),$("#order_ship_address_attributes_address1").val(""),$("#order_ship_address_attributes_address2").val(""),$("#order_ship_address_attributes_city").val(""),$("#order_ship_address_attributes_zipcode").val(""),$("#order_ship_address_attributes_state_id").val(""),$("#order_ship_address_attributes_country_id").val(""),$("#order_ship_address_attributes_phone").val("")});var show_billing=function(e){e?($("#shipping").show(),$("#shipping input").prop("disabled",!1),$("#shipping select").prop("disabled",!1)):($("#shipping").hide(),$("#shipping input").prop("disabled",!0),$("#shipping select").prop("disabled",!0))}}),$(function(){var e=$("#gtwy-type").attr("value");$("div#gateway-settings-warning").hide(),$("#gtwy-type").change(function(){$("#gtwy-type").attr("value")==e?($("div.gateway-settings").show(),$("div#gateway-settings-warning").hide()):($("div.gateway-settings").hide(),$("div#gateway-settings-warning").show())})}),replace_ids=function(e){var t=(new Date).getTime();return e.replace(/NEW_RECORD/g,t)},$(function(){$("a[id*=nested]").click(function(){var template=$(this).attr("href").replace(/.*#/,"");html=replace_ids(eval(template)),$("#ul-"+$(this).attr("id")).append(html),update_remove_links()}),update_remove_links()});var update_remove_links=function(){$(".remove").click(function(){return $(this).prevAll(":first").val(1),$(this).parent().hide(),!1})};