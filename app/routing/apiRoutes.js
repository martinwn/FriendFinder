let friendsData = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(request, response) {
        response.json(friendsData);
    });

    app.post('/api/friends', function(request, response) {

        let userDataScores = request.body.scores;
        let differenceArray = [];
        let match;

        for (let i in friendsData) {

            let difference = 0;

            for (let j in userDataScores) {
                difference += Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(userDataScores[j]));
            };

            differenceArray.push(difference);
        };

        let min = differenceArray[0];
        let minIndex = 0;
    
        for (let i in differenceArray) {
            if (differenceArray[i] < min) {
                minIndex = i;
                min = differenceArray[i];
            }; 
        };

        match = friendsData[minIndex];

        friendsData.push(request.body);
        response.json(match);
    });

};