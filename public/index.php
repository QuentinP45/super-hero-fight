<!doctype html>
<html>
    <head>
        <title>Super hero game</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="../assets/css/index.css">
    </head>
    <body>
        <div class="container">
            <div class="row">
                <div class="offset-md-3 col-md-6 loader-box">
                    <div class="loader-vertical-align">
                        <h1 class="text-center">Chargement en cours</h1>
                        <div id="loader"></div>
                    </div>
                </div>
            </div>
            <div class="row game-frame">
                <div class="col-md-3 player-one"></div>
                <div class="col-md-6 selection">
                    <div class="row" id="selection-message">
                        <div class="col">
                            <h1 class="text-center">Player 1 choose a hero</h1>
                        </div>
                    </div>
                    <div class="row" id="selection-heroes">
                        
                    </div>
                </div>
                <div class="col-md-3 player-two"></div>
            </div>
        </div>
    <script src="../assets/js/index.js"></script>
    </body>
</html>