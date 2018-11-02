// exports.command = function (tagName, callback) {
//     callback = callback || function () {
//     };
//
//     this.execute(function (tagName) {
//         return document.getElementTagName(TagName).lenght;
//     }, [tagName], function (result) {
//         callback.call(this, result);
//     });
//     return this;
// };



// function dclick(eventText) {
//     // dispatch double click
//     var evt = MouseEvent('dblclick', {'view': window, 'bubbles': true,'cancelable': true});
//     var foundElems = document.querySelectorAll('section.main p');
//
//     if(!foundElems) return;
//     var elm = null;
//
//     for(var i=0; i < foundElems.length; i++) {
//         if(foundElems[i].innerText === eventText) {
//             elm = foundElems[i];
//             break;
//         }
//     }
//
//     elm.dispatchEvent(evt);
// }
