
        let radius = 560;
        //相册展开大小
        let outDom = document.getElementById("dragBox");
        outDom.style.display = 'none';

        let spinDom = document.getElementById("spinBox");
        let spinDom2 = document.getElementById("spinBox2");
        let spinDom3 = document.getElementById("spinBox3");

        let aImg = spinDom.getElementsByTagName('img');
        let aImg2 = spinDom2.getElementsByTagName('img');
        let aImg3 = spinDom3.getElementsByTagName('img');

        let aEle = [...aImg];
        let aEle2 = [...aImg2];
        let aEle3 = [...aImg3];

        function setStyle(delayTime, dom, i, len) {
            //给元素加动画 展开
            dom.style.transform = "rotateY(" + (i * (360 / len)) + "deg) translateZ(" + radius + "px)";
            dom.style.transition = "transform 1s";
            dom.style.transitionDelay = delayTime || (len - i) / 4 + "s";
        }

        function init(delayTime) {
            for (let i = 0; i < aEle.length; i++) {
                setStyle(delayTime, aEle[i], i, aEle.length)
            }
            for (let i = 0; i < aEle2.length; i++) {
                setStyle(delayTime, aEle2[i], i, aEle2.length)
            }
            for (let i = 0; i < aEle3.length; i++) {
                setStyle(delayTime, aEle3[i], i, aEle3.length)
            }
        }

        let click_me_shell = document.getElementById("click_me_shell")
        click_me_shell.onclick = () => {
            /* console.log('点击了') */
            outDom.style.display = '';
            click_me_shell.style.display = 'none';
            let audio = document.getElementById('audio');
            audio.play();
            ! function (e, t, a) {
                function r() {
                    for (var e = 0; e < s.length; e++) s[e].alpha <= 0 ? (t.body.removeChild(s[e].el), s.splice(e,
                        1)) : (s[
                            e].y--, s[e].scale += .004, s[e].alpha -= .013, s[e].el.style.cssText = "left:" + s[
                            e].x +
                        "px;top:" + s[e].y + "px;opacity:" + s[e].alpha + ";transform:scale(" + s[e].scale +
                        "," + s[e]
                        .scale + ") rotate(45deg);background:" + s[e].color + ";z-index:99999");
                    requestAnimationFrame(r)
                }

                function n() {
                    var t = "function" == typeof e.onclick && e.onclick;
                    e.onclick = function (e) {
                        t && t(), o(e)
                    }
                }

                function o(e) {
                    var a = t.createElement("div");
                    a.className = "heart", s.push({
                        el: a,
                        x: e.clientX - 5,
                        y: e.clientY - 5,
                        scale: 1,
                        alpha: 1,
                        color: c()
                    }), t.body.appendChild(a)
                }

                function i(e) {
                    var a = t.createElement("style");
                    a.type = "text/css";
                    try {
                        a.appendChild(t.createTextNode(e))
                    } catch (t) {
                        a.styleSheet.cssText = e
                    }
                    t.getElementsByTagName("head")[0].appendChild(a)
                }

                function c() {
                    return "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math
                        .random()) + ")"
                }
                var s = [];
                e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e
                    .mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (
                        e) {
                        setTimeout(e, 1e3 / 60)
                    }, i(
                        ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
                    ), n(), r()
            }(window, document);
            setTimeout(init, 1000);
        }


        //鼠标滚动事件
        document.onmousewheel = function (e) {
            e || e.window.event;
            let d = e.wheelDelta / 20 || -e.detail;
            radius += d;
            //展开大小
            init(1);
        }
        //暂停开始旋转
        function playSpin(yes) {
            spinDom.style.animationPlayState = (yes ? 'running' : 'paused');
        }

        function changeRotate(obj) {
            // X轴旋转0-180度
            if (tY > 180)
                tY = 180;
            if (tY < 0)
                tY = 0;
            // y轴旋转角度不限制
            obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
        }
        let startX, startY, endX, endY, tX = 0,
            tY = 10,
            desX = 0,
            desY = 0;

        //鼠标移动事件
        document.onpointerdown = function (e) {
            //清除惯性定时器
            clearInterval(outDom.timer);
            e = e || ewindow.event;
            //鼠标点击位置
            startX = e.clientX, startY = e.clientY;
            this.onpointermove = function (e) {
                playSpin(false);
                //鼠标点击时 停止自动旋转//鼠标点击时 停止自动旋转
                e = e || window.event;
                //记录结束时位置
                endX = e.clientX,
                    endY = e.clientY;
                //计算移动距离 并修改角度
                desX = endX - startX;
                desY = endY - startY;
                tX += desX * 0.1;
                tY += desY * 0.1;
                changeRotate(outDom);
                startX = endX;
                startY = endY;
            }
            //鼠标离开时 开始自动旋转
            this.onpointerup = function (e) {
                //惯性旋转
                outDom.timer = setInterval(function () {
                    desX *= 0.95;
                    desY *= 0.95;
                    tX += desX * 0.1;
                    tY += desY * 0.1;
                    changeRotate(outDom);
                    playSpin(false);
                    if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                        clearInterval(outDom.timer);
                        playSpin(true);
                    }
                })
                this.onpointermove = this.onpointerup = null;
            }
            return false;
        }