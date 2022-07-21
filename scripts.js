$(`#hamburger-menu`).on(`click`, function(){
    if ($(`#hamburger-menu`).hasClass(`hamburger-open`)){
        $(`#nav-links`).hide();
        $(`#hamburger-menu i`).css(`transform`, `rotate(0deg)`).css(`transition`, `all 0.5s`);
        $(`#hamburger-menu`).removeClass(`hamburger-open`)
    } else {
        $(`#nav-links`).show();
        $(`#hamburger-menu i`).css(`transform`, `rotate(-90deg)`).css(`transition`, `all 0.5s`);
        $(`#hamburger-menu`).addClass(`hamburger-open`)
    }
})
window.onresize = (function(){
    const height = $(window).height();
    const width = $(window).width();
    if (height >= width){
        $(`#hamburger-menu i`).css(`transform`, `none`);
        $(`#nav-links`).hide();
    } else {
        $(`#nav-links`).show();
    }
})
