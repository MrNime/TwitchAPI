$(document).ready(function() {
    var api = "https://wind-bow.gomix.me/twitch-api";
    var users = ["ESL_SC2", "freecodecamp", "Northernlion", "last_grey_wolf", "nonexistant_channelsdfsdf"];
    // var userIDs = [26177965760, ];

    users.forEach(function(user) {
        //get user info
        $.ajax({
            type: 'GET',
            url: api + '/users/' + user + '?callback=?',
            dataType: 'jsonp',
            success: function(data) {
                console.log(data);
                var logo = data.logo || 'http://via.placeholder.com/100x100';
                var display_name = data.display_name || user;
                if (data.error) {
                    html =
                    `
                    <div class="card">
                    <div class="card-body">
                    <div class="avatar">
                    <img src=${logo} alt="avatar">
                    </div>
                    <div class="cardInfo">
                    <div class="title">${display_name}</div>
                    <div class="info">Channel does not exist</div>
                    </div>
                    </div>
                    </div>
                    `;
                    $('#error').append(html);
                } else {
                    //get stream info
                    $.ajax({
                        type: 'GET',
                        url: api + '/streams/' + user + '?callback=?',
                        dataType: 'jsonp',
                        success: function(data) {
                            console.log(data);
                            if (data.stream === null) {
                                html =
                                `
                                <a href="https://www.twitch.tv/${user}" target="_blank">
                                <div class="card">
                                <div class="card-body">
                                <div class="avatar">
                                <img src=${logo} alt="avatar">
                                </div>
                                <div class="cardInfo">
                                <div class="title">${display_name}</div>
                                <div class="info">Offline</div>
                                </div>
                                </div>
                                </div>
                                </a>
                                `;
                                $('#offline').append(html);
                            } else {
                                var game = data.stream.game;
                                //make card
                                var html =
                                `
                                <a href="https://www.twitch.tv/${user}" target="_blank">
                                <div class="card">
                                <div class="card-body">
                                <div class="avatar">
                                <img src=${logo} alt="avatar">
                                </div>
                                <div class="cardInfo">
                                <div class="title">${display_name}</div>
                                <div class="info">currently playing: ${game || ""}</div>
                                </div>
                                </div>
                                </div>
                                </a>
                                `;
                                //display card
                                $('#online').prepend(html);
                            }
                        }
                    })
                }
            }
        })
    });

    $('.toggle').on('click', function(e) {
        $('.toggle').removeClass('active');
        $(this).addClass("active");
        var choice = $(this).text().toLowerCase();
        console.log(choice);
        if (choice === 'online') {
            $('#online').removeClass('hidden');
            $('#offline').addClass('hidden');
            $('#error').addClass('hidden');
        } else if (choice === 'offline') {
            $('#offline').removeClass('hidden');
            $('#online').addClass('hidden');
            $('#error').addClass('hidden');
        } else {
            $('#cardBox').children().removeClass('hidden');
        }
    });
});
