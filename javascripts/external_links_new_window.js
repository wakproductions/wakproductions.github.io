// This will make off-site links open in a new window
$(document.links).filter(function() {
    //return this.hostname != window.location.hostname;
    return this.hostname != 'localhost';
    alert('link has been clicked')
}).attr('target', '_blank');