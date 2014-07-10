/// <reference path="../Scripts/jquery-1.4.1-vsdoc.js" />

/// 对话框1.0 完成于2011.1.25 徐松涛制

//;(function ($) {
$.fn.extend({
    JDialog: function (options) {
        options = $.extend({
            //基本
            marginLeft: 0, //距左距离
            marginTop: 0, //距顶距离

            //参数
            text: "", //显示文本
            html: "", //显示html
            width: 0, //窗口宽度
            height: 0, //窗口高度
            buttonClickVal: "", //事件参数

            //对话布局
            topShow: "", //hidden隐藏
            bottomShow: "", //hidden隐藏

            //透明层使用
            opacityShow: "",

            //动画使用
            animate: "", //支持"show"、"fade"

            //对话框移动
            move: false, //

            //对框话类型
            confirm: false, //是否对话框

            //事件
            buttonClick: function () {
                $.noop();
            }
        }, options);

        //加载弹出层
        $("body").prepend("<div class=\"JDialog_OpacityLayer\"></div><div class=\"JDialog_MainLayer\"><div class=\"JDialog_MainLayer_Shadow\"></div><div class=\"JDialog_MainLayer_Main\"><div class=\"JDialog_MainLayer_Main_Top\"><a href=\"#\">关闭</a></div><div class=\"JDialog_MainLayer_Main_Middle\"><p></p></div><div class=\"JDialog_MainLayer_Main_Botton\"><input type=\"button\" value=\"确定\" /></div></div></div>");

        //透明层覆盖范围
        //.JDialog_OpacityLayer      left:0; right: 0; top: 0; bottom: 0; position:fixed;

        //设置弹出窗口宽度
        if (options.width > $(".JDialog_MainLayer").width()) {
            $("[class^='JDialog_MainLayer']").width(options.width + 4);
            $(".JDialog_MainLayer").width(options.width + 4);
        }

        //隐藏透明层
        if (options.opacityShow == "hidden") {
            $(".JDialog_OpacityLayer").hide();
        }
        //隐藏对话框顶部
        if (options.topShow == "hidden") {
            $(".JDialog_MainLayer_Main_Top").height("0").hide();
        }
        //隐藏对话框底部
        if (options.bottomShow == "hidden") {
            $(".JDialog_MainLayer_Main_Botton").height("0").hide();
        }


        //设置弹出窗口高度
        if (options.height > $(".JDialog_MainLayer").height()) {
            $(".JDialog_MainLayer").height(options.height + 4);
            $(".JDialog_MainLayer_Shadow").height(options.height);
            $(".JDialog_MainLayer_Main").height(options.height);
            $(".JDialog_MainLayer_Main_Middle").height(options.height - 10 - $(".JDialog_MainLayer_Main_Top").height() - $(".JDialog_MainLayer_Main_Botton").height());
        }

        //设置弹出窗口中显示内容
        if ($.trim(options.text).length > 0) {
            $(".JDialog_MainLayer_Main_Middle>p").html(options.text);
        }

        if (options.html.length > 0) {
            $(".JDialog_MainLayer_Main_Middle").html(options.html);
        }

        //设置窗口距离位置
        options.marginLeft = ($(document).width() - $(".JDialog_MainLayer").width()) / 2;
        options.marginTop = ($(window).height() - $(".JDialog_MainLayer").height()) / 2;
        $(".JDialog_MainLayer").css("margin-left", options.marginLeft > 0 ? options.marginLeft : 0);
        $(".JDialog_MainLayer").css("margin-top", options.marginTop > 0 ? options.marginTop : 0);

        //添加取消按钮
        if (options.confirm) {
            $(".JDialog_MainLayer_Main_Botton").append("&nbsp;&nbsp;&nbsp;&nbsp;<input type=\"button\" value=\"取消\" />");
        }


        //a关闭弹出层
        $(".JDialog_MainLayer_Main_Top>a").click(function () {
            $(this).JDialogClose();
            return false;
        });



        //button关闭弹出层
        $(".JDialog_MainLayer_Main_Botton>input:last").click(function () {
            $(this).JDialogClose();
        });

        //按钮添加事件
        if (options.confirm) {
            $(".JDialog_MainLayer_Main_Botton>input:first").click(function (i) {
                $(this).JDialogClose();
                options.buttonClick(options.buttonClickVal);
            });
        }

        //动画弹出效果
        switch (options.animate) {
            case "": break;
            case "show": $(".JDialog_MainLayer").hide();
                $(".JDialog_MainLayer").show("slow");
                break;
            case "fade": $(".JDialog_MainLayer").hide();
                $(".JDialog_MainLayer").fadeIn("slow");
                break;
        }

        //对话框支持拖拽
        if (options.move) {
            var moveState = false; //移动标记  
            var tmpX, tmpY; //鼠标离控件左上角的相对位置  
            $(".JDialog_MainLayer").click(function () {
                //点击（松开后触发）  
            }).mousedown(function (e) {
                $(".JDialog_MainLayer").css("cursor", "move");
                moveState = true;
                tmpX = e.pageX - parseInt($(".JDialog_MainLayer").css("left"));
                tmpY = e.pageY - parseInt($(".JDialog_MainLayer").css("top"));
            });
            $(document).mousemove(function (e) {
                if (moveState) {
                    var x = e.pageX - tmpX; //移动时根据鼠标位置计算控件左上角的绝对位置  
                    var y = e.pageY - tmpY;
                    $(".JDialog_MainLayer").css({ top: y, left: x }); //控件新位置  
                }
            }).mouseup(function () {
                moveState = false;
                $(".JDialog_MainLayer").css("cursor", "");
            });
        }
    },

    JDialogClose: function () {
        $(".JDialog_MainLayer").remove();
        $(".JDialog_OpacityLayer").remove();
    }
});
//})(jQuery);