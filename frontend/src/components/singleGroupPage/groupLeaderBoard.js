function calculateGroupStats(members,wagerdata) {
    let MemberObjects={}
    let completedBets=0;

    members.forEach(member => {
        MemberObjects[member.username] = {
        username: member.username,
        ID: member._id,
        betsWon: 0,
        betsLost: 0,
        };
    });
    
    wagerdata.forEach(wager => {
        if(wager.winner){
            completedBets++
            if(wager.peopleInvolved[0]._id === wager.winner._id)
            {
                MemberObjects[wager.peopleInvolved[0].username].betsWon++
                MemberObjects[wager.peopleInvolved[1].username].betsLost++        
            }
            if(wager.peopleInvolved[1]._id === wager.winner._id)
            {
                MemberObjects[wager.peopleInvolved[1].username].betsWon++
                MemberObjects[wager.peopleInvolved[0].username].betsLost++
            }
        }
        
    });
    
    const result = Object.keys(MemberObjects).map((user) => {
    const {betsWon, betsLost, username, ID } = MemberObjects[user];

    return {
        ID,
        username,
        betsWon,
        betsLost,
        winPercentage: ((betsWon / (betsWon + betsLost)) * 100).toFixed(2),
    }});


return result;
};


module.exports = calculateGroupStats;
  