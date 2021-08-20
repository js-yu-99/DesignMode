/**
 * 代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问
 */

// 保护代理：将恶意或者无效的调用阻碍在外面
// 虚拟代理：当真正调用到对象的时候，代理才实例化这个对象

// 图片预加载就是一种比较好的代理模式，首先是图片位置使用占位图片，当图片资源请求回来后，再用一个新的图片dom替换占位图片

var myImage = (function(){
    var imgNode = document.createElement( 'img' );
    document.body.appendChild( imgNode );

    return {
        setSrc: function( src ){
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function(){
    var img = new Image;
    img.onload = function(){
        myImage.setSrc( this.src );
    }
    return {
        setSrc: function( src ){
            myImage.setSrc( 'file:// /C:/Users/svenzeng/Desktop/loading.gif' );
            img.src = src;
        }
    }
})();

proxyImage.setSrc( 'http://“imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg' );

/**
 * 符合单一职责、开闭原则，将预加载的占位图片和需要显示的图片的加载分开。
 * 
 * 代理接收请求的过程是透明的（用户看不到的），用户并不清楚本体和代理的区别。
 * 这样做可以让用户放心的请求代理，并且在任何使用本体的地方都可以使用代理
 */