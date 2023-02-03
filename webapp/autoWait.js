sap.ui.require(["sap/m/Button", "sap/ui/test/RecordReplay"], function (Button, RecordReplay) {
    // set Timeout Works
    var btn = new sap.m.Button({
        text: 'setTimeout <== Works',
        press: function () {
            console.time("waitForUI5");

            setTimeout(function () {
                console.log("async task is done");
                alert("async task is done")
            }, 900);

            RecordReplay.waitForUI5({ timeout: 800/* 90000, maxDelay: 100000 */ }).then(() => {
                console.timeEnd("waitForUI5");
            }).catch(function (error) {
                console.log(error);
                alert(error)
            })
        }
    });
    btn.placeAt('content');

    var btn = new sap.m.Button({
        text: 'fetch <== does not work',
        press: function () {
            console.time("waitForUI5");

            fetch('http://localhost:8088/test').then((response) => alert("async fetch is done"))

            RecordReplay.waitForUI5({ timeout: 1000/* 90000, maxDelay: 100000 */ }).then(() => {
                alert("waitForUI5 found no blocker");
            }).catch(function (error) {
                console.log(error);
                alert(error)
            })
        }
    });
    btn.placeAt('content');

    var btn = new sap.m.Button({
        text: 'xmlhttpRequest <== does not work',
        press: function () {
            console.time("waitForUI5");

            const req = new XMLHttpRequest()
            req.open("GET", "http://localhost:8088/test") // <== does not work
            //req.open("GET", "http://localhost:8088/test", true) // <== does work because of async true
            req.addEventListener("load", () => { alert("async fetch is done") });
            req.send()

            RecordReplay.waitForUI5({ timeout: 1000/* 90000, maxDelay: 100000 */ }).then(() => {
                alert("waitForUI5 found no blocker");
            }).catch(function (error) {
                console.log(error);
                alert(error)
            })
        }
    });
    btn.placeAt('content');
});