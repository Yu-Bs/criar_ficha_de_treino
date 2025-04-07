<?php session_start(); ?>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Página Inicial</title>
        <link rel="stylesheet" type="text/css" href="login.css"/>
    </head>
    <body>
        <div class="form-box">
            <div class="form">
                <h1>Faça Login</h1>
                <form action="menu.php" method="POST">
                    <table>
                        <tbody>
                            <?php if (isset($_SESSION['msg'])) { ?>
                            <tr>
                                <td colspan="2" style="color:red;">
                                    <?php 
                                        echo $_SESSION['msg']; 
                                        unset($_SESSION['msg']); 
                                    ?>
                                </td>
                            </tr>
                            <?php } ?>
                            <tr>
                                <td><input type="text" name="usuario" placeholder="Login"/></td>
                            </tr>
                            <tr>
                                <td><input type="password" name="senha" placeholder="Senha"/></td>
                            </tr>
                            <tr>
                                <td colspan="2"><input type="submit" value="Entrar"/></td>
                            </tr>
                        </tbody>
                    </table>
               </form>
            </div>
        </div>
    </body>
</html>
