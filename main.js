$(document).ready(function() {
    console.log('ready');
    var api = "https://wind-bow.gomix.me/twitch-api";
    var users = ["ESL_SC2", "freecodecamp"];
    // var userIDs = [26177965760, ];

    users.forEach(function(user) {
        var userInfo = getUserInfo(user);
        var streamInfo = getStreamInfo(user);
        $.when(userInfo, userInfo).done(makeCard(userInfo, streamInfo));
    });

    function getUserInfo(user) {
        $.ajax({
            type: 'GET',
            url: api + '/users/' + user + '?callback=?',
            dataType: 'jsonp',
        }).done(function(data) {
            console.log(data);
            var display_name = data.display_name;
            var logo = data.logo;
        });
    }

    function getStreamInfo(user) {

    }

    function makeCard(userInfo, streamInfo) {
        var html =
        `            <div class="card">
                        <div class="card-body">
                            <div class="avatar">
                                <img src="http://via.placeholder.com/100x100" alt="avatar">
                            </div>
                            <div class="cardInfo">
                                <div class="title">Streamer name</div>
                                <div class="info">currently playing: a game</div>
                            </div>
                        </div>
                    </div>`
        $('#cardBox').append(html);
    }

    // $.ajax({
    //     type: 'GET',
    //     url: api + '/streams/ESL_SC2' + '?callback=?',
    //     dataType: 'jsonp',
    //     success: function(data) {
    //         console.log(data);
    //         var status, game, viewers;
    //         if (data.stream == null) {
    //             status = 'offline';
    //             game = 'Offline';
    //         } else if (data.stream == undefined) {
    //             status = 'offline';
    //             game = 'Account does not exist';
    //         } else {
    //             status = 'online';
    //             game = data.game;
    //             viewers == data.viewers;
    //
    //         }
    //     },
    // });
});
