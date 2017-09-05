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
            success: function(data) {
                console.log(data);
                var logo = data.logo;
            }
        })
    }

    function getStreamInfo(user) {

    }

    function makeCard(userInfo, streamInfo) {
        var html =
        `            <div class="card">
                        <div class="card-body">
                            <div class="avatar">
                                <img src="wat" alt="avatar">
                            </div>
                            <div class="cardInfo">
                                <div class="title">${userInfo}</div>
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
