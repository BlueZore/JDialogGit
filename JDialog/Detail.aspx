<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Detail.aspx.cs" Inherits="JDialog.Detail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>


    <script src="jquery-1.4.1.js"></script>
    <script>

        $(function () {
            if ($("[isexec='y']").size() > 0) {
                parent.location.reload();
            }

            $("#Button2").click(function () {
                $(".JDialog_OpacityLayer", window.parent.document).remove();
                $(".JDialog_MainLayer", window.parent.document).remove();
                return false;
            });
        });

    </script>

</head>
<body>
    <form id="form1" runat="server">
    <div>
   

        <asp:Button ID="Button1" runat="server" Text="确认" OnClick="Button1_Click" isexec="n" />
        <asp:Button ID="Button2" runat="server" Text="取消" />

    </div>
    </form>
</body>
</html>
