var workTime = 25;
var breakTime = 5;
var breakTimer = new Timer();
var timer = new Timer();

$(document).ready(function () {
    $("#leftWork").click(function () {
        if(workTime > 1) {
            workTime--;
        }
        $("#workNum").text(workTime);
    });
    $("#rightWork").click(function () {
        workTime++;
        $("#workNum").text(workTime);
    });
    $("#leftBreak").click(function () {
        if(breakTime > 1) {
            breakTime--;
        }
        $("#breakNum").text(breakTime);
    });
    $("#rightBreak").click(function () {
        breakTime++;
        $("#breakNum").text(breakTime);
    });

    var alarm = soundManager.createSound({
        id: 'alarm1',
        url: './media/alarm.mp3'
    });

    var alarm2 = soundManager.createSound({
        id: 'alarm2',
        url: './media/alarm2.mp3'
    });

    var circle = $("#circle-container"),
        btn = $("#goBtn");

    circle.circleProgress({
        value: 0,
        size: 340,
        emptyFill: 'rgb(255, 255, 255)',
    });

    btn.click(function () {
        $(this).prop('disabled', true);
        //start work timer
        timer.start({
            countdown: true,
            startValues: {
                minutes: workTime
            }
        });

        circle.circleProgress({
            value: 1,
            size: 340,
            emptyFill: 'rgb(255, 255, 255)',
            fill: {
                gradient: ["red", "orange"]
            },
            animation: {
                duration: (workTime * 1000) * 60
            },
        });

        //change time left every second to #countdown
        $('#countdown .values').html(timer.getTimeValues().toString());
        timer.addEventListener('secondsUpdated', function (e) {
            $('#countdown .values').html(timer.getTimeValues().toString());
        });
        //event when timer is finished
        timer.addEventListener('targetAchieved', function (e) {
            alarm.play();
            $('#countdown .values').html("Time to rest!");
            //start breakTimer straight after timer is finished
            breakTimer.start({
                countdown: true,
                startValues: {
                    minutes: breakTime
                }
            });

            circle.circleProgress({
                value: 1,
                emptyFill: 'rgb(255, 255, 255)',
                fill: {
                    gradient: ["blue", "purple"]
                },
                animation: {
                    duration: (breakTime * 1000) * 60
                },
                reverse: true
            });

            $('#countdown .values').html(breakTimer.getTimeValues().toString());
            breakTimer.addEventListener('secondsUpdated', function (e) {
                $('#countdown .values').html(breakTimer.getTimeValues().toString());
            });
            breakTimer.addEventListener('targetAchieved', function (e) {
                alarm2.play();
                $('#countdown .values').html("Time to work!");

                timer.start({
                    countdown: true,
                    startValues: {
                        minutes: workTime
                    }
                });

                circle.circleProgress({
                    value: 1,
                    size: 340,
                    emptyFill: 'rgb(255, 255, 255)',
                    fill: {
                        gradient: ["red", "orange"]
                    },
                    animation: {
                        duration: (workTime * 1000) * 60
                    },
                });
            });
        });
    });


    $("#stopBtn").click(function () {
        $(this).prop('disabled', true);
        $("#goBtn").prop('disabled', false);
        var el = $("#circle-container");
        $(el.circleProgress({
            value: 0
        }));
        timer.stop();
        breakTimer.stop();
        soundManager.stop('alarm');
        soundManager.stop('alarm2');

        $('#countdown .values').html("00:00:00");
    });
});
