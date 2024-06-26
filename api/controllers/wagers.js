const Wager = require("../models/wager");
const TokenGenerator = require("../lib/token_generator");

const WagersController = {
  Create: (req, res) => {
    const wager = new Wager({
      peopleInvolved: [req.user_id, req.body.challengedUser],
      description: req.body.description,
      deadline: req.body.deadline,
    });

    wager.save((err) => {
      if (err) {
        return res.status(400).json({ message: 'Bad request' });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(201).json({ message: 'OK', token: token });
      }
    });
  },

  Index: (req, res) => {
    Wager.find()
    .populate('peopleInvolved', '-password')
    .populate('winner', '_id username')
    .exec((err, wagers) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      return res.status(200).json({ wagers: wagers, token: token });
    });
  },

  Accept: async (req, res) => {
    const wagerID = req.params.wager_id;
    const wager = await Wager.updateOne({_id: wagerID}, {$set: {approved: true}});
    if (!wager) {
      return res.status(400).json({message: "wager_id not found"})
    }
    else {
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ message: 'OK', token: token });
    }
  },

  FindByID: (req, res) => {
    const wagerID = req.params.id;
    Wager.findById(wagerID)
    .populate(['winner','peopleInvolved'])
    .exec((err, wager) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!wager) {
          return res.status(404).json({ error: 'Wager not found' });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ wager: wager, token: token });
      });
  },

  UpdateWinner: async (req, res) => {
    try{
      const { wagerID, winnerID } = req.params;
      if (!wagerID || !winnerID) {
        return res.status(400).json({ error: 'Both wagerID and winnerID are required.' });
      }
      const existingWager = await Wager.findById(wagerID);
      if (!existingWager) {
        return res.status(404).json({ error: 'Wager not found.' });
      }

      // Update winner
      await Wager.updateOne({ _id: wagerID }, { $set: { winner: winnerID } });
      res.status(200).json({ message: 'Winner updated successfully.' });
    } catch (error) {
      console.error('Error updating winner:', error);
      res.status(500).json({ error: 'Internal Server Error.' });
    }
  },

  Cancel: async (req, res) => {
    const wagerID = req.params.wager_id;
    
    if (!wagerID) {
      return res.status(400).json({ error: 'Wager ID not provided in route parameters' });
    }
    const existingWager = await Wager.findById(wagerID);
    if (!existingWager) {
      return res.status(404).json({ error: 'Wager not found in database' });
    }
    else {
      await Wager.findByIdAndDelete(wagerID);
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      console.log("Cancelling wager attempt successful - wager removed from database")
      res.status(200).json({ message: 'Wager successfully removed from database', token: token });
    } 
  },

  FindUserBets: (req, res) => {
    const userId = req.params.userId;
    Wager.find({
        peopleInvolved: {
            $elemMatch: { $eq: userId }
        }
    })
    .populate('peopleInvolved', '-password')
    .populate('winner', '_id username')
    .exec((err, wagers) => {
        if (err) {return res.status(500).json({ error: 'Internal Server Error' });}
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        return res.status(200).json({ wagers: wagers, token: token });
    });
},

ReturnGroupWagers: (req, res) => {
  const MemberArray = req.body.ArrayOfMembers;
  const query = {
    '$and': [
      {'approved':'true'},
      {'peopleInvolved.0': {'$in': MemberArray}}, 
      {'peopleInvolved.1': {'$in': MemberArray}},
            ]   };
  Wager.find(query)
    .populate('peopleInvolved', '-password')
    .populate('winner', '-password')
    .exec((err, wagers) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      return res.status(200).json({ wagers: wagers, token: token });
    });
}

};

module.exports = WagersController;
