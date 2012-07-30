/*
 * jQuery UI Nested Sortable
 * v 1.3.5 / 21 jun 2012
 * http://mjsarfatti.com/code/nestedSortable
 *
 * Depends on:
 *	 jquery.ui.sortable.js 1.8+
 *
 * Copyright (c) 2010-2012 Manuele J Sarfatti
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(e){e.widget("mjs.nestedSortable",e.extend({},e.ui.sortable.prototype,{options:{tabSize:20,disableNesting:"mjs-nestedSortable-no-nesting",errorClass:"mjs-nestedSortable-error",listType:"ol",maxLevels:0,protectRoot:!1,rootID:null,rtl:!1,isAllowed:function(e,t){return!0}},_create:function(){this.element.data("sortable",this.element.data("nestedSortable"));if(!this.element.is(this.options.listType))throw new Error("nestedSortable: Please check the listType option is set to your actual list type");return e.ui.sortable.prototype._create.apply(this,arguments)},destroy:function(){return this.element.removeData("nestedSortable").unbind(".nestedSortable"),e.ui.sortable.prototype.destroy.apply(this,arguments)},_mouseDrag:function(t){this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var n=this.options,r=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<n.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+n.scrollSpeed:t.pageY-this.overflowOffset.top<n.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-n.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<n.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+n.scrollSpeed:t.pageX-this.overflowOffset.left<n.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-n.scrollSpeed)):(t.pageY-e(document).scrollTop()<n.scrollSensitivity?r=e(document).scrollTop(e(document).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<n.scrollSensitivity&&(r=e(document).scrollTop(e(document).scrollTop()+n.scrollSpeed)),t.pageX-e(document).scrollLeft()<n.scrollSensitivity?r=e(document).scrollLeft(e(document).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<n.scrollSensitivity&&(r=e(document).scrollLeft(e(document).scrollLeft()+n.scrollSpeed))),r!==!1&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");var i=this.placeholder.offset().top;if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var s=this.items.length-1;s>=0;s--){var o=this.items[s],u=o.item[0],a=this._intersectsWithPointer(o);if(!a)continue;if(u!=this.currentItem[0]&&this.placeholder[a==1?"next":"prev"]()[0]!=u&&!e.contains(this.placeholder[0],u)&&(this.options.type=="semi-dynamic"?!e.contains(this.element[0],u):!0)){e(u).mouseenter(),this.direction=a==1?"down":"up";if(this.options.tolerance!="pointer"&&!this._intersectsWithSides(o))break;e(u).mouseleave(),this._rearrange(t,o),this._clearEmpty(u),this._trigger("change",t,this._uiHash());break}}var f=this.placeholder[0].parentNode.parentNode&&e(this.placeholder[0].parentNode.parentNode).closest(".ui-sortable").length?e(this.placeholder[0].parentNode.parentNode):null,l=this._getLevel(this.placeholder),c=this._getChildLevels(this.helper),h=this.placeholder[0].previousSibling?e(this.placeholder[0].previousSibling):null;if(h!=null)while(h[0].nodeName.toLowerCase()!="li"||h[0]==this.currentItem[0]||h[0]==this.helper[0]){if(!h[0].previousSibling){h=null;break}h=e(h[0].previousSibling)}var p=this.placeholder[0].nextSibling?e(this.placeholder[0].nextSibling):null;if(p!=null)while(p[0].nodeName.toLowerCase()!="li"||p[0]==this.currentItem[0]||p[0]==this.helper[0]){if(!p[0].nextSibling){p=null;break}p=e(p[0].nextSibling)}var d=document.createElement(n.listType);return this.beyondMaxLevels=0,f!=null&&p==null&&(n.rtl&&this.positionAbs.left+this.helper.outerWidth()>f.offset().left+f.outerWidth()||!n.rtl&&this.positionAbs.left<f.offset().left)?(f.after(this.placeholder[0]),this._clearEmpty(f[0]),this._trigger("change",t,this._uiHash())):h!=null&&(n.rtl&&this.positionAbs.left+this.helper.outerWidth()<h.offset().left+h.outerWidth()-n.tabSize||!n.rtl&&this.positionAbs.left>h.offset().left+n.tabSize)?(this._isAllowed(h,l,l+c+1),h.children(n.listType).length||h[0].appendChild(d),i&&i<=h.offset().top?h.children(n.listType).prepend(this.placeholder):h.children(n.listType)[0].appendChild(this.placeholder[0]),this._trigger("change",t,this._uiHash())):this._isAllowed(f,l,l+c),this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,n){this.beyondMaxLevels&&(this.placeholder.removeClass(this.options.errorClass),this.domPosition.prev?e(this.domPosition.prev).after(this.placeholder):e(this.domPosition.parent).prepend(this.placeholder),this._trigger("revert",t,this._uiHash()));for(var r=this.items.length-1;r>=0;r--){var i=this.items[r].item[0];this._clearEmpty(i)}e.ui.sortable.prototype._mouseStop.apply(this,arguments)},serialize:function(t){var n=e.extend({},this.options,t),r=this._getItemsAsjQuery(n&&n.connected),i=[];return e(r).each(function(){var t=(e(n.item||this).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/),r=(e(n.item||this).parent(n.listType).parent(n.items).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/);t&&i.push((n.key||t[1])+"["+(n.key&&n.expression?t[1]:t[2])+"]"+"="+(r?n.key&&n.expression?r[1]:r[2]:n.rootID))}),!i.length&&n.key&&i.push(n.key+"="),i.join("&")},toHierarchy:function(t){function s(t){var r=(e(t).attr(n.attribute||"id")||"").match(n.expression||/(.+)[-=_](.+)/);if(r){var i={id:r[2]};return e(t).children(n.listType).children(n.items).length>0&&(i.children=[],e(t).children(n.listType).children(n.items).each(function(){var e=s(this);i.children.push(e)})),i}}var n=e.extend({},this.options,t),r=n.startDepthCount||0,i=[];return e(this.element).children(n.items).each(function(){var e=s(this);i.push(e)}),i},toArray:function(t){function o(t,s,u){var a=u+1,f,l;e(t).children(n.listType).children(n.items).length>0&&(s++,e(t).children(n.listType).children(n.items).each(function(){a=o(e(this),s,a)}),s--),f=e(t).attr(n.attribute||"id").match(n.expression||/(.+)[-=_](.+)/);if(s===r+1)l=n.rootID;else{var c=e(t).parent(n.listType).parent(n.items).attr(n.attribute||"id").match(n.expression||/(.+)[-=_](.+)/);l=c[2]}return f&&i.push({item_id:f[2],parent_id:l,depth:s,left:u,right:a}),u=a+1,u}var n=e.extend({},this.options,t),r=n.startDepthCount||0,i=[],s=2;return i.push({item_id:n.rootID,parent_id:"none",depth:r,left:"1",right:(e(n.items,this.element).length+1)*2}),e(this.element).children(n.items).each(function(){s=o(this,r+1,s)}),i=i.sort(function(e,t){return e.left-t.left}),i},_clearEmpty:function(t){var n=e(t).children(this.options.listType);n.length&&!n.children().length&&n.remove()},_getLevel:function(e){var t=1;if(this.options.listType){var n=e.closest(this.options.listType);while(n&&n.length>0&&!n.is(".ui-sortable"))t++,n=n.parent().closest(this.options.listType)}return t},_getChildLevels:function(t,n){var r=this,i=this.options,s=0;return n=n||0,e(t).children(i.listType).children(i.items).each(function(e,t){s=Math.max(r._getChildLevels(t,n+1),s)}),n?s+1:s},_isAllowed:function(t,n,r){var i=this.options,s=e(this.domPosition.parent).hasClass("ui-sortable")?!0:!1,o=this.placeholder.closest(".ui-sortable").nestedSortable("option","maxLevels");!i.isAllowed(t,this.placeholder)||t&&t.hasClass(i.disableNesting)||i.protectRoot&&(t==null&&!s||s&&n>1)?(this.placeholder.addClass(i.errorClass),o<r&&o!=0?this.beyondMaxLevels=r-o:this.beyondMaxLevels=1):o<r&&o!=0?(this.placeholder.addClass(i.errorClass),this.beyondMaxLevels=r-o):(this.placeholder.removeClass(i.errorClass),this.beyondMaxLevels=0)}})),e.mjs.nestedSortable.prototype.options=e.extend({},e.ui.sortable.prototype.options,e.mjs.nestedSortable.prototype.options)})(jQuery);var list_reorder={initialised:!1,init:function(e,t){this.element=e,this.url=t,e.nestedSortable({disableNesting:"no-nest",forcePlaceholderSize:!0,handle:"span.handle",helper:"clone",items:"li",listType:"ul",maxLevels:MENU_LEVEL,opacity:.6,placeholder:"placeholder",revert:250,tabSize:25,tolerance:"pointer",toleranceElement:"> div",update:function(e,t){item_id=get_number_from_string(t.item.attr("id"));try{parent_id=t.item.parent().parent().attr("id"),parent_id==undefined?parent_id=0:parent_id=get_number_from_string(parent_id)}catch(n){parent_id=0}try{prev_id=get_number_from_string(t.item.prev().attr("id"))}catch(n){prev_id=0}try{next_id=get_number_from_string(t.item.next().attr("id"))}catch(n){next_id=0}jQuery.ajax({type:"POST",url:list_reorder.url,data:{node_id:item_id,parent_id:parent_id,prev_id:prev_id,next_id:next_id,authenticity_token:AUTH_TOKEN},dataType:"script",beforeSend:function(e){attachLoading("body")},error:function(e,t,n){alert(n)},complete:function(e,t){removeLoading("body")}})}}),this.initialised=!0}};